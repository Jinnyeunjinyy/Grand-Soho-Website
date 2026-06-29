import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoAssembly from './LogoAssembly';

export default {
  title: 'Custom Component/LogoAssembly',
  component: LogoAssembly,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    width: { control: { type: 'number', min: 100, max: 1200 }, description: 'SVG 너비(px)' },
    height: { control: { type: 'number', min: 26, max: 312 }, description: 'SVG 높이(px)' },
    fillPrimary: { control: 'color', description: '갈색 계열 조각 색상' },
    fillSecondary: { control: 'color', description: '다크 계열 조각 색상' },
    fallDistance: {
      control: { type: 'number', min: 100, max: 2000 },
      description: '낙하 시작 오프셋(px) — 클수록 멀리서 떨어짐',
    },
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#1c1415',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          p: 6,
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

export const Default = {
  args: {
    width: 440,
    height: 114,
    fillPrimary: '#796253',
    fillSecondary: '#463335',
    fallDistance: 500,
  },
};

export const WithReplay = {
  render: (args) => {
    const [key, setKey] = useState(0);
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
        <LogoAssembly key={key} {...args} />
        <Button
          variant="outlined"
          size="small"
          onClick={() => setKey((k) => k + 1)}
          sx={{ color: 'rgba(250,248,245,0.5)', borderColor: 'rgba(250,248,245,0.2)' }}
        >
          다시 재생
        </Button>
      </Box>
    );
  },
  args: {
    width: 440,
    height: 114,
    fillPrimary: '#796253',
    fillSecondary: '#463335',
    fallDistance: 500,
  },
};

export const White = {
  args: {
    width: 440,
    height: 114,
    fillPrimary: 'rgba(255,255,255,0.9)',
    fillSecondary: 'rgba(255,255,255,0.6)',
    fallDistance: 500,
  },
};

export const Large = {
  args: {
    width: 880,
    height: 228,
    fillPrimary: '#796253',
    fillSecondary: '#463335',
    fallDistance: 800,
  },
};
