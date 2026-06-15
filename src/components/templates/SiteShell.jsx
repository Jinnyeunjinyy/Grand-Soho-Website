import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
        color: 'text.primary',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}
      >
        {siteMeta.logoText}
      </Typography>
    </Box>
  );

  const navContent = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {/* Pill 형태 네비게이션 아이템 */}
      <Box component="nav" sx={{ display: 'flex', gap: 0.5 }}>
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
                px: 1.75,
                py: 0.75,
                fontSize: '0.8125rem',
                fontWeight: isActive ? 600 : 400,
                borderRadius: '50px',
                border: '1px solid',
                borderColor: isActive ? 'primary.main' : 'divider',
                backgroundColor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'primary.contrastText' : 'text.primary',
                textDecoration: 'none',
                transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: isActive ? 'primary.dark' : 'action.hover',
                },
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
    >
      {children}
    </AppShell>
  );
}

export default SiteShell;
