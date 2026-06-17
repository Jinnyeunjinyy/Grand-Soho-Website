import Box from '@mui/material/Box';
import { BenefitCard } from './BenefitCard';
import FadeTransition from '../motion/FadeTransition';

/**
 * BenefitCardSection 컴포넌트
 *
 * BenefitCard 카드들을 모바일 수평 스크롤 캐러셀 / 데스크탑 그리드로 렌더링하는 레이아웃 섹션.
 * PartnerProgramSection, SpacesCardPage 등 재사용 가능.
 *
 * Props:
 * @param {Array} items - 카드 데이터 배열 [Required]
 *   각 item: { id?, icon, tag?, title, description?, frequency?, partner? }
 * @param {number} columns - 데스크탑 그리드 열 수 [Optional, 기본값: 4]
 * @param {object} sx - 컨테이너 추가 스타일 (mx/px 오버라이드 가능) [Optional]
 *
 * Example usage:
 * <BenefitCardSection items={benefits} columns={4} />
 * <BenefitCardSection items={amenities} sx={{ mx: { xs: -3, sm: -5, md: 0 }, px: { xs: 3, sm: 5, md: 0 } }} />
 */
function BenefitCardSection({ items = [], columns = 4, sx }) {
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: { md: `repeat(${columns}, 1fr)` },
        flexDirection: 'row',
        gap: '6px',
        mx: { xs: -4, sm: -6, md: 0 },
        px: { xs: 4, sm: 6, md: 0 },
        overflowX: { xs: 'auto', md: 'visible' },
        scrollSnapType: { xs: 'x mandatory', md: 'none' },
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        ...sx,
      }}
    >
      {items.map((item, idx) => (
        <Box
          key={item.id ?? idx}
          sx={{
            flexShrink: { xs: 0, md: 1 },
            width: { xs: '78%', sm: '55%', md: 'auto' },
            scrollSnapAlign: { xs: 'start', md: 'none' },
            display: 'flex',
          }}
        >
          <FadeTransition direction="up" delay={idx * 80} isTriggerOnView sx={{ height: '100%', width: '100%' }}>
            <BenefitCard
              icon={item.icon}
              tag={item.tag}
              title={item.title}
              description={item.description}
              frequency={item.frequency}
              partner={item.partner}
              sx={{ height: '100%' }}
            />
          </FadeTransition>
        </Box>
      ))}
      {/* 모바일 마지막 카드 우측 여백 */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, flexShrink: 0, width: { xs: 16, sm: 24 } }} />
    </Box>
  );
}

export { BenefitCardSection };
