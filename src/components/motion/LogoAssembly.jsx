import { motion } from 'framer-motion';
import Box from '@mui/material/Box';

/**
 * SOHO 로고를 구성하는 10개 조각.
 * variant: 'primary' → fillPrimary, 'secondary' → fillSecondary
 * delay: 왼쪽(S) → 오른쪽(두 번째 O) 순 stagger
 */
const PIECES = [
  // S — 상단 반원
  {
    d: 'M14.2 0.100006H28.4V28.4H14.2C6.39995 28.4 0 22 0 14.2C0 6.40001 6.39995 0 14.2 0V0.100006Z',
    variant: 'primary',
    delay: 0,
  },
  // S — 상단 삼각형
  {
    d: 'M28.3008 28.4996V0.0996094H56.7007L28.3008 28.4996Z',
    variant: 'secondary',
    delay: 0.1,
  },
  // S — 하단 반원
  {
    d: 'M42.4993 56.8004H28.2993L28.2993 28.5004L42.4993 28.5004C50.2993 28.5004 56.6992 34.9004 56.6992 42.7004C56.6992 50.5004 50.2993 56.9004 42.4993 56.9004V56.8004Z',
    variant: 'primary',
    delay: 0.18,
  },
  // S — 하단 삼각형
  {
    d: 'M28.3 28.5V56.8H0L28.3 28.5Z',
    variant: 'secondary',
    delay: 0.26,
  },
  // 첫 번째 O — 링
  {
    d: 'M82.6007 0.0996094C66.9007 0.0996094 54.3008 12.7996 54.3008 28.3996C54.3008 43.9996 67.0007 56.6996 82.6007 56.6996C98.2007 56.6996 110.901 43.9996 110.901 28.3996C110.901 12.7996 98.2007 0.0996094 82.6007 0.0996094ZM82.6007 35.4996C78.7007 35.4996 75.5007 32.2996 75.5007 28.3996C75.5007 24.4996 78.7007 21.2996 82.6007 21.2996C86.5007 21.2996 89.7007 24.4996 89.7007 28.3996C89.7007 32.2996 86.5007 35.4996 82.6007 35.4996Z',
    variant: 'secondary',
    delay: 0.38,
  },
  // H — 상단 원
  {
    d: 'M122.7 28.4996C114.858 28.4996 108.5 22.142 108.5 14.2996C108.5 6.45716 114.858 0.0996094 122.7 0.0996094C130.543 0.0996094 136.9 6.45716 136.9 14.2996C136.9 22.142 130.543 28.4996 122.7 28.4996Z',
    variant: 'secondary',
    delay: 0.5,
  },
  // H — 상단 사다리꼴
  {
    d: 'M155.301 28.4996H136.901V0.0996094H165.301L155.301 28.4996Z',
    variant: 'primary',
    delay: 0.58,
  },
  // H — 하단 사다리꼴
  {
    d: 'M118.6 28.5H136.9V56.8H108.6L118.6 28.5Z',
    variant: 'primary',
    delay: 0.66,
  },
  // H — 하단 원
  {
    d: 'M151.101 56.7994C143.258 56.7994 136.901 50.4419 136.901 42.5994C136.901 34.757 143.258 28.3994 151.101 28.3994C158.943 28.3994 165.301 34.757 165.301 42.5994C165.301 50.4419 158.943 56.7994 151.101 56.7994Z',
    variant: 'secondary',
    delay: 0.74,
  },
  // 두 번째 O — 링
  {
    d: 'M191.2 0.0996094C175.5 0.0996094 162.9 12.7996 162.9 28.3996C162.9 43.9996 175.6 56.6996 191.2 56.6996C206.8 56.6996 219.5 43.9996 219.5 28.3996C219.5 12.7996 206.8 0.0996094 191.2 0.0996094ZM191.2 35.4996C187.3 35.4996 184.1 32.2996 184.1 28.3996C184.1 24.4996 187.3 21.2996 191.2 21.2996C195.1 21.2996 198.3 24.4996 198.3 28.3996C198.3 32.2996 195.1 35.4996 191.2 35.4996Z',
    variant: 'secondary',
    delay: 0.84,
  },
];

const SPRING = { type: 'spring', stiffness: 160, damping: 14, mass: 1.2 };

/**
 * LogoAssembly 컴포넌트
 *
 * SOHO 로고의 10개 조각이 위에서 자연스럽게 떨어지며 쌓이는 애니메이션 컴포넌트.
 * Framer Motion spring 물리 기반. S → O → H → O 순 stagger.
 *
 * Props:
 * @param {number|string} width - SVG 너비 [Optional, 기본값: 220]
 * @param {number|string} height - SVG 높이 [Optional, 기본값: 57]
 * @param {string} fillPrimary - 갈색 계열 조각 색상 [Optional, 기본값: '#796253']
 * @param {string} fillSecondary - 다크 계열 조각 색상 [Optional, 기본값: '#463335']
 * @param {number} fallDistance - 낙하 시작 오프셋(px) [Optional, 기본값: 500]
 * @param {object} sx - 추가 MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <LogoAssembly width={440} height={114} />
 */
function LogoAssembly({
  width = 220,
  height = 57,
  fillPrimary = '#796253',
  fillSecondary = '#463335',
  fallDistance = 500,
  sx,
}) {
  return (
    <Box sx={{ overflow: 'hidden', display: 'inline-block', width, height, ...sx }}>
      <svg
        viewBox="0 0 220 57"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {PIECES.map((piece, i) => (
          <motion.g
            key={i}
            initial={{ y: -fallDistance, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              y: { ...SPRING, delay: piece.delay },
              opacity: { duration: 0.06, delay: piece.delay },
            }}
          >
            <path
              d={piece.d}
              fill={piece.variant === 'primary' ? fillPrimary : fillSecondary}
            />
          </motion.g>
        ))}
      </svg>
    </Box>
  );
}

export default LogoAssembly;
