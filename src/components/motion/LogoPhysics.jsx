import { Suspense, useState, useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import Box from '@mui/material/Box';

const SVG_SCALE = 0.04;
const SVG_CENTER_X = 110;
const SVG_CENTER_Y = 28.5;
const THICKNESS = 0.5;
const SVG_DEPTH = THICKNESS / SVG_SCALE; // 12.5 SVG units

// ── 셰이프 팩토리 ──────────────────────────────────────────
function makeRing(cx, cy, outerR, innerR) {
  const s = new THREE.Shape();
  s.absarc(cx, cy, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(cx, cy, innerR, 0, Math.PI * 2, true);
  s.holes.push(hole);
  return s;
}
function makeCircle(cx, cy, r) {
  const s = new THREE.Shape();
  s.absarc(cx, cy, r, 0, Math.PI * 2, false);
  return s;
}
function makePoly(pts) {
  const s = new THREE.Shape();
  s.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
  return s;
}
function makeDLeft(cx, cy, r) {
  const s = new THREE.Shape();
  s.moveTo(cx + r, cy - r);
  s.lineTo(cx + r, cy + r);
  s.lineTo(cx, cy + r);
  s.absarc(cx, cy, r, Math.PI * 0.5, Math.PI * 1.5, false);
  s.lineTo(cx + r, cy - r);
  return s;
}
function makeDRight(cx, cy, r) {
  const s = new THREE.Shape();
  s.moveTo(cx, cy - r);
  s.absarc(cx, cy, r, -Math.PI * 0.5, Math.PI * 0.5, false);
  s.lineTo(cx - r, cy + r);
  s.lineTo(cx - r, cy - r);
  s.lineTo(cx, cy - r);
  return s;
}

function makeGeo(shape, cx, cy) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: SVG_DEPTH,
    bevelEnabled: true,
    bevelThickness: 3.0,
    bevelSize: 2.5,
    bevelSegments: 6,
  });
  geo.translate(-cx, -cy, -SVG_DEPTH / 2);
  geo.scale(SVG_SCALE, -SVG_SCALE, SVG_SCALE);
  return geo;
}

/**
 * 4개 글자 블록 정의.
 * centerSvgX/Y = 글자 전체 SVG 바운딩박스 중심.
 * 각 조각(pieces)의 위치는 글자 중심 기준 상대좌표(relX, relY)로 계산.
 */
const LETTERS = (() => {
  const raw = [
    {
      name: 'S', delay: 0.0,
      centerSvgX: 28.35, centerSvgY: 28.45,
      pieces: [
        { svgCX: 14.2,  svgCY: 14.2,  color: '#796253', shape: makeDLeft(14.2, 14.2, 14.2) },
        { svgCX: 42.5,  svgCY: 14.3,  color: '#463335', shape: makePoly([[28.3,0.1],[56.7,0.1],[28.3,28.5]]) },
        { svgCX: 42.5,  svgCY: 42.7,  color: '#796253', shape: makeDRight(42.5, 42.65, 14.15) },
        { svgCX: 14.15, svgCY: 42.65, color: '#463335', shape: makePoly([[28.3,28.5],[0,56.8],[28.3,56.8]]) },
      ],
    },
    {
      name: 'O', delay: 1.0,
      centerSvgX: 82.6, centerSvgY: 28.4,
      pieces: [
        { svgCX: 82.6, svgCY: 28.4, color: '#463335', shape: makeRing(82.6, 28.4, 28.3, 7.1) },
      ],
    },
    {
      name: 'H', delay: 2.0,
      centerSvgX: 136.9, centerSvgY: 28.45,
      pieces: [
        { svgCX: 151.1,  svgCY: 14.3,  color: '#796253', shape: makePoly([[136.9,0.1],[165.3,0.1],[155.3,28.5],[136.9,28.5]]) },
        { svgCX: 122.7,  svgCY: 14.3,  color: '#463335', shape: makeCircle(122.7, 14.3, 14.2) },
        { svgCX: 122.75, svgCY: 42.65, color: '#796253', shape: makePoly([[118.6,28.5],[136.9,28.5],[136.9,56.8],[108.6,56.8]]) },
        { svgCX: 151.1,  svgCY: 42.6,  color: '#463335', shape: makeCircle(151.1, 42.6, 14.2) },
      ],
    },
    {
      name: 'O2', delay: 3.0,
      centerSvgX: 191.2, centerSvgY: 28.4,
      pieces: [
        { svgCX: 191.2, svgCY: 28.4, color: '#463335', shape: makeRing(191.2, 28.4, 28.3, 7.1) },
      ],
    },
  ];

  // 글자 중심 world 좌표 + 각 조각의 상대 위치 + 지오메트리 사전 계산
  return raw.map((letter) => {
    const cwX = (letter.centerSvgX - SVG_CENTER_X) * SVG_SCALE;
    const cwY = -(letter.centerSvgY - SVG_CENTER_Y) * SVG_SCALE;
    const pieces = letter.pieces.map((p) => ({
      ...p,
      geo: makeGeo(p.shape, p.svgCX, p.svgCY),
      relX: (p.svgCX - SVG_CENTER_X) * SVG_SCALE - cwX,
      relY: -(p.svgCY - SVG_CENTER_Y) * SVG_SCALE - cwY,
    }));
    return { ...letter, centerWorldX: cwX, centerWorldY: cwY, pieces };
  });
})();

