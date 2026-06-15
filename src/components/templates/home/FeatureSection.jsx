import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BoltIcon from '@mui/icons-material/Bolt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { features } from '../../../data/features';
import FadeTransition from '../../motion/FadeTransition';

const ICON_MAP = {
  CalendarMonth: CalendarMonthIcon,
  Bolt: BoltIcon,
  LocationOn: LocationOnIcon,
  AutoAwesome: AutoAwesomeIcon,
};

/**
 * FeatureSection 컴포넌트
 *
 * 홈 페이지 공간 특징 카드 섹션 (4종).
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
        backgroundColor: 'background.subtle',
        ...sx,
      }}
    >
      <Box sx={{ mb: { xs: 6, md: 8 } }}>
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', letterSpacing: '0.12em', display: 'block', mb: 1 }}
        >
          공간 특징
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          일하기 좋은 공간의 기준
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 4, md: 6 }}>
        {items.map((item, idx) => {
          const IconComponent = ICON_MAP[item.icon];
          return (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <FadeTransition direction="up" delay={idx * 80} isTriggerOnView>
                <Box>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      mb: 2,
                    }}
                  >
                    {IconComponent && <IconComponent sx={{ fontSize: 24 }} />}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {item.description}
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

export default FeatureSection;
