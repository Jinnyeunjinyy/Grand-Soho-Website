import KakaoMap from './KakaoMap';

export default {
  title: 'Custom Component/KakaoMap',
  component: KakaoMap,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    lat: { control: 'number', description: '마커/중심 위도' },
    lng: { control: 'number', description: '마커/중심 경도' },
    markerLabel: { control: 'text', description: '마커 위에 표시할 라벨' },
    level: { control: { type: 'number', min: 1, max: 10 }, description: '카카오맵 확대 레벨 (낮을수록 확대)' },
    height: { control: 'text', description: '지도 높이' },
  },
};

/** VITE_KAKAO_MAP_KEY 미설정 시 placeholder로 표시됨 */
export const Default = {
  args: {
    lat: 37.5084,
    lng: 127.0299,
    markerLabel: 'Grand Soho',
    level: 3,
    height: 400,
  },
};
