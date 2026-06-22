import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BoltIcon from '@mui/icons-material/Bolt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { features } from '../../../data';
import FadeTransition from '../../motion/FadeTransition';
import { FeaturedIcon } from '../../../common/ui';

const ICON_MAP = {
  CalendarMonth: CalendarMonthIcon,
  Bolt: BoltIcon,
  LocationOn: LocationOnIcon,
  AutoAwesome: AutoAwesomeIcon,
};

/**
 * FeatureSection 컴포넌트
 *
 * 홈 페이지 공간 특징 벤토 카드 섹션.
 * 타이틀 카드(좌) + 특징 카드 2×2(우) packed rounded 그리드.
 *
 * Props:
 * @param {Array} items - 특징 카드 데이터 배열 [Optional, 기본값: features]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <FeatureSection />
 */
function FeatureSection({ items = features, sx }) {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        px: { xs: 4, sm: 6, md: 10, lg: 14 },
        backgroundColor: 'background.default',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: '2fr 1fr 1fr' },
          gap: '4px',
        }}
      >
        {/* 타이틀 카드 — 데스크탑 col1 rows1-2, 모바일 full-width */}
        <Box
          sx={{
            gridColumn: { xs: '1 / 3', md: '1' },
            gridRow: { md: '1 / 3' },
            borderRadius: '20px',
            backgroundColor: 'secondary.dark',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            p: { xs: 3, md: 4 },
            minHeight: { xs: 160, md: 'unset' },
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: 'accent.main', letterSpacing: '0.14em', display: 'block', mb: 1.5 }}
          >
            공간 특징
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, color: 'secondary.contrastText', lineHeight: 1.2 }}
          >
            일하기 좋은
            <br />
            공간의 기준
          </Typography>
        </Box>

        {/* 특징 카드 4개 */}
        {items.map((item, idx) => {
          const IconComponent = ICON_MAP[item.icon];
          return (
            <FadeTransition key={item.id} direction="up" delay={idx * 80} isTriggerOnView>
              <Box
                sx={{
                  borderRadius: '20px',
                  backgroundColor: 'background.paper',
                  p: { xs: 2.5, md: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  height: '100%',
                  minHeight: { xs: 160, md: 200 },
                }}
              >
                {IconComponent && (
                  <FeaturedIcon icon={IconComponent} theme="modern-neue" size="sm" />
                )}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            </FadeTransition>
          );
        })}
      </Box>
    </Box>
  );
}

export default FeatureSection;
