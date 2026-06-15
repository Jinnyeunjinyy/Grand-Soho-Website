import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { heroCopy } from '../../../data/hero';

/**
 * HeroSection 컴포넌트
 *
 * 홈 페이지 최상단 히어로 섹션.
 * 좌측(60%): 웜화이트 배경 + 헤드라인·서브카피·CTA
 * 우측(40%): 딥다크 배경 + 공간 대표 이미지 (이미지 없으면 단색 패널)
 *
 * Props:
 * @param {object} copy - 히어로 카피 데이터 [Optional, 기본값: heroCopy]
 * @param {string} imageSrc - 우측 패널 공간 사진 경로 [Optional]
 * @param {string} imageAlt - 공간 사진 alt 텍스트 [Optional, 기본값: 'Grand Soho 공간']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <HeroSection />
 * <HeroSection imageSrc="/images/hero.jpg" />
 */
function HeroSection({ copy = heroCopy, imageSrc, imageAlt = 'Grand Soho 공간', sx }) {
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
        minHeight: { xs: 'auto', md: '92vh' },
        ...sx,
      }}
    >
      {/* 좌측 — 텍스트 패널 (웜화이트) */}
      <Box
        sx={{
          flex: { xs: '1 0 auto', md: '0 0 60%' },
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'background.default',
          px: { xs: 4, sm: 6, md: 10, lg: 14 },
          py: { xs: 10, md: 0 },
        }}
      >
        <Box sx={{ maxWidth: 600 }}>
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

          <Typography
            variant="h1"
            sx={{
              color: 'text.primary',
              mb: 4,
              whiteSpace: 'pre-line',
            }}
          >
            {copy.headline}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 6,
              maxWidth: 480,
              whiteSpace: 'pre-line',
            }}
          >
            {copy.subheadline}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {copy.cta.map((item) => (
              <Button
                key={item.label}
                variant={item.variant}
                size="large"
                href={item.path}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                sx={{ px: 4, py: 1.5, fontSize: '0.9375rem' }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* 우측 — 이미지 패널 (딥다크) */}
      <Box
        sx={{
          flex: { xs: '0 0 320px', md: '0 0 40%' },
          backgroundColor: 'secondary.main',
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: 320, md: 'unset' },
        }}
      >
        {imageSrc ? (
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
              display: 'block',
            }}
          />
        ) : (
          /* 이미지 없을 때 브랜드 텍스트 플레이스홀더 */
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-end',
              p: { xs: 4, md: 8 },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: 'secondary.contrastText',
                opacity: 0.12,
                fontStyle: 'italic',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              Grand
              <br />
              Soho
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default HeroSection;
