import { Suspense, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
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

// ── 히어로 투명 모드용 카메라 세팅 ─────────────────────────
// 카메라를 14 거리로 물러나 50% 축소 + lookAt y=4.37로 올려
// floor(y=-2.15)가 캔버스 하단에 위치하도록 함
function CameraRig({ tx, ty, tz }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(tx, ty, tz);
  }, [tx, ty, tz]);
  return null;
}

// ── 투명 박스 컨테이너 ─────────────────────────────────────
const BOX_HW = 3.5;   // x 방향 반폭
const BOX_HD = 0.38;  // z 방향 반깊이 (얇은 상자)
const BOX_GY = -2.15;
const WALL_T = 0.15;

function Container({ transparent = false }) {
  const wH = 14;
  const wCY = BOX_GY + wH;
  return (
    <>
      <RigidBody type="fixed" position={[0, BOX_GY, 0]}>
        <CuboidCollider args={[BOX_HW + WALL_T, 0.15, BOX_HD + WALL_T]} />
        {!transparent && (
          <mesh receiveShadow>
            <boxGeometry args={[(BOX_HW + WALL_T) * 2, 0.3, (BOX_HD + WALL_T) * 2]} />
            <meshStandardMaterial color="#130d0e" roughness={0.95} />
          </mesh>
        )}
      </RigidBody>
      <RigidBody type="fixed" position={[-(BOX_HW + WALL_T), wCY, 0]}>
        <CuboidCollider args={[WALL_T, wH, BOX_HD + WALL_T]} />
      </RigidBody>
      <RigidBody type="fixed" position={[BOX_HW + WALL_T, wCY, 0]}>
        <CuboidCollider args={[WALL_T, wH, BOX_HD + WALL_T]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, wCY, BOX_HD + WALL_T]}>
        <CuboidCollider args={[BOX_HW + WALL_T, wH, WALL_T]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, wCY, -(BOX_HD + WALL_T)]}>
        <CuboidCollider args={[BOX_HW + WALL_T, wH, WALL_T]} />
      </RigidBody>
    </>
  );
}

function PhysicsScene({ transparent = false }) {
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
          position={startData[i].pos}
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
          ? { position: [0, 4, 10], fov: 50 }
          : { position: [0, 2.5, 7], fov: 50 }
        }
        gl={{ antialias: true, alpha: isTransparent }}
      >
        {isTransparent && <CameraRig tx={-3.2} ty={2.5} tz={0} />}
        {!isTransparent && <color attach="background" args={['#1c1415']} />}
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[4, 10, 4]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={25}
          shadow-camera-left={-6}
          shadow-camera-right={6}
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
