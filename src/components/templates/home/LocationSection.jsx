import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { locationInfo, contactInfo } from '../../../data/contact';
import { navCta } from '../../../data/navigation';

/**
 * LocationSection 컴포넌트
 *
 * 홈 페이지 위치 및 교통 안내 섹션.
 * 카카오맵 Placeholder + 주소·교통·운영시간 정보.
 *
 * Props:
 * @param {object} location - 위치 데이터 [Optional, 기본값: locationInfo]
 * @param {object} contact - 연락처 데이터 [Optional, 기본값: contactInfo]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <LocationSection />
 */
function LocationSection({ location = locationInfo, contact = contactInfo, sx }) {
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
          오시는 길
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          {location.name}
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 4, md: 8 }}>
        {/* 지도 영역 */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              width: '100%',
              height: { xs: 260, md: 400 },
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <LocationOnIcon sx={{ fontSize: 32, color: 'text.disabled' }} />
            <Typography variant="body2" color="text.disabled">
              카카오맵 준비 중
            </Typography>
          </Box>
        </Grid>

        {/* 정보 영역 */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={4} divider={<Divider />}>
            {/* 주소 */}
            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.1em' }}>
                주소
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 500 }}>
                {location.address}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {location.addressDetail}
              </Typography>
            </Box>

            {/* 교통 */}
            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.1em' }}>
                교통
              </Typography>
              <Stack spacing={1} sx={{ mt: 1 }}>
                {location.transit.map((t, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <DirectionsSubwayIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Typography variant="body2">
                      {t.line} {t.station} {t.walk}
                    </Typography>
                  </Box>
                ))}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <DirectionsCarIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {location.parking}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* 운영시간 */}
            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.1em' }}>
                운영시간
              </Typography>
              <Stack spacing={0.5} sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <AccessTimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2">{contact.hours.weekday}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box sx={{ width: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    {contact.hours.weekend}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* CTA */}
            <Stack spacing={1.5}>
              <Button
                variant="contained"
                href="/contact"
                fullWidth
                sx={{ py: 1.5 }}
              >
                입주 문의하기
              </Button>
              <Button
                variant="outlined"
                href={navCta.path}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                sx={{ py: 1.5 }}
              >
                {navCta.label} ↗
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LocationSection;
