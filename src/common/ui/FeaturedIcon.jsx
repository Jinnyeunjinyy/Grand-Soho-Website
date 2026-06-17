import Box from '@mui/material/Box';

const SIZES = { sm: 32, md: 40, lg: 48, xl: 56 };
const ICON_SIZES = { sm: 16, md: 20, lg: 24, xl: 28 };
const RADII = { sm: '8px', md: '10px', lg: '12px', xl: '14px' };
const INNER_RADII = { sm: '4px', md: '6px', lg: '8px', xl: '10px' };

/**
 * FeaturedIcon 컴포넌트
 *
 * 아이콘을 스타일화된 컨테이너에 담는 컴포넌트.
 * Untitled UI FeaturedIcon을 MUI sx로 포팅.
 *
 * Props:
 * @param {elementType} icon - MUI 아이콘 컴포넌트 참조 (렌더링 전) [Required]
 * @param {string} theme - 스타일 테마 [Optional, 기본값: 'modern-neue']
 *   'light'        — 원형, 연한 배경
 *   'dark'         — 둥근 사각형, 진한 배경 + 스큐어모픽 그림자
 *   'outline'      — 아이콘 주변 동심원 (물결)
 *   'modern'       — 둥근 사각형, 경계선 + 그림자
 *   'modern-neue'  — 외부 컨테이너 + 내부 floating 사각형, 3D 레이어드
 * @param {string} size - 크기 ('sm' | 'md' | 'lg' | 'xl') [Optional, 기본값: 'md']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <FeaturedIcon icon={RocketLaunchIcon} theme="modern-neue" size="md" />
 */
function FeaturedIcon({ icon: Icon, theme = 'modern-neue', size = 'md', sx }) {
  const px = SIZES[size];
  const iconPx = ICON_SIZES[size];
  const radius = RADII[size];

  if (theme === 'light') {
    return (
      <Box sx={{ width: px, height: px, borderRadius: '50%', backgroundColor: 'rgba(70,51,53,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0, ...sx }}>
        {Icon && <Icon sx={{ fontSize: iconPx }} />}
      </Box>
    );
  }

  if (theme === 'dark') {
    return (
      <Box sx={{ width: px, height: px, borderRadius: radius, backgroundColor: 'primary.main', color: 'primary.contrastText', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(44,31,32,0.4), inset 0 1px 0 rgba(255,255,255,0.12)', flexShrink: 0, ...sx }}>
        {Icon && <Icon sx={{ fontSize: iconPx }} />}
      </Box>
    );
  }

  if (theme === 'outline') {
    const outer = px + 20;
    return (
      <Box sx={{ position: 'relative', width: outer, height: outer, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...sx }}>
        <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid', borderColor: 'primary.main', opacity: 0.1 }} />
        <Box sx={{ position: 'absolute', width: px + 6, height: px + 6, borderRadius: '50%', border: '2px solid', borderColor: 'primary.main', opacity: 0.25 }} />
        {Icon && <Icon sx={{ fontSize: iconPx, color: 'primary.main', position: 'relative', zIndex: 1 }} />}
      </Box>
    );
  }

  if (theme === 'modern') {
    return (
      <Box sx={{ width: px, height: px, borderRadius: radius, backgroundColor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', borderColor: 'divider', boxShadow: '0 1px 3px rgba(44,31,32,0.08), 0 1px 2px rgba(44,31,32,0.06)', color: 'primary.main', flexShrink: 0, ...sx }}>
      {Icon && <Icon sx={{ fontSize: iconPx }} />}
      </Box>
    );
  }

  /* modern-neue (default) */
  return (
    <Box sx={{ width: px, height: px, borderRadius: radius, backgroundColor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 0 1px rgba(44,31,32,0.15)', position: 'relative', flexShrink: 0, ...sx }}>
      <Box sx={{
        position: 'absolute',
        inset: '4px',
        borderRadius: INNER_RADII[size],
        backgroundColor: 'background.paper',
        boxShadow: [
          '0px 1px 2px rgba(44,31,32,0.18)',
          '0px 3px 3px rgba(44,31,32,0.15)',
          '1px 8px 5px rgba(44,31,32,0.08)',
          '0px 0px 0px 1px rgba(44,31,32,0.14)',
          'inset 0px -2px 2px rgba(44,31,32,0.20)',
        ].join(', '),
      }} />
      {Icon && <Icon sx={{ fontSize: iconPx, color: 'text.primary', position: 'relative', zIndex: 1 }} />}
    </Box>
  );
}

export { FeaturedIcon };
