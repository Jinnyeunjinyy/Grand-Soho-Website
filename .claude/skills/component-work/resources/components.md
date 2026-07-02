# Components

Vibe Dictionary 텍소노미 v0.4 기반 분류. 번호는 텍소노미 카테고리 번호.

## 참조 문서

- 전체 텍소노미: `.claude/skills/component-work/resources/taxonomy-v0.4.md`
- 빠른 인덱스: `.claude/skills/component-work/resources/taxonomy-index.md`

새 컴포넌트 생성 시 위 문서에서 해당 카테고리 번호와 컴포넌트 원형을 확인한 후 구현할 것.

---

## 1. Typography — 텍스트 표현과 장식

- FitText: 컨테이너에 맞춤 텍스트 (`components/typography/FitText.jsx`)
- HighlightedTypography: 하이라이트 타이포그래피 (`components/typography/HighlightedTypography.jsx`)
- InlineTypography: 인라인 타이포그래피 (`components/typography/InlineTypography.jsx`)
- StretchedHeadline: 스트레치 헤드라인 (`components/typography/StretchedHeadline.jsx`)
- StyledParagraph: 스타일드 문단 (`components/typography/StyledParagraph.jsx`)
- Title: 타이틀 컴포넌트 (`components/typography/Title.jsx`)
- QuotedContainer: 인용 컨테이너 (`components/typography/QuotedContainer.jsx`)

## 2. Container — 시각적 경계와 그룹핑

- SectionContainer: 페이지 섹션 컨테이너. MUI Container 기반 (`components/container/SectionContainer.jsx`)
- CarouselContainer: 캐로셀 컨테이너 (`components/container/CarouselContainer.jsx`)
- RatioContainer: 비율 기반 컨테이너 (`components/container/RatioContainer.jsx`)

## 3. Card — 독립적 정보 단위

- CardContainer: 카드 기본 컨테이너. variant, padding, elevation (`components/card/CardContainer.jsx`)
- CustomCard: 미디어+콘텐츠 카드. vertical/horizontal/overlay 레이아웃 (`components/card/CustomCard.jsx`)
- ImageCard: 이미지 카드 (`components/card/ImageCard.jsx`)
- MoodboardCard: 무드보드 컬렉션 카드. 2x2 썸네일 그리드 (`components/card/MoodboardCard.jsx`)
- Card: MUI Card 컴포넌트 [MUI]

## 4. Media — 이미지, 비디오 표시

- AspectMedia: 비율 기반 미디어 컨테이너 (`components/media/AspectMedia.jsx`)
- ImageCarousel: 이미지 캐로셀 (`components/media/ImageCarousel.jsx`)
- ImageTransition: 이미지 트랜지션 효과 (`components/media/ImageTransition.jsx`)
- CarouselIndicator: 캐로셀 인디케이터 (`components/media/CarouselIndicator.jsx`)
- KakaoMap: 카카오맵 JS SDK 임베드. 마커 + 라벨 오버레이, VITE_KAKAO_MAP_KEY 미설정/로드 실패 시 placeholder 폴백 (`components/media/KakaoMap.jsx`)

## 5. Data Display — 구조화된 데이터 시각화

- Table: MUI Table 컴포넌트 [MUI]

## 6. In-page Navigation — 페이지 내 탐색

- CategoryTab: 카테고리 탭 (`components/in-page-navigation/CategoryTab.jsx`)
- Tabs: MUI Tabs 컴포넌트 [MUI]

## 7. Input & Control — 사용자 입력

- FileDropzone: 파일 드래그&드롭 영역 (`components/input/FileDropzone.jsx`)
- SearchBar: 검색 입력 바 (`components/input/SearchBar.jsx`)
- TagInput: 태그 입력 필드 (`components/input/TagInput.jsx`)
- Button: MUI Button 컴포넌트 [MUI]
- Checkbox: MUI Checkbox 컴포넌트 [MUI]
- Select: MUI Select 컴포넌트 [MUI]
- Switch: MUI Switch 컴포넌트 [MUI]
- TextField: MUI TextField 컴포넌트 [MUI]

## 8. Layout — 공간 배치와 구조

