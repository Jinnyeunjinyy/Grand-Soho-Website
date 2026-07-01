import { motion } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { heroCopy } from '../../../data';
import LogoPhysics from '../../motion/LogoPhysics';
import LogoAssembly3D from '../../motion/LogoAssembly3D';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: prefersReducedMotion ? 0 : 0.18,
      delayChildren: prefersReducedMotion ? 0 : 0.3,
    },
  },
};

const itemVariants = prefersReducedMotion
  ? { hidden: {}, visible: {} }
  : {
      hidden: { opacity: 0, y: 22 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      },
    };

/**
 * HeroSection 컴포넌트
 *
 * 홈 페이지 최상단 히어로 섹션.
 * 이미지 배경 + 3D 와이어프레임 오버레이 (HeroCanvas) + framer-motion 텍스트 입장 애니메이션.
 *
 * 레이어 순서 (아래 → 위):
 * 1. 배경 이미지
 * 2. 다크 그라디언트 오버레이
 * 3. 3D 오버레이 (zIndex: 1) — isAssemblyOnly 여부에 따라 LogoPhysics 또는 LogoAssembly3D(glass) 중 하나
 * 4. 텍스트 콘텐츠 (zIndex: 2)
 *
 * Props:
 * @param {object} copy - 히어로 카피 데이터 [Optional, 기본값: heroCopy]
 * @param {string} imageSrc - 배경 이미지 경로 [Optional]
 * @param {string} imageAlt - 이미지 alt 텍스트 [Optional, 기본값: 'Grand Soho 공간']
 * @param {boolean} is3DEnabled - 3D 캔버스 활성화 여부 [Optional, 기본값: true]
 * @param {boolean} isAssemblyOnly - LogoPhysics 대신 LogoAssembly3D(glass) 전체 화면 오버레이 사용 (is3DEnabled 필요) [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <HeroSection imageSrc="/images/exterior.jpeg" />
 * <HeroSection imageSrc="/images/exterior.jpeg" isAssemblyOnly />
 */
function HeroSection({
  copy = heroCopy,
  imageSrc,
  imageAlt = 'Grand Soho 공간',
  is3DEnabled = true,
  isAssemblyOnly = false,
  sx,
}) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: '80vh', md: '92vh' },
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
    >
      {/* 배경 이미지 */}
      {imageSrc && (
        <Box
          component="img"
          src={imageSrc}
          alt={imageAlt}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      )}

      {/* 다크 그라디언트 오버레이 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(28,20,21,0.72) 0%, rgba(28,20,21,0.40) 60%, rgba(28,20,21,0.15) 100%)',
        }}
      />

      {/* LogoPhysics 투명 오버레이 */}
      {is3DEnabled && !isAssemblyOnly && (
        <LogoPhysics
          isTransparent
          width="100%"
          height="100%"
          sx={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
        />
      )}

      {/* LogoAssembly3D 유리 재질 투명 오버레이 — 우측 여백에 50% 축소 배치 (씬 내부에서 스케일/오프셋 처리, 크롭 방지) */}
      {is3DEnabled && isAssemblyOnly && (
        <LogoAssembly3D
          isGlass
          isTransparent
          width="100%"
          height="100%"
          sx={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
        />
      )}

      {/* 하단 페이드 — 다음 섹션 배경색으로 서서히 녹아들며 경계를 부드럽게 만든다.
          균일한 간격의 stop(0/50/100%)은 눈에 계단처럼 보이므로, ease 곡선을
          흉내 낸 5단 stop(0/35/58/78/100%)으로 초반은 느리고 끝은 촘촘하게 진해지도록 함. */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: { xs: '30%', md: '38%' },
          zIndex: 1,
          pointerEvents: 'none',
          background: (theme) => {
            const c = theme.palette.background.default;
            return `linear-gradient(to bottom,
              ${alpha(c, 0)} 0%,
              ${alpha(c, 0.1)} 35%,
              ${alpha(c, 0.38)} 58%,
              ${alpha(c, 0.72)} 78%,
              ${c} 100%)`;
          },
        }}
      />

      {/* 콘텐츠 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <Box
          sx={{
            px: { xs: 4, sm: 6, md: 10, lg: 14 },
            py: { xs: 12, md: 0 },
            maxWidth: 760,
          }}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="overline"
              sx={{
                color: 'accent.main',
                letterSpacing: '0.14em',
                mb: 3,
                display: 'block',
              }}
            >
              Grand Soho · Grand Ventures
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              sx={{
                color: 'common.white',
                mb: 4,
                whiteSpace: 'nowrap',
              }}
            >
              {copy.headline}
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(250,248,245,0.80)',
                mb: 6,
                whiteSpace: 'pre-line',
              }}
            >
              {copy.subheadline}
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              {copy.cta.map((item) => (
                <Button
                  key={item.label}
                  variant={item.variant === 'outlined' ? 'outlined' : 'contained'}
                  size="large"
                  href={item.path}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '0.9375rem',
                    ...(item.variant === 'outlined' && {
                      borderColor: 'rgba(250,248,245,0.5)',
                      color: 'common.white',
                      '&:hover': {
                        borderColor: 'common.white',
                        backgroundColor: 'rgba(250,248,245,0.08)',
                      },
                    }),
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
}

export default HeroSection;
