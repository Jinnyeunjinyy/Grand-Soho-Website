import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { CategoryTab } from '../../in-page-navigation/CategoryTab';
import { spacePlans, spaceTypes, spacesMeta } from '../../../data/spaces';

const ALL_TAB = { id: 'all', label: '전체' };
const TABS = [ALL_TAB, ...spaceTypes];

/**
 * SpacesCardPage 컴포넌트
 *
 * /spaces 카드형 템플릿. MUI Card + CardMedia + CardContent + CardActions 구성.
 *
 * Props:
 * @param {string} reservationUrl - 네이버 예약 외부 URL [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SpacesCardPage />
 */
function SpacesCardPage({ reservationUrl = spacesMeta.reservationUrl, sx }) {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? spacePlans
    : spacePlans.filter((p) => p.type === activeTab);

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
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480 }}>
          개인실부터 라운지까지. 팀 규모에 맞는 공간을 선택하세요.
        </Typography>
      </Box>

      {/* 탭 + 카드 */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 3, sm: 5, md: 10, lg: 14 } }}>
        <CategoryTab
          categories={TABS}
          selected={activeTab}
          onChange={setActiveTab}
          sx={{ mb: 5 }}
        />

        <Grid container spacing={3}>
          {filtered.map((plan) => (
            <Grid key={plan.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={plan.image}
                  alt={plan.name}
                />
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {plan.name}{plan.contract ? ` · ${plan.contract}` : ''}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {plan.priceLabel}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 예약 CTA */}
        <Box
          sx={{
            mt: 8,
            p: { xs: 4, md: 6 },
            backgroundColor: 'background.subtle',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { sm: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              회의실 단기 예약
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {spacesMeta.ctaNote}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            href={reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ px: 4, py: 1.5, flexShrink: 0 }}
          >
            {spacesMeta.ctaLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SpacesCardPage;