- PhiSplit: 황금비 분할 레이아웃 (`components/layout/PhiSplit.jsx`)
- SplitScreen: 좌우 분할 레이아웃. ratio, stackAt, stackOrder 지원 (`components/layout/SplitScreen.jsx`)
- BentoGrid: 벤토 그리드 레이아웃 (`components/layout/BentoGrid.jsx`)
- LineGrid: 그리드 아이템 사이 1px 라인 자동 삽입 (`components/layout/LineGrid.jsx`)
- FullPageContainer: 전체 페이지 컨테이너 (`components/layout/FullPageContainer.jsx`)
- PageContainer: 반응형 페이지 컨테이너. PC maxWidth 고정, 모바일 100% (`components/layout/PageContainer.jsx`)
- AppShell: 반응형 앱 셸. GNB + 메인 콘텐츠 영역 (`components/layout/AppShell.jsx`)
- StickyAsideCenterLayout: 대칭 3열 그리드. sticky aside + 페이지 정중앙 콘텐츠 + 빈 대칭 칼럼 (`components/layout/StickyAsideCenterLayout.jsx`)
- Grid: MUI Grid 컴포넌트 [MUI]
- Masonry: MUI Masonry 컴포넌트 [MUI]

## 9. Overlay & Feedback — 맥락적 정보 표시

- Dialog: MUI Dialog 컴포넌트 [MUI]

## 10. Navigation (Global) — 페이지 간 이동

- GNB: 반응형 글로벌 네비게이션 바. 데스크탑 메뉴 / 모바일 Drawer (`components/navigation/GNB.jsx`)
- NavMenu: 네비게이션 메뉴 (`components/navigation/NavMenu.jsx`)
- SlidingHighlightMenu: 슬라이딩 하이라이트 메뉴. hover 시 layoutId 기반 인디케이터 이동, background/underline, horizontal/vertical (`components/navigation/SlidingHighlightMenu.jsx`)

## 11. KineticTypography (Interactive) — 텍스트 애니메이션 효과

- RandomRevealText: 랜덤 순서 blur 리빌 타이포그래피. Fisher-Yates 셔플 기반 (`components/kinetic-typography/RandomRevealText.jsx`)
- ScrambleText: 텍스트 스크램블 전환 효과. requestAnimationFrame 기반 (`components/kinetic-typography/ScrambleText.jsx`)
- ScrollRevealText: 스크롤 진행에 따른 텍스트 순차 리빌 (`components/kinetic-typography/ScrollRevealText.jsx`)

## 13. ContentTransition (Interactive) — 섹션 간 전환

- HorizontalScrollContainer: 세로 스크롤→가로 이동 변환 컨테이너. 픽셀 기반 DOM 측정, Framer Motion (`components/content-transition/HorizontalScrollContainer.jsx`)

## 12. Scroll (Interactive) — 스크롤 기반 효과

- VideoScrubbing: 스크롤 기반 비디오 스크러빙 (`components/scroll/VideoScrubbing.jsx`)
- ScrollScaleContainer: 뷰포트 노출 비율 연동 스케일 컨테이너. Framer Motion useScroll + useTransform (`components/scroll/ScrollScaleContainer.jsx`)

## 14. Motion (Interactive) — 스토리텔링 모션

- LogoAssembly: SOHO 로고 10개 조각이 위에서 spring 물리로 낙하해 쌓이는 2D SVG 애니메이션. fillPrimary/fillSecondary/fallDistance 조절 가능 (`components/motion/LogoAssembly.jsx`)
- LogoAssembly3D: SOHO 로고 10개 조각이 3D 메시(torus/cylinder/box)로 항상 같은 로고 배치로 수렴하는 R3F 씬. useFrame 스프링, ContactShadows, 매 실행 동일한 결과. isTransparent로 투명 배경 오버레이 모드 지원. 투명 모드 전용 옵션(isTransparent=false일 땐 모두 무시): heroScale(기본값 1, 로고 크기 추가 배율), heroAlign('right'|'center', 기본값 'right' — 우측 여백 오프셋/화면 중앙 고정), showFloor(기본값 true, ContactShadows 바닥 그림자 표시 여부) (`components/motion/LogoAssembly3D.jsx`)
- LogoPhysics: SOHO 로고 조각 10개가 R3F + Rapier 3D 물리 시뮬레이션으로 떨어져 쌓이는 씬. 매 실행마다 다르게 쌓임 (`components/motion/LogoPhysics.jsx`)
- FadeTransition: 기본 opacity 전환 애니메이션. 등장/퇴장 페이드 + 방향 슬라이드, IntersectionObserver 자동 트리거 (`components/motion/FadeTransition.jsx`)
- PerspectiveTransition: 3D 원근 회전 전환. 뒤로 누워있다가 세워지는 효과, CSS perspective + rotateX, IntersectionObserver 자동 트리거 (`components/motion/PerspectiveTransition.jsx`)
- MarqueeContainer: 무한 루프 수평 흐름 컨테이너. CSS keyframes 기반 (`components/motion/MarqueeContainer.jsx`)

