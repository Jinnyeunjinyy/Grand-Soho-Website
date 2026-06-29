import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HeroCanvas from './HeroCanvas';

export default {
  title: 'Custom Component/HeroCanvas',
  component: HeroCanvas,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sx: { control: 'object', description: '추가 MUI sx 스타일' },
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: '100%',
          height: '500px',
          backgroundColor: '#1c1415',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Story />
        <Box sx={{ position: 'relative', zIndex: 3, px: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: 'rgba(250,248,245,0.45)', display: 'block', mb: 1 }}
          >
            Grand Soho · Grand Ventures
          </Typography>
          <Typography variant="h2" sx={{ color: 'common.white' }}>
            Hero 콘텐츠 영역
          </Typography>
        </Box>
      </Box>
    ),
  ],
};

export const Default = {
  args: {
    sx: { zIndex: 1 },
  },
};
