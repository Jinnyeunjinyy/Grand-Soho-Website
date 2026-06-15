import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import { CategoryTab } from '../../in-page-navigation/CategoryTab';
import { spacePlans, spaceTypes, spacesMeta } from '../../../data/spaces';

const ALL_TAB = { id: 'all', label: '전체' };
const TABS = [ALL_TAB, ...spaceTypes];

/**
 * SpacesPage 컴포넌트
 *
 * /spaces 페이지. 공간 유형 탭 + 요금 카드 그리드.
 *
 * Props:
 * @param {string} reservationUrl - 네이버 예약 외부 URL [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SpacesPage reservationUrl="https://booking.naver.com/..." />
 */
function SpacesPage({ reservationUrl = '#', sx }) {
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
          backgroundColor: 'secondary.main',
          color: 'secondary.contrastText',
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'primary.light', letterSpacing: '0.12em', display: 'block', mb: 1 }}
        >
          Spaces
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>
          공간 안내
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.72)', maxWidth: 480 }}>
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
            <Grid key={plan.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: plan.isPopular ? 'primary.main' : 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                }}
              >
                {plan.isPopular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      px: 1.5,
                      py: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <StarIcon sx={{ fontSize: 12 }} />
                    <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.6875rem' }}>
                      인기
                    </Typography>
                  </Box>
                )}

                <Box sx={{ p: 4, flex: 1 }}>
                  <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.1em' }}>
                    {plan.capacity}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5, mb: 1 }}>
                    {plan.name}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 0.5 }}>
                    {plan.priceLabel}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {plan.priceNote}
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  <Stack spacing={1.5}>
                    {plan.features.map((feat) => (
                      <Box key={feat} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <CheckIcon sx={{ fontSize: 16, color: 'primary.main', mt: '2px', flexShrink: 0 }} />
                        <Typography variant="body2" color="text.secondary">
                          {feat}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <Box sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant={plan.isPopular ? 'contained' : 'outlined'}
                    fullWidth
                    href="/contact"
                    sx={{ py: 1.25 }}
                  >
                    {spacesMeta.inquiryLabel}
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* 예약 CTA */}
        <Box
          sx={{
            mt: 8,
            p: { xs: 4, md: 6 },
            backgroundColor: 'grey.50',
            border: '1px solid',
            borderColor: 'divider',
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

export default SpacesPage;