## 15. DynamicColor (Interactive) — 동적 색상 변화

- GradientOverlay: Three.js WebGL 스크롤 반응형 그라데이션 배경. Simplex Noise + 필름 그레인 (`components/dynamic-color/GradientOverlay.jsx`)
- GradientOverlayDynamic: Next.js 동적 import 래퍼 (ssr: false). 페이지에서 사용 시 이것을 import (`components/dynamic-color/GradientOverlayDynamic.jsx`)

---

## Common (유틸리티)

- Indicator: 범용 인디케이터 (`common/ui/Indicator.jsx`)
- Placeholder: 스토리 예제용 FPO 플레이스홀더 시스템. Box/Image/Media/Text/Line/Paragraph/Card 서브컴포넌트 (`common/ui/Placeholder.jsx`)
- FilterBar: 필터 바 (`components/templates/FilterBar.jsx`)
- HeroSection: Grand Soho 홈 히어로 섹션. 배경 이미지 + 3D 투명 오버레이 + framer-motion 텍스트 입장 애니메이션. is3DEnabled로 3D 토글, isAssemblyOnly로 LogoPhysics 대신 LogoAssembly3D(glass) 전체 화면 오버레이 사용. 모바일(md 미만, useMediaQuery)에서는 섹션이 더 길어지고(minHeight 112vh) 텍스트가 상단 정렬, LogoAssembly3D는 하단 52% 밴드에 heroScale=0.6 축소 + heroAlign="center" 가운데 정렬 + showFloor=false로 바닥 그림자 숨김 처리됨(씬 내부 스케일 — CSS transform은 R3F 캔버스 리사이즈 측정과 충돌해 사용 안 함). 데스크탑(md 이상)은 기존 우측 여백 배치 + 바닥 그림자 + 풀 오버레이 유지 (`components/templates/home/HeroSection.jsx`)
- FeatureSection: 공간 특징 4대 카드 섹션. 아이콘 + 제목 + 설명 그리드 (`components/templates/home/FeatureSection.jsx`)
- PartnerProgramSection: VC 파트너 프로그램 4대 혜택 카드 섹션. 배지 + 그리드 레이아웃 (`components/templates/home/PartnerProgramSection.jsx`)
- GallerySection: 공간 사진 갤러리 + Lightbox. images prop으로 이미지 배열 수신 (`components/templates/home/GallerySection.jsx`)
- LocationSection: 위치·교통·운영시간 안내 섹션. 지도 영역 + 정보 패널 (`components/templates/home/LocationSection.jsx`)
- HomePage: 홈 페이지 조합 컴포넌트. Hero → Feature → PartnerProgram → Gallery → Location (`components/templates/home/HomePage.jsx`)
- SpacesPage: /spaces 공간 안내 페이지. CategoryTab 필터 + 요금 카드 그리드 + 예약 CTA (`components/templates/spaces/SpacesPage.jsx`)
- ContactPage: /contact 문의 페이지. 이름·연락처·유형·내용 폼 + EmailJS 제출 + 인라인 피드백 (`components/templates/contact/ContactPage.jsx`)
- NoticePage: /notice 공지사항 목록 페이지. 카테고리 탭 + 고정공지 우선 목록 (`components/templates/notice/NoticePage.jsx`)
- NoticeDetailPage: /notice/:id 공지사항 상세 페이지. 본문 + 이전/다음 글 이동 (`components/templates/notice/NoticeDetailPage.jsx`)
