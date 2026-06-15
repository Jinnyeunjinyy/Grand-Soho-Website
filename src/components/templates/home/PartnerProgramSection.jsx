import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GavelIcon from '@mui/icons-material/Gavel';
import HubIcon from '@mui/icons-material/Hub';
import { partnerBenefits, partnerProgramMeta } from '../../../data/partnerProgram';
import FadeTransition from '../../motion/FadeTransition';

const ICON_MAP = {
  RocketLaunch: RocketLaunchIcon,
  TrendingUp: TrendingUpIcon,
  Gavel: GavelIcon,
  Hub: HubIcon,
};

/**
 * PartnerProgramSection 컴포넌트
 *
 * 홈 페이지 VC 파트너 프로그램 혜택 섹션 (4종).
 * Grand Soho의 핵심 차별점을 강조하는 섹션.
 *
 * Props:
 * @param {Array} benefits - 혜택 카드 데이터 배열 [Optional, 기본값: partnerBenefits]
 * @param {object} meta - 섹션 메타 데이터 [Optional, 기본값: partnerProgramMeta]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <PartnerProgramSection />
 */
function PartnerProgramSection({ benefits = partnerBenefits, meta = partnerProgramMeta, sx }) {
  return (
    <Box
      component="section"
      sx={{
        pt: { xs: 14, md: 20 },
        pb: { xs: 10, md: 16 },
        px: { xs: 4, sm: 6, md: 10, lg: 14 },
        backgroundColor: 'background.default',
        ...sx,
      }}
    >
      {/* Floating 헤더 — 이전 섹션(FeatureSection) 경계를 살짝 침범해 오버랩 */}
      <Box sx={{ mt: { xs: -8, md: -12 }, mb: { xs: 6, md: 8 } }}>
        <Chip
          label={meta.badge}
          size="small"
          sx={{
            mb: 2,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 600,
            fontSize: '0.6875rem',
            letterSpacing: '0.06em',
            borderRadius: 0,
          }}
        />
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>
          {meta.sectionTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, lineHeight: 1.8 }}>
          {meta.sectionSubtitle}
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 0, md: 0 }} sx={{ border: '1px solid', borderColor: 'divider' }}>
        {benefits.map((benefit, idx) => {
          const IconComponent = ICON_MAP[benefit.icon];
          return (
            <Grid key={benefit.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <FadeTransition direction="up" delay={idx * 100} isTriggerOnView>
                <Box
                  sx={{
                    p: { xs: 4, md: 5 },
                    height: '100%',
                    borderRight: { md: idx < benefits.length - 1 ? '1px solid' : 'none' },
                    borderBottom: { xs: idx < benefits.length - 1 ? '1px solid' : 'none', md: 'none' },
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    transition: 'background-color 200ms',
                    '&:hover': {
                      backgroundColor: 'background.paper',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    {IconComponent && (
                      <IconComponent sx={{ fontSize: 20, color: 'primary.main' }} />
                    )}
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        display: 'block',
                        mb: 0.5,
                      }}
                    >
                      {benefit.tag}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                      {benefit.title}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, flex: 1 }}>
                    {benefit.description}
                  </Typography>

                  <Divider />

                  <Typography variant="caption" color="text.disabled" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {benefit.frequency && (
                      <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>
                        {benefit.frequency}
                      </Box>
                    )}
                    {benefit.frequency && ' · '}
                    {benefit.partner}
                  </Typography>
                </Box>
              </FadeTransition>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default PartnerProgramSection;
