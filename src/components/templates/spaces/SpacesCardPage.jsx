import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WifiIcon from '@mui/icons-material/Wifi';
import PrintIcon from '@mui/icons-material/Print';
import { CategoryTab } from '../../in-page-navigation/CategoryTab';
import { BenefitCardSection } from '../../card/BenefitCardSection';
import { spacePlans, spaceTypes, spacesMeta } from '../../../data/spaces';

const AMENITIES = [
  { id: 'coffee', icon: LocalCafeIcon, title: '커피 무료', description: '스페셜티 원두 커피를 자유롭게 즐기세요.' },
  { id: 'hvac', icon: AcUnitIcon, title: '24시간 냉난방', description: '계절에 관계없이 쾌적한 온도를 유지합니다.' },
  { id: 'wifi', icon: WifiIcon, title: '초고속 와이파이', description: '업무에 불편함 없는 인터넷 속도를 제공합니다.' },
  { id: 'print', icon: PrintIcon, title: '프린터 무제한', description: '흑백 출력을 무제한으로 무료 제공합니다.' },
];

const ALL_TAB = { id: 'all', label: '전체' };
const TABS = [ALL_TAB, ...spaceTypes];

const MOBILE_INITIAL = 8;

/**
 * SpacesCardPage 컴포넌트
 *
 * /spaces 카드형 템플릿. MUI Card + CardMedia + CardContent + CardActions 구성.
 * 모바일: 2열 그리드, 첫 8개만 표시 후 더보기 버튼. 카드 클릭 시 네이버 예약으로 이동.
 * 데스크탑: 전체 카드 표시, 하단 CTA 버튼 표시.
 *
 * Props:
 * @param {string} reservationUrl - 네이버 예약 외부 URL [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SpacesCardPage />
 */
function SpacesCardPage({ reservationUrl = spacesMeta.reservationUrl, sx }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [activeTab, setActiveTab] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const filtered = activeTab === 'all'
    ? spacePlans
    : spacePlans.filter((p) => p.type === activeTab);

  const visiblePlans = (isMobile && !showAll)
    ? filtered.slice(0, MOBILE_INITIAL)
    : filtered;

  const hasMore = isMobile && !showAll && filtered.length > MOBILE_INITIAL;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowAll(false);
  };

  return (
    <Box sx={{ ...sx }}>
      {/* 페이지 헤더 */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 3, sm: 5, md: 10, lg: 14 },
          backgroundColor: 'background.default',
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'accent.main', letterSpacing: '0.14em', display: 'block', mb: 1 }}
        >
          Spaces
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
          공간 안내
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mb: 6 }}>
          일에만 집중할 수 있는 환경을 제공합니다.<br />
          팀 규모에 맞게 공간만 선택하세요.
        </Typography>
        <BenefitCardSection
          items={AMENITIES}
          sx={{ mx: { xs: -3, sm: -5, md: 0 }, px: { xs: 3, sm: 5, md: 0 } }}
        />
      </Box>

      {/* 탭 + 카드 */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 3, sm: 5, md: 10, lg: 14 } }}>
        <CategoryTab
          categories={TABS}
          selected={activeTab}
          onChange={handleTabChange}
          sx={{ mb: 5 }}
        />

        <Grid container spacing={{ xs: 1.5, md: 3 }}>
          {visiblePlans.map((plan) => (
            <Grid key={plan.id} size={{ xs: 6, md: 4 }}>
              <Card sx={{ position: 'relative', height: '100%' }}>
                {plan.privilege && (
                  <Chip
                    label={plan.privilegeNote}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      zIndex: 1,
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      backgroundColor: plan.privilege === 'GVC'
                        ? 'primary.main'
                        : 'secondary.dark',
                      color: plan.privilege === 'GVC'
                        ? 'primary.contrastText'
                        : 'secondary.contrastText',
                      borderRadius: '50px',
                    }}
                  />
                )}
                {isMobile ? (
                  <CardActionArea
                    component="a"
                    href={reservationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ height: '100%' }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={plan.image}
                      alt={plan.name}
                    />
                    <CardContent sx={{ p: { xs: 1.5 } }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.8125rem' }}>
                        {plan.name}
                        {plan.capacity ? ` · ${plan.capacity}` : ''}
                        {plan.contract ? ` · ${plan.contract}` : ''}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {plan.priceLabel}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                ) : (
                  <>
                    <CardMedia
                      component="img"
                      height="200"
                      image={plan.image}
                      alt={plan.name}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {plan.name}
                        {plan.capacity ? ` · ${plan.capacity}` : ''}
                        {plan.contract ? ` · ${plan.contract}` : ''}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {plan.priceLabel}
                      </Typography>
                    </CardContent>
                  </>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 더보기 버튼 (모바일 전용) */}
        {hasMore && (
          <Box sx={{ mt: 3, display: { md: 'none' }, textAlign: 'center' }}>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => setShowAll(true)}
              sx={{ px: 4 }}
            >
              더보기 ({filtered.length - MOBILE_INITIAL}개)
            </Button>
          </Box>
        )}

        {/* 예약 버튼 (데스크탑 전용) */}
        <Box sx={{ mt: 4, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            href={reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ px: 5, py: 1.5 }}
          >
            {spacesMeta.ctaLabel}
          </Button>
        </Box>

      </Box>
    </Box>
  );
}

export default SpacesCardPage;
