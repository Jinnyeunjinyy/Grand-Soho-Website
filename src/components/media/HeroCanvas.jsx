import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import Box from '@mui/material/Box';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useMeshRotation(ref, speed) {
  useFrame((_, delta) => {
    if (!ref.current || prefersReducedMotion) return;
    ref.current.rotation.x += delta * speed[0];
    ref.current.rotation.y += delta * speed[1];
  });
}

function IcosahedronObject() {
  const ref = useRef();
  useMeshRotation(ref, [0.08, 0.12]);
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={ref} position={[2.8, 0.8, 0]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial wireframe color="white" opacity={0.14} transparent />
      </mesh>
    </Float>
  );
}

function TorusObject() {
  const ref = useRef();
  useMeshRotation(ref, [0.1, 0.06]);
  return (
    <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.25}>
      <mesh ref={ref} position={[3.6, -1.4, -0.8]}>
        <torusGeometry args={[0.75, 0.22, 8, 24]} />
        <meshBasicMaterial wireframe color="white" opacity={0.12} transparent />
      </mesh>
    </Float>
  );
}

function OctahedronObject() {
  const ref = useRef();
  useMeshRotation(ref, [0.14, 0.09]);
  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.35}>
      <mesh ref={ref} position={[1.6, -1.8, 0.4]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial wireframe color="white" opacity={0.16} transparent />
      </mesh>
    </Float>
  );
}

/**
 * HeroCanvas 컴포넌트
 *
 * Hero 섹션 배경에 오버레이되는 미니멀 3D 와이어프레임 오브젝트 캔버스.
 * React Three Fiber 기반. 배경은 투명(alpha: true)으로 하위 배경이 비침.
 * pointerEvents: none으로 하위 콘텐츠 인터랙션 방해 없음.
 *
 * Props:
 * @param {object} sx - 추가 MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <HeroCanvas sx={{ zIndex: 1 }} />
 */
function HeroCanvas({ sx }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        ...sx,
      }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <IcosahedronObject />
        <TorusObject />
        <OctahedronObject />
      </Canvas>
    </Box>
  );
}

export default HeroCanvas;
