import { Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import Box from '@mui/material/Box';

/**
 * SVGLoader.createShapes가 베지어 경로를 일부 무시하는 버그가 있어
 * Three.js Shape API로 10개 조각을 직접 정의한다.
 * 좌표계: SVG viewBox(0 0 220 57), 스케일/y반전은 geometry transform에서 처리.
 */
const SVG_SCALE = 0.04;
const SVG_CENTER_X = 110;
const SVG_CENTER_Y = 28.5;
const THICKNESS = 0.5;
const SVG_DEPTH = THICKNESS / SVG_SCALE;
const K = 140;
const C = 18;
const FALL_OFFSET = 12;

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

// ── 10개 조각 정의 + 낙하 순서 (S → O1 → H → O2) ─────────────
// target: SVG 바운딩박스 중심을 월드 좌표로 변환
//   world_x = (svgCX - 110) * 0.04
//   world_y = -(svgCY - 28.5) * 0.04
const PIECES = [
  { color: '#796253', svgCX: 151.1,  svgCY: 14.3,  delay: 0.58, shape: makePoly([[136.9,0.1],[165.3,0.1],[155.3,28.5],[136.9,28.5]]) },
  { color: '#463335', svgCX: 122.7,  svgCY: 14.3,  delay: 0.50, shape: makeCircle(122.7, 14.3, 14.2) },
  { color: '#796253', svgCX: 122.75, svgCY: 42.65, delay: 0.66, shape: makePoly([[118.6,28.5],[136.9,28.5],[136.9,56.8],[108.6,56.8]]) },
  { color: '#463335', svgCX: 151.1,  svgCY: 42.6,  delay: 0.74, shape: makeCircle(151.1, 42.6, 14.2) },
  { color: '#463335', svgCX: 82.6,   svgCY: 28.4,  delay: 0.38, shape: makeRing(82.6, 28.4, 28.3, 7.1) },
  { color: '#463335', svgCX: 191.2,  svgCY: 28.4,  delay: 0.84, shape: makeRing(191.2, 28.4, 28.3, 7.1) },
  { color: '#796253', svgCX: 14.2,   svgCY: 14.2,  delay: 0.00, shape: makeDLeft(14.2, 14.2, 14.2) },
  { color: '#463335', svgCX: 42.5,   svgCY: 14.3,  delay: 0.10, shape: makePoly([[28.3,0.1],[56.7,0.1],[28.3,28.5]]) },
  { color: '#796253', svgCX: 42.5,   svgCY: 42.7,  delay: 0.18, shape: makeDRight(42.5, 42.65, 14.15) },
  { color: '#463335', svgCX: 14.15,  svgCY: 42.65, delay: 0.26, shape: makePoly([[28.3,28.5],[0,56.8],[28.3,56.8]]) },
];

// ── 호버 인터랙션 ──────────────────────────────────────────
// 정착 후에도 호버 트리거에 반응하도록, 값은 ref로만 관리하고
// (리렌더 없음) 같은 스프링 물리로 목표 y를 살짝 올렸다 내린다.
const HOVER_LIFT = 0.4;

// ── 스프링 낙하 컨테이너 ───────────────────────────────────
function FallingPiece({ piece, isGlass }) {
  const { shape, svgCX, svgCY, color, delay } = piece;
  const targetX = (svgCX - SVG_CENTER_X) * SVG_SCALE;
  const targetY = -(svgCY - SVG_CENTER_Y) * SVG_SCALE;

  const groupRef = useRef();
  const posY     = useRef(targetY + FALL_OFFSET);
  const velY     = useRef(0);
  const started  = useRef(false);
  const settled  = useRef(false);
  const hovered  = useRef(false);
  const prevHovered = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => { started.current = true; }, delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (hovered.current !== prevHovered.current) {
      prevHovered.current = hovered.current;
      settled.current = false; // 호버 상태가 바뀌면 스프링을 다시 깨운다
    }
    const target = targetY + (hovered.current ? HOVER_LIFT : 0);
    if (started.current && !settled.current) {
      const dt = Math.min(delta, 0.05);
      const force = -K * (posY.current - target) - C * velY.current;
      velY.current += force * dt;
      posY.current += velY.current * dt;
      if (Math.abs(posY.current - target) < 0.001 && Math.abs(velY.current) < 0.001) {
        posY.current = target;
        velY.current = 0;
        settled.current = true;
      }
    }
    groupRef.current.position.y = posY.current;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: SVG_DEPTH,
      bevelEnabled: true,
      bevelThickness: 3.0,
      bevelSize: 2.5,
      bevelSegments: 6,
    });
    geo.translate(-svgCX, -svgCY, -SVG_DEPTH / 2);
    geo.scale(SVG_SCALE, -SVG_SCALE, SVG_SCALE);
    return geo;
  }, [shape, svgCX, svgCY]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const handlePointerOver = (e) => {
    e.stopPropagation();
    hovered.current = true;
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    hovered.current = false;
    document.body.style.cursor = 'auto';
  };

  return (
    <group ref={groupRef} position={[targetX, targetY + FALL_OFFSET, 0]}>
      <mesh
        castShadow
        geometry={geometry}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {isGlass ? (
          <meshPhysicalMaterial
            color="#f2f0ed"
            roughness={0.2}
            metalness={0}
            transmission={0.78}
            thickness={0.6}
            ior={1.5}
            side={THREE.DoubleSide}
          />
        ) : (
          <meshStandardMaterial
            color={color}
            roughness={0.68}
            metalness={0}
            envMapIntensity={0.5}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>
    </group>
  );
}

// ── 히어로 투명 모드 배치 ───────────────────────────────────
// 캔버스 컨테이너 자체를 줄이면 orthographic 카메라가 같은 zoom을
// 유지한 채 화면을 그대로 크롭해버린다. 대신 그룹 스케일/좌표를
// 직접 줄이고 옮겨서, 화면 크기가 달라져도 잘리지 않게 한다.
const LOGO_HALF_WIDTH = SVG_CENTER_X * SVG_SCALE; // 4.4
const HERO_SCALE = 0.66;
const HERO_OFFSET_TARGET = 3.2;
const HERO_EDGE_MARGIN = 0.4;

function useAssemblyHeroBounds(isTransparent) {
  const { viewport } = useThree();
  if (!isTransparent) return { scale: 1, offsetX: 0 };
  const scaledHalfWidth = LOGO_HALF_WIDTH * HERO_SCALE;
  const visibleHalf = viewport.width / 2;
  const maxOffset = Math.max(0, visibleHalf - scaledHalfWidth - HERO_EDGE_MARGIN);
  const offsetX = Math.min(HERO_OFFSET_TARGET, maxOffset);
  return { scale: HERO_SCALE, offsetX };
}

function Scene({ isGlass, isTransparent }) {
  const { scale, offsetX } = useAssemblyHeroBounds(isTransparent);
  return (
    <group scale={scale} position={[offsetX, 0, 0]}>
      {PIECES.map((piece, i) => (
        <FallingPiece key={i} piece={piece} isGlass={isGlass} />
      ))}
      <ContactShadows position={[0, -1.4, 0]} opacity={0.35} scale={14} blur={2.5} far={2} />
    </group>
  );
}

/**
 * LogoAssembly3D 컴포넌트
 *
 * SOHO 로고 10개 조각이 위에서 스프링 낙하해 항상 동일한 배치로 수렴하는 3D 씬.
 * Three.js Shape API로 정확한 조각 형태를 구현 (반원·링·삼각형·사다리꼴).
 *
 * Props:
 * @param {string|number} width         - 캔버스 너비 [Optional, 기본값: '100%']
 * @param {number}        height        - 캔버스 높이(px) [Optional, 기본값: 480]
 * @param {boolean}       isGlass       - 유리 재질 모드 [Optional, 기본값: false]
 * @param {boolean}       isTransparent - 배경 없는 투명 모드 (히어로 오버레이용) [Optional, 기본값: false]
 * @param {object}        sx            - 추가 MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <LogoAssembly3D height={480} isGlass />
 * <LogoAssembly3D isTransparent sx={{ position: 'absolute', inset: 0 }} />
 */
function LogoAssembly3D({ width = '100%', height = 480, isGlass = false, isTransparent = false, sx }) {
  return (
    <Box sx={{ width, height, ...sx }}>
      <Canvas
        shadows
        orthographic
        camera={{ position: [0, 0.6, 8], zoom: 90, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: isTransparent }}
      >
        {!isTransparent && <color attach="background" args={['#1c1415']} />}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[-3, 8, 5]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
          shadow-camera-far={20}
        />
        <pointLight position={[4, 3, 4]} intensity={0.9} color="#b09070" />
        <Suspense fallback={null}>
          <Scene isGlass={isGlass} isTransparent={isTransparent} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </Box>
  );
}

export default LogoAssembly3D;
