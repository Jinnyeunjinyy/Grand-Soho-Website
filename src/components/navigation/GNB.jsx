import { useState, forwardRef, createContext, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

/**
 * GNB Context
 */
const GNBContext = createContext({
  isDrawerOpen: false,
  toggleDrawer: () => {},
  closeDrawer: () => {},
  isMobile: false,
});

export const useGNB = () => useContext(GNBContext);

/**
 * GNB 컴포넌트
 *
 * 반응형 GNB (Global Navigation Bar).
 * 데스크탑에서는 헤더에 네비게이션을 표시하고,
 * 모바일에서는 햄버거 메뉴 + 드로어로 전환된다.
 *
 * Props:
 * @param {node} logo - 로고 영역 (항상 표시) [Optional]
 * @param {node} navContent - 네비게이션 콘텐츠 (반응형 전환 대상) [Optional]
 * @param {node} persistent - 헤더에 항상 표시될 요소 [Optional]
 * @param {node} drawerHeader - 드로어 상단 커스텀 요소 [Optional]
 * @param {node} drawerFooter - 드로어 하단 커스텀 요소 [Optional]
 * @param {string} breakpoint - 반응형 전환 브레이크포인트 ('sm' | 'md' | 'lg') [Optional, 기본값: 'md']
 * @param {number} height - 헤더 높이 (px) [Optional, 기본값: 64]
 * @param {number} drawerWidth - 드로어 너비 (px) [Optional, 기본값: 280]
 * @param {boolean} hasBorder - 헤더 하단 보더 [Optional, 기본값: true]
 * @param {boolean} isSticky - 헤더 고정 [Optional, 기본값: true]
 * @param {boolean} isTransparent - 헤더 투명 배경 [Optional, 기본값: false]
 * @param {boolean} isFloating - 글라스모피즘 floating pill 스타일 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <GNB
 *   logo={<Logo />}
 *   navContent={<NavMenu items={menuItems} />}
 *   isFloating
 * />
 */
const GNB = forwardRef(function GNB({
  logo,
  navContent,
  persistent,
  drawerHeader,
  drawerFooter,
  breakpoint = 'md',
  height = 64,
  drawerWidth = 280,
  hasBorder = true,
  isSticky = true,
  isTransparent = false,
  isFloating = false,
  sx,
  ...props
}, ref) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoint));

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);

  /* ── 기본 헤더 스타일 (isFloating: false) ── */
  const headerStyles = {
    position: isFloating ? 'fixed' : (isSticky ? 'sticky' : 'relative'),
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: isFloating ? height + 20 : height,
    px: isFloating ? { xs: 2, sm: 3, md: 4 } : { xs: 2, sm: 3, md: 4 },
    backgroundColor: isFloating ? 'transparent' : (isTransparent ? 'transparent' : 'background.default'),
    borderBottom: isFloating ? 'none' : (hasBorder ? '1px solid' : 'none'),
    borderColor: 'divider',
    backdropFilter: isTransparent && !isFloating ? 'blur(12px)' : 'none',
    ...sx,
  };

  /* ── 드로어 콘텐츠 ── */
  const renderDrawerContent = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: drawerWidth }}>
      <Box
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height, px: 2, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0,
        }}
      >
        {drawerHeader || logo}
        <IconButton onClick={closeDrawer} size="small" aria-label="Close menu">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', py: 2, px: 2 }}>
        {navContent}
      </Box>

      {drawerFooter && (
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
          {drawerFooter}
        </Box>
      )}
    </Box>
  );

  /* ── 내비게이션 우측 영역 ── */
  const renderNavRight = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'nowrap', flexShrink: 0 }}>
      {persistent}
      {!isMobile && navContent}
      {isMobile && navContent && (
        <IconButton onClick={toggleDrawer} size="medium" aria-label="Open menu" aria-expanded={isDrawerOpen}>
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );

  return (
    <GNBContext.Provider value={{ isDrawerOpen, toggleDrawer, closeDrawer, isMobile }}>
      <Box ref={ref} component="header" sx={headerStyles} {...props}>

        {isFloating ? (
          /* ── Floating 글라스모피즘 pill ── */
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'nowrap',
              width: '100%',
              height,
              px: { xs: 2, md: 3 },
              backgroundColor: 'rgba(250,248,245,0.72)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '50px',
              border: '1px solid rgba(70,51,53,0.10)',
              boxShadow: '0 8px 32px rgba(44,31,32,0.08), 0 1px 0 rgba(255,255,255,0.6) inset',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>{logo}</Box>
            {renderNavRight()}
          </Box>
        ) : (
          /* ── 기본 전체 폭 헤더 ── */
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>{logo}</Box>
            {renderNavRight()}
          </>
        )}

      </Box>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
        sx={{ '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}
      >
        {renderDrawerContent()}
      </Drawer>
    </GNBContext.Provider>
  );
});

export { GNB };