// ── 히어로 투명 모드 배치 ───────────────────────────────────
// 카메라를 옆으로 돌리거나 크롭하는 대신, 컨테이너/글자의 world 좌표
// 자체를 우측 하단으로 이동시킨다. 카메라는 회전 없이 원점을 보는
// 기본값 그대로 두므로 원근 왜곡이나 크롭 잘림 문제가 생기지 않는다.
const HERO_OFFSET_X = 5;   // 우측 이동량 (목표치, 화면에 안 들어오면 자동 축소)
const HERO_OFFSET_Y = 0.3; // 상하 미세 조정량
const HERO_EDGE_MARGIN = 0.6; // 화면 가장자리와 벽 사이 여백

// ── 투명 박스 컨테이너 ─────────────────────────────────────
const BOX_HW = 3.5;   // x 방향 반폭 (투명 모드는 화면 폭에 맞춰 자동 계산)
const BOX_HD = 0.38;  // z 방향 반깊이 (얇은 상자)
const BOX_GY = -2.15;
const WALL_T = 0.15;

// 현재 캔버스에서 실제로 보이는 world 폭(viewport.width)을 기준으로
// 오프셋/반폭을 계산해, 어떤 화면 크기에서도 벽이 좌우로 화면 밖을
// 벗어나지 않도록 한다.
function useHeroBounds(transparent) {
  const { viewport } = useThree();
  if (!transparent) return { halfWidth: BOX_HW, offsetX: 0 };
  const visibleHalf = viewport.width / 2;
  const offsetX = Math.min(HERO_OFFSET_X, Math.max(0, visibleHalf - 2 - WALL_T));
  const halfWidth = Math.min(
    BOX_HW * 2,
    Math.max(1.5, visibleHalf - offsetX - WALL_T - HERO_EDGE_MARGIN),
  );
  return { halfWidth, offsetX };
}

function Container({ transparent = false }) {
  const { halfWidth, offsetX } = useHeroBounds(transparent);
  const gy = BOX_GY + (transparent ? HERO_OFFSET_Y : 0);
  const wH = 14;
  const wCY = gy + wH;
  return (
    <>
      <RigidBody type="fixed" position={[offsetX, gy, 0]}>
        <CuboidCollider args={[halfWidth + WALL_T, 0.15, BOX_HD + WALL_T]} />
        {!transparent && (
          <mesh receiveShadow>
            <boxGeometry args={[(halfWidth + WALL_T) * 2, 0.3, (BOX_HD + WALL_T) * 2]} />
            <meshStandardMaterial color="#130d0e" roughness={0.95} />
          </mesh>
        )}
      </RigidBody>
      <RigidBody type="fixed" position={[offsetX - (halfWidth + WALL_T), wCY, 0]}>
        <CuboidCollider args={[WALL_T, wH, BOX_HD + WALL_T]} />
      </RigidBody>
      <RigidBody type="fixed" position={[offsetX + (halfWidth + WALL_T), wCY, 0]}>
        <CuboidCollider args={[WALL_T, wH, BOX_HD + WALL_T]} />
      </RigidBody>
      <RigidBody type="fixed" position={[offsetX, wCY, BOX_HD + WALL_T]}>
        <CuboidCollider args={[halfWidth + WALL_T, wH, WALL_T]} />
      </RigidBody>
      <RigidBody type="fixed" position={[offsetX, wCY, -(BOX_HD + WALL_T)]}>
        <CuboidCollider args={[halfWidth + WALL_T, wH, WALL_T]} />
      </RigidBody>
    </>
  );
}

