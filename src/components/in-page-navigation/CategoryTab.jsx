import Box from '@mui/material/Box';

/**
 * CategoryTab 컴포넌트
 *
 * 카테고리 필터링을 위한 탭 메뉴. button-brand 스타일.
 * - 모바일 (< md): 네이티브 select 드롭다운
 * - 데스크탑 (≥ md): pill 버튼 그룹 (선택 시 primary 색상 채움)
 *
 * Props:
 * @param {Array} categories - 카테고리 목록 [{ id, label, badge? }] [Required]
 * @param {string} selected - 현재 선택된 카테고리 ID [Required]
 * @param {function} onChange - 변경 핸들러 (id) => void [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CategoryTab categories={tabs} selected={activeTab} onChange={setActiveTab} />
 */
export function CategoryTab({ categories = [], selected, onChange, sx }) {
  return (
    <Box sx={{ ...sx }}>
      {/* 모바일: 네이티브 select */}
      <Box
        component="select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          display: { xs: 'block', md: 'none' },
          width: '100%',
          maxWidth: 320,
          px: 1.5,
          py: 1,
          fontSize: '0.875rem',
          fontFamily: 'inherit',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '8px',
          backgroundColor: 'background.paper',
          color: 'text.primary',
          cursor: 'pointer',
          outline: 'none',
          appearance: 'auto',
        }}
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.label}
          </option>
        ))}
      </Box>

      {/* 데스크탑: modern-neue 스타일 버튼 그룹 */}
      <Box
        component="nav"
        aria-label="category tabs"
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: '4px',
          backgroundColor: 'background.default',
          borderRadius: '10px',
          p: '4px',
          /* 외부 컨테이너 inset border */
          boxShadow: 'inset 0 0 0 1px rgba(44,31,32,0.10)',
          width: 'fit-content',
        }}
      >
        {categories.map((cat) => {
          const isSelected = cat.id === selected;
          return (
            <Box
              key={cat.id}
              component="button"
              onClick={() => onChange(cat.id)}
              aria-pressed={isSelected}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.75,
                py: 0.875,
                fontSize: '0.875rem',
                fontFamily: 'inherit',
                fontWeight: isSelected ? 600 : 500,
                color: isSelected ? 'text.primary' : 'text.secondary',
                /* 선택 시: inner floating square — 3D 레이어드 그림자 */
                backgroundColor: isSelected ? 'background.paper' : 'transparent',
                boxShadow: isSelected
                  ? [
                      '0px 1px 2px rgba(44,31,32,0.18)',
                      '0px 3px 3px rgba(44,31,32,0.15)',
                      '0px 6px 5px rgba(44,31,32,0.08)',
                      '0px 0px 0px 1px rgba(44,31,32,0.12)',
                      'inset 0px -2px 2px rgba(44,31,32,0.16)',
                    ].join(', ')
                  : 'none',
                borderRadius: '7px',
                border: 'none',
                cursor: 'pointer',
                transition: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms',
                whiteSpace: 'nowrap',
                '&:hover': isSelected
                  ? {}
                  : { backgroundColor: 'action.hover', color: 'text.primary' },
              }}
            >
              {cat.label}
              {cat.badge != null && (
                <Box
                  component="span"
                  sx={{
                    minWidth: 18,
                    height: 18,
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'primary.main' : 'action.selected',
                    color: isSelected ? 'primary.contrastText' : 'text.secondary',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 0.5,
                  }}
                >
                  {cat.badge}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
