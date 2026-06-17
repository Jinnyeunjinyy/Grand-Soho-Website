import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GavelIcon from '@mui/icons-material/Gavel';
import HubIcon from '@mui/icons-material/Hub';
import { BenefitCard } from '../../card/BenefitCard';
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
 * BenefitCard + Packed Rounded Cards 레이아웃 사용.
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
      {/* Floating 헤더 — 이전 섹션 경계를 살짝 침범해 오버랩 */}
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
            borderRadius: '50px',
          }}
        />
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>
          {meta.sectionTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, lineHeight: 1.8 }}>
          {meta.sectionSubtitle}
        </Typography>
      </Box>

      {/* Packed Rounded Cards 그리드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: '6px',
        }}
      >
        {benefits.map((benefit, idx) => {
          const IconComponent = ICON_MAP[benefit.icon];
          return (
            <FadeTransition key={benefit.id} direction="up" delay={idx * 80} isTriggerOnView>
              <BenefitCard
                icon={IconComponent ?? null}
                tag={benefit.tag}
                title={benefit.title}
                description={benefit.description}
                frequency={benefit.frequency}
                partner={benefit.partner}
                sx={{ height: '100%' }}
              />
            </FadeTransition>
          );
        })}
      </Box>
    </Box>
  );
}

export default PartnerProgramSection;
