import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoAssembly3D from './LogoAssembly3D';

export default {
  title: 'Custom Component/LogoAssembly3D',
  component: LogoAssembly3D,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    width:   { control: 'text',                                    description: '캔버스 너비' },
    height:  { control: { type: 'number', min: 300, max: 800 },  description: '캔버스 높이(px)' },
    isGlass: { control: 'boolean',                                 description: '유리 재질 모드' },
  },
};

/** 항상 동일한 배치로 낙하 — S → O → H → O 순서 */
export const Default = {
  args: {
    width: '100%',
    height: 480,
  },
};

/** 재생 버튼으로 낙하 애니메이션 재시작 */
export const WithReplay = {
  render: (args) => {
    const [key, setKey] = useState(0);
    return (
      <Box sx={{ position: 'relative' }}>
        <LogoAssembly3D key={key} {...args} />
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
    height: 480,
  },
};

/** 세미매트 반투명 흰 유리 재질 버전 */
export const Glass = {
  args: {
    width: '100%',
    height: 480,
    isGlass: true,
  },
};

/** 더 큰 높이 — 낙하 궤적이 더 잘 보임 */
export const Tall = {
  args: {
    width: '100%',
    height: 640,
  },
};
