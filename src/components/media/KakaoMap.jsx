import { Map, MapMarker, CustomOverlayMap, useKakaoLoader } from 'react-kakao-maps-sdk';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY ?? '';

/**
 * KakaoMap 컴포넌트
 *
 * 카카오맵 JavaScript SDK 기반 지도 임베드. 마커 + 라벨 오버레이 표시.
 * VITE_KAKAO_MAP_KEY 환경변수가 없으면 안내 placeholder로 대체된다.
 *
 * Props:
 * @param {number} lat - 마커/중심 위도 [Required]
 * @param {number} lng - 마커/중심 경도 [Required]
 * @param {string} markerLabel - 마커 위에 표시할 라벨 [Optional]
 * @param {number} level - 카카오맵 확대 레벨 (낮을수록 확대) [Optional, 기본값: 3]
 * @param {string|number} height - 지도 높이 [Optional, 기본값: '100%']
 * @param {object} sx - 추가 MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <KakaoMap lat={37.5084} lng={127.0299} markerLabel="Grand Soho" height={400} />
 */
function KakaoMap({ lat, lng, markerLabel, level = 3, height = '100%', sx }) {
  const [loading, error] = useKakaoLoader({ appkey: KAKAO_MAP_KEY });

  if (!KAKAO_MAP_KEY || error) {
    return (
      <Box
        sx={{
          width: '100%',
          height,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 1,
          ...sx,
        }}
      >
        <LocationOnIcon sx={{ fontSize: 32, color: 'text.disabled' }} />
        <Typography variant="body2" color="text.disabled">
          {error ? '카카오맵을 불러오지 못했습니다' : '카카오맵 준비 중'}
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return <Box sx={{ width: '100%', height, backgroundColor: 'background.paper', ...sx }} />;
  }

  const position = { lat, lng };

  return (
    <Box sx={{ width: '100%', height, ...sx }}>
      <Map center={position} level={level} style={{ width: '100%', height: '100%' }}>
        <MapMarker position={position} />
        {markerLabel && (
          <CustomOverlayMap position={position} yAnchor={1.6}>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                backgroundColor: 'common.white',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                whiteSpace: 'nowrap',
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {markerLabel}
              </Typography>
            </Box>
          </CustomOverlayMap>
        )}
      </Map>
    </Box>
  );
}

export default KakaoMap;
