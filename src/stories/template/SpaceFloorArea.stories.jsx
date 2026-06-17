import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

export default {
  title: 'Template/Space Floor Area',
};

const SPACE_SIZES = [
  { name: '오피스', area: '9.2㎡', pyeong: '약 2.8평', capacity: '최대 4인' },
  { name: '미팅룸 1', area: '11.23㎡', pyeong: '약 3.4평', capacity: '9인실' },
  { name: '미팅룸 2', area: '7㎡', pyeong: '약 2.1평', capacity: '6인실' },
  { name: '라운지', area: '43.7㎡', pyeong: '약 13.2평', capacity: '최대 40인' },
];

export const Default = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="overline" sx={{ color: 'accent.main', letterSpacing: '0.14em', display: 'block', mb: 1 }}>
        Floor Area
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 5 }}>
        공간 규모
      </Typography>
      <Grid container spacing={2}>
        {SPACE_SIZES.map((space) => (
          <Grid key={space.name} size={{ xs: 6, md: 3 }}>
            <Box
              sx={{
                borderRadius: '20px',
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                p: { xs: 3, md: 4 },
                height: '100%',
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                {space.name}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                {space.area}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {space.pyeong}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {space.capacity}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  ),
};
