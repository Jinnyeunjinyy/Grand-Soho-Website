/**
 * Grand Soho Theme
 *
 * Grand Soho 브랜드 디자인 토큰.
 * Visual Direction: docs/grand-soho/03-visual-direction.md
 *
 * ## 핵심 철학
 * - **Warm Brown**: 브라운 계열 Primary (#463335)
 * - **3-Tone Rhythm**: 딥다크 / 크림베이지 / 웜화이트 섹션 배경 교차
 * - **Editorial Typography**: Cormorant Garamond (h1·h2) + Pretendard (나머지)
 * - **Sharp Corners**: borderRadius 0
 */

import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

// ============================================================
// 1. Color Tokens (색상 토큰)
// ============================================================

/** 브랜드 브라운 원시값 — 투명도 계산에 재사용 */
const BROWN = {
  r: 44,
  g: 31,
  b: 32,
};
const brownAlpha = (a) => `rgba(${BROWN.r},${BROWN.g},${BROWN.b},${a})`;

/** 브랜드 Primary 원시값 (포화 브라운) */
const PRIMARY = { r: 70, g: 51, b: 53 };
const primaryAlpha = (a) => `rgba(${PRIMARY.r},${PRIMARY.g},${PRIMARY.b},${a})`;

const palette = {
  mode: 'light',

  // 브랜드 색상 — 딥 브라운레드 계열
  primary: {
    light: '#6B4E51',
    main: '#463335',
    dark: '#2C1F20',
    contrastText: '#FAF8F5',
  },

  // 다크 섹션 (Hero, Footer, Gallery 배경)
  secondary: {
    light: '#463335',
    main: '#2C1F20',
    dark: '#1A1213',
    contrastText: '#FAF8F5',
  },

  // Accent — 골든 탄
  accent: {
    main: '#C4956A',
    light: '#DDBFA0',
    dark: '#A87548',
    contrastText: '#FAF8F5',
  },

  // 상태 색상 (Feedback)
  error: {
    light: '#ef5350',
    main: '#d32f2f',
    dark: '#c62828',
    contrastText: '#FFFFFF',
  },
  warning: {
    light: '#ff9800',
    main: '#ed6c02',
    dark: '#e65100',
    contrastText: '#FFFFFF',
  },
  success: {
    light: '#4caf50',
    main: '#2e7d32',
    dark: '#1b5e20',
    contrastText: '#FFFFFF',
  },
  info: {
    light: '#03a9f4',
    main: '#0288d1',
    dark: '#01579b',
    contrastText: '#FFFFFF',
  },

  // 텍스트 색상 — 브라운 틴트
  text: {
    primary: brownAlpha(0.87),
    secondary: brownAlpha(0.55),
    disabled: brownAlpha(0.35),
    inverse: '#FAF8F5',
  },

  // 배경 색상
  background: {
    default: '#FAF8F5',   // 웜 화이트 — 페이지 기본 배경
    paper: '#FFFFFF',     // 카드·GNB·폼 배경
    subtle: '#EDE8DF',    // 크림 베이지 섹션 배경
    dark: '#2C1F20',      // 딥 다크 섹션 배경
  },

  // 구분선
  divider: primaryAlpha(0.12),

  // 액션 상태
  action: {
    active: brownAlpha(0.54),
    hover: primaryAlpha(0.04),
    selected: primaryAlpha(0.08),
    disabled: brownAlpha(0.26),
    disabledBackground: brownAlpha(0.12),
    focus: primaryAlpha(0.12),
  },

  // Grey 스케일
  grey: {
    50: grey[50],
    100: grey[100],
    200: grey[200],
    300: grey[300],
    400: grey[400],
    500: grey[500],
    600: grey[600],
    700: grey[700],
    800: grey[800],
    900: grey[900],
  },
};

// ============================================================
// 2. Typography Tokens (타이포그래피 토큰)
// ============================================================
const SERIF = '"Cormorant Garamond", Georgia, serif';
const SANS = '"NEXON Lv2 Gothic", "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif';

