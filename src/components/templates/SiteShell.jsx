import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AppShell } from '../layout/AppShell';
import { navItems, navCta, siteMeta } from '../../data/navigation';

const NAV_MENU_ITEMS = navItems.map((item) => ({
  id: item.id,
  label: item.label,
  href: item.path,
}));

/**
 * SiteShell 컴포넌트
 *
 * Grand Soho 사이트 전체 레이아웃 쉘.
 * AppShell에 GNB(로고 + NavMenu + 예약 CTA)를 조합한 사이트 전용 래퍼.
 *
 * Props:
 * @param {node} children - 페이지 콘텐츠 [Required]
 *
 * Example usage:
 * <SiteShell><HomePage /></SiteShell>
 */
function SiteShell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const activeId = navItems.find((item) =>
    location.pathname === item.path ||
    (item.path !== '/' && location.pathname.startsWith(item.path))
  )?.id;

  const logo = (
    <Box
      component="a"
      href={siteMeta.homePath}
      onClick={(e) => { e.preventDefault(); navigate('/'); }}
      sx={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        component="img"
        src="/images/logo.svg"
        alt={siteMeta.logoText}
        sx={{ height: 28, width: 'auto', display: 'block' }}
      />
    </Box>
  );

  const navContent = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {/* 텍스트 버튼 네비게이션 아이템 */}
      <Box component="nav" sx={{ display: 'flex', gap: 0 }}>
        {NAV_MENU_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <Box
              key={item.id}
              component="a"
              href={item.href}
              onClick={(e) => { e.preventDefault(); navigate(item.href); }}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                px: 1.5,
                py: 0.75,
                fontSize: '0.8125rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'primary.main' : 'text.primary',
                textDecoration: 'none',
                transition: 'color 200ms',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {item.label}
            </Box>
          );
        })}
      </Box>
      <Button
        variant="contained"
        size="small"
        href={navCta.path}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ ml: 0.5, px: 2.5, py: 0.875, fontSize: '0.8125rem', flexShrink: 0 }}
      >
        {navCta.label} ↗
      </Button>
    </Box>
  );

  const drawerFooter = (
    <Button
      variant="contained"
      fullWidth
      href={navCta.path}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ py: 1.25 }}
    >
      {navCta.label} ↗
    </Button>
  );

  return (
    <AppShell
      logo={logo}
      headerCollapsible={navContent}
      drawerFooter={drawerFooter}
      breakpoint="md"
      headerHeight={64}
      isHeaderFloating
    >
      {children}
    </AppShell>
  );
}

export default SiteShell;
