import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { FeaturedIcon } from '../../common/ui/FeaturedIcon';

/**
 * BenefitCard 컴포넌트
 *
 * Packed Rounded Cards 스타일의 혜택/특징 카드.
 * 카드 간 gap을 최소화(6px)해 배경이 틈새로 비쳐 분리된 느낌을 주는 레이아웃에서 사용.
 *
 * Props:
 * @param {elementType} icon - MUI 아이콘 컴포넌트 참조 (렌더링 전) [Optional]
 * @param {string} iconTheme - FeaturedIcon 테마 [Optional, 기본값: 'modern-neue']
 * @param {string} iconSize - FeaturedIcon 크기 [Optional, 기본값: 'md']
 * @param {string} tag - 카드 상단 레이블 텍스트 [Optional]
 * @param {string} title - 카드 제목 [Required]
 * @param {string} description - 카드 설명 [Optional]
 * @param {string} frequency - 빈도/주기 텍스트 [Optional]
 * @param {string} partner - 파트너/출처 텍스트 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <BenefitCard
 *   icon={RocketLaunchIcon}
 *   tag="FUNDING"
 *   title="투자 연계"
 *   description="그랜드벤처스 심사역과 직접 연결됩니다."
 *   frequency="상시"
 *   partner="그랜드벤처스"
 * />
 */
function BenefitCard({ icon, iconTheme = 'modern-neue', iconSize = 'md', tag, title, description, frequency, partner, sx }) {
  return (
    <Box
      sx={{
        borderRadius: '20px',
        backgroundColor: 'background.paper',
        p: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        transition: 'box-shadow 200ms',
        '&:hover': {
          boxShadow: '0 4px 24px rgba(44,31,32,0.08)',
        },
        ...sx,
      }}
    >
      {icon && (
        <FeaturedIcon icon={icon} theme={iconTheme} size={iconSize} />
      )}

      <Box>
        {tag && (
          <Typography
            variant="caption"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              display: 'block',
              mb: 0.5,
            }}
          >
            {tag}
          </Typography>
        )}
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          {title}
        </Typography>
      </Box>

      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, flex: 1 }}>
          {description}
        </Typography>
      )}

      {(frequency || partner) && (
        <>
          <Divider />
          <Typography variant="caption" color="text.disabled" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {frequency && (
              <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>
                {frequency}
              </Box>
            )}
            {frequency && partner && ' · '}
            {partner}
          </Typography>
        </>
      )}
    </Box>
  );
}

export { BenefitCard };