function PhysicsScene({ transparent = false }) {
  const { offsetX } = useHeroBounds(transparent);
  const offsetY = transparent ? HERO_OFFSET_Y : 0;
  // 높이 차이로 낙하 순서 만들기 (S→O→H→O 순서로 바닥 도달)
  // S: y=8, O: y=13, H: y=18, O2: y=23 → 중력 9.81 기준 약 1초 간격
  const [startData] = useState(() =>
    LETTERS.map((_, i) => ({
      pos: [
        (Math.random() - 0.5) * 2.8,
        8 + i * 5 + Math.random() * 0.5,
        (Math.random() - 0.5) * 0.1,
      ],
      rotY: (Math.random() - 0.5) * Math.PI * 0.4,
      angVel: [
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.4,
      ],
    })),
  );

  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Container transparent={transparent} />
      {LETTERS.map((letter, i) => (
        <RigidBody
          key={letter.name}
          position={[
            startData[i].pos[0] + offsetX,
            startData[i].pos[1] + offsetY,
            startData[i].pos[2],
          ]}
          rotation={[0, startData[i].rotY, 0]}
          angularVelocity={startData[i].angVel}
          colliders="hull"
          restitution={0.08}
          friction={0.3}
        >
          {letter.pieces.map((p, j) => (
            <mesh key={j} castShadow position={[p.relX, p.relY, 0]} geometry={p.geo}>
              <meshPhysicalMaterial
                color="#f2f0ed"
                roughness={0.2}
                metalness={0}
                transmission={0.78}
                thickness={0.6}
                ior={1.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </RigidBody>
      ))}
    </Physics>
  );
}

/**
 * LogoPhysics 컴포넌트
 *
 * S·O·H·O 글자 블록 4개가 3D 물리 시뮬레이션으로 투명 박스 안에 쌓이는 씬.
 * 각 글자는 서브 조각을 하나의 RigidBody로 묶어 하나의 단위로 낙하.
 *
 * Props:
 * @param {string|number} width         - 캔버스 너비 [Optional, 기본값: '100%']
 * @param {number}        height        - 캔버스 높이(px) [Optional, 기본값: 600]
 * @param {boolean}       isTransparent - 배경 없는 투명 모드 (히어로 오버레이용) [Optional, 기본값: false]
 * @param {object}        sx            - 추가 MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <LogoPhysics height={600} />
 * <LogoPhysics isTransparent sx={{ position: 'absolute', inset: 0 }} />
 */
function LogoPhysics({ width = '100%', height = 600, isTransparent = false, sx }) {
  return (
    <Box sx={{ width, height, ...sx }}>
      <Canvas
        shadows
        camera={isTransparent
          ? { position: [0, 0, 16], fov: 38 }
          : { position: [0, 2.5, 7], fov: 50 }
        }
        gl={{ antialias: true, alpha: isTransparent }}
      >
        {!isTransparent && <color attach="background" args={['#1c1415']} />}
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[4, 10, 4]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={25}
          shadow-camera-left={-6}
          shadow-camera-right={isTransparent ? 14 : 6}
          shadow-camera-top={10}
          shadow-camera-bottom={-4}
        />
        <pointLight position={[-3, 5, 3]} intensity={1.2} color="#a07858" />
        <Suspense fallback={null}>
          <PhysicsScene transparent={isTransparent} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </Box>
  );
}

export default LogoPhysics;
