/**
 * GNB (Global Navigation Bar) 메뉴 구조
 * isExternal: true → 새 탭으로 열림
 */
export const navItems = [
  { id: 'spaces', label: '공간 안내', path: '/spaces', isExternal: false },
  { id: 'notice', label: '공지사항', path: '/notice', isExternal: false },
  { id: 'contact', label: '문의', path: '/contact', isExternal: false },
];

export const navCta = {
  label: '예약하기',
  path: 'https://naver.me/FqZhjQ0i',
  isExternal: true,
};

export const siteMeta = {
  name: 'Grand Soho',
  logoText: 'Grand Soho',
  homePath: '/',
};