const typography = {
  // 기본 폰트 패밀리 (한글 본문)
  fontFamily: SANS,

  // 헤딩 폰트 패밀리 (영문 대제목 — Cormorant Garamond 우선)
  headingFontFamily: `${SERIF}, ${SANS}`,

  fontSize: 14,
  htmlFontSize: 16,

  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  // 헤딩 — 전체 NEXON Lv2 Gothic
  h1: {
    fontFamily: SANS,
    fontWeight: 700,
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontFamily: SANS,
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h3: {
    fontFamily: SANS,
    fontWeight: 800,
    fontSize: '1.75rem',
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontFamily: SANS,
    fontWeight: 700,
    fontSize: '1.5rem',
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h5: {
    fontFamily: SANS,
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: 1.4,
    letterSpacing: '0',
  },
  h6: {
    fontFamily: SANS,
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: 1.4,
    letterSpacing: '0',
  },

  // 본문
  body1: {
    fontSize: '1rem',
    lineHeight: 1.8,
    letterSpacing: '0',
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.7,
    letterSpacing: '0',
  },

  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },

  button: {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.75,
    letterSpacing: '0.02em',
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.5,
    letterSpacing: '0.02em',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 2,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
};

// ============================================================
// 3. Spacing Token (간격 토큰)
// ============================================================
const spacing = 8;

// ============================================================
// 4. Shape Token (모양 토큰)
// ============================================================
const shape = {
  borderRadius: 0,
};

// ============================================================
// 5. Shadow Tokens (그림자 토큰) — 브라운 틴트
// ============================================================
const customShadows = {
  none: 'none',
  sm: `0 0 12px ${brownAlpha(0.06)}`,
  md: `0 0 16px ${brownAlpha(0.08)}`,
  lg: `0 0 20px ${brownAlpha(0.10)}`,
  xl: `0 0 24px ${brownAlpha(0.12)}`,
};

// ============================================================
// 6. Breakpoints (브레이크포인트)
// ============================================================
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

// ============================================================
// 7. Z-Index (레이어 순서)
// ============================================================
const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

// ============================================================
// 8. Transitions (전환 효과)
// ============================================================
const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
};

// ============================================================
// 9. Component Overrides (컴포넌트 오버라이드)
// ============================================================
const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
        backgroundColor: palette.background.default,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '50px',
        textTransform: 'none',
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: '50%',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '50px',
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
        '&::before': { display: 'none' },
        '&::after': { display: 'none' },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      outlined: {
        borderRadius: '12px',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '16px',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        boxShadow: customShadows.lg,
        borderRadius: '16px',
      },
      elevation0: { boxShadow: customShadows.none },
      elevation1: { boxShadow: customShadows.sm },
      elevation2: { boxShadow: customShadows.md },
      elevation3: { boxShadow: customShadows.lg },
      elevation4: { boxShadow: customShadows.xl },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: '20px',
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
      },
    },
  },
  MuiSnackbar: {
    styleOverrides: {
      root: {
        '& .MuiSnackbarContent-root': {
          borderRadius: '50px',
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: '8px',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: '12px',
      },
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: {
        borderRadius: '12px',
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: '50px',
      },
      bar: {
        borderRadius: '50px',
      },
    },
  },
};

// ============================================================
// Theme 생성
// ============================================================
const defaultTheme = createTheme({
  palette,
  typography,
  spacing,
  shape,
  breakpoints,
  zIndex,
  transitions,
  components,
});

defaultTheme.customShadows = customShadows;

/**
 * Grand Soho 대시보드 스타일 설정
 */
defaultTheme.dashboard = {
  style: 'default',
  iconStyle: 'outlined',
  iconWeight: 400,
  cardBorderRadius: 0,
  cardColors: [
    'linear-gradient(to bottom, #FAF8F5 0%, #FAF8F5 100%)',
    'linear-gradient(to bottom, #FAF8F5 0%, #FAF8F5 100%)',
    'linear-gradient(to bottom, #FAF8F5 0%, #FAF8F5 100%)',
    'linear-gradient(to bottom, #FAF8F5 0%, #FAF8F5 100%)',
    'linear-gradient(to bottom, #FAF8F5 0%, #FAF8F5 100%)',
    'linear-gradient(to bottom, #FAF8F5 0%, #FAF8F5 100%)',
  ],
  subCardColors: [
    'linear-gradient(to bottom, #EDE8DF 0%, #EDE8DF 100%)',
    'linear-gradient(to bottom, #EDE8DF 0%, #EDE8DF 100%)',
    'linear-gradient(to bottom, #EDE8DF 0%, #EDE8DF 100%)',
    'linear-gradient(to bottom, #EDE8DF 0%, #EDE8DF 100%)',
    'linear-gradient(to bottom, #EDE8DF 0%, #EDE8DF 100%)',
    'linear-gradient(to bottom, #EDE8DF 0%, #EDE8DF 100%)',
  ],
  textColor: palette.text.primary,
  textSecondary: palette.text.secondary,
  textShadow: '0 0 0 rgba(0, 0, 0, 0)',
  backdropFilter: 'blur(0px)',
  WebkitBackdropFilter: 'blur(0px)',
  border: `1px solid ${primaryAlpha(0.12)}`,
  borderColor: primaryAlpha(0.12),
  shadow: customShadows.lg,
  subBorder: `1px solid ${brownAlpha(0.06)}`,
  subShadow: '0 0 0 rgba(0, 0, 0, 0)',
  subBackdropFilter: 'blur(0px)',
  subBorderRadius: 0,
  dividerColor: primaryAlpha(0.12),
  progressHeight: 6,
  progressTrackColor: primaryAlpha(0.08),
  progressBarColor: palette.primary.main,
  progressGradient: false,
  progressBorderRadius: 0,
  background: '#FAF8F5',
  atmosphere: 'linear-gradient(to bottom, #FAF8F5 0%, #EDE8DF 100%)',
  atmosphereOpacity: 0,
  accentColor: palette.accent.main,
  accentColors: {
    wind: '#4DB6AC',
    humidity: '#FFB74D',
    uvIndex: '#FF8A65',
    pressure: '#64B5F6',
  },
  blobs: null,
};

export default defaultTheme;

export {
  palette,
  typography,
  spacing,
  shape,
  customShadows,
  breakpoints,
  zIndex,
  transitions,
  components,
};
