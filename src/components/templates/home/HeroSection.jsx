import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { heroCopy } from '../../../data';
import LogoPhysics from '../../motion/LogoPhysics';

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
 * 3. LogoPhysics 투명 오버레이 (zIndex: 1)
 * 4. 텍스트 콘텐츠 (zIndex: 2)
 *
 * Props:
 * @param {object} copy - 히어로 카피 데이터 [Optional, 기본값: heroCopy]
 * @param {string} imageSrc - 배경 이미지 경로 [Optional]
 * @param {string} imageAlt - 이미지 alt 텍스트 [Optional, 기본값: 'Grand Soho 공간']
 * @param {boolean} is3DEnabled - 3D 캔버스 활성화 여부 [Optional, 기본값: true]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <HeroSection imageSrc="/images/exterior.jpeg" />
 */
function HeroSection({ copy = heroCopy, imageSrc, imageAlt = 'Grand Soho 공간', is3DEnabled = true, sx }) {
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
      {is3DEnabled && (
        <LogoPhysics
          isTransparent
          width="100%"
          height="100%"
          sx={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
        />
      )}

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
            maxWidth: 640,
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
                maxWidth: 480,
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
