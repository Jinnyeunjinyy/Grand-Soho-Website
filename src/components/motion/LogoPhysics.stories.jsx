import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoPhysics from './LogoPhysics';

export default {
  title: 'Custom Component/LogoPhysics',
  component: LogoPhysics,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    width:  { control: 'text',                                   description: '캔버스 너비' },
    height: { control: { type: 'number', min: 300, max: 1000 }, description: '캔버스 높이(px)' },
  },
};

export const Default = {
  args: {
    width: '100%',
    height: 600,
  },
};

/** 새로고침 버튼으로 물리 시뮬레이션 재시작 */
export const WithRestart = {
  render: (args) => {
    const [key, setKey] = useState(0);
    return (
      <Box sx={{ position: 'relative' }}>
        <LogoPhysics key={key} {...args} />
        <Button
          variant="outlined"
          size="small"
          onClick={() => setKey((k) => k + 1)}
          sx={{
            position: 'absolute',
            bottom: 24,
            right: 24,
            color: 'rgba(250,248,245,0.5)',
            borderColor: 'rgba(250,248,245,0.2)',
            '&:hover': { borderColor: 'rgba(250,248,245,0.5)' },
          }}
        >
          다시 떨어뜨리기
        </Button>
      </Box>
    );
  },
  args: {
    width: '100%',
    height: 600,
  },
};
