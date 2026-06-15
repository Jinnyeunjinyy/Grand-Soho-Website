# Grand Soho — Visual Direction

> 키워드: **클래식 · 우디 · 코지 · 미니멀**  
> 목표: 강남 도심 한복판의 따뜻하고 품격 있는 공간감을 웹에서 전달한다.

---

## 1. 톤앤매너

| 키워드 | 의미 | 웹 표현 |
|--------|------|---------|
| 클래식 | 시간이 지나도 촌스럽지 않은 | 절제된 레이아웃, 에디토리얼 타이포, 세리프 헤딩 |
| 우디 | 나무·가죽·자연 소재의 온기 | 브라운 팔레트, 크림 베이지 배경 |
| 코지 | 머물고 싶은 포근함 | 넉넉한 여백, 3톤 배경 리듬 |
| 미니멀 | 불필요한 것은 없다 | 텍스트 절제, 단색 패널, 모노톤 아이콘 |

**레퍼런스 감도**: 고급 부티크 호텔 웹사이트, 아트북 출판사, 독립 라이프스타일 브랜드 — 과하지 않은 감성.  
**피해야 할 감도**: 화려한 그라데이션, 네온 강조색, 과도한 애니메이션, 스타트업 SaaS 느낌.

---

## 2. 컬러 팔레트

> 키 컬러 브라운 계열은 아래 디렉션을 고정값으로 유지한다.

### 브랜드 컬러

| 역할 | 이름 | HEX | 현재값 | 사용처 |
|------|------|-----|--------|--------|
| **Primary** | 딥 브라운레드 | `#463335` | `#0000FF` | CTA 버튼, 강조 텍스트, 아이콘 |
| **Primary Light** | 미디엄 브라운 | `#6B4E51` | `#6666FF` | Hover 상태, 부제목 강조 |
| **Primary Dark** | 다크 브라운 | `#2C1F20` | `#0000B2` | Footer 배경, 다크 카드 |
| **Primary Contrast** | 크림 화이트 | `#FAF8F5` | `#FFFFFF` | Primary 배경 위 텍스트 |

### 서포트 컬러

| 역할 | 이름 | HEX | 사용처 |
|------|------|-----|--------|
| **Accent** | 골든 탄 | `#C4956A` | 포인트 강조, 배지, 섹션 번호 레이블 |
| **Accent Light** | 샌드 | `#DDBFA0` | Accent hover, 구분선 |
| **Subtle BG** | 크림 베이지 | `#EDE8DF` | Feature·PartnerProgram·Location 섹션 배경 |
| **Surface** | 웜 화이트 | `#FAF8F5` | 페이지 기본 배경 (`background.default`) |
| **Paper** | 오프화이트 | `#FFFFFF` | 카드, GNB, 폼 배경 (`background.paper`) |

### 텍스트 컬러

| 역할 | HEX | 현재값 | 사용처 |
|------|-----|--------|--------|
| **text.primary** | `rgba(44,31,32,0.87)` | `rgba(0,0,0,0.87)` | 본문 주요 텍스트 |
| **text.secondary** | `rgba(44,31,32,0.55)` | `rgba(0,0,0,0.60)` | 보조 텍스트, 캡션 |
| **text.disabled** | `rgba(44,31,32,0.35)` | `rgba(0,0,0,0.38)` | 비활성 상태 |
| **text.inverse** | `#FAF8F5` | — | 다크 배경(Hero, Footer) 위 텍스트 |

### Secondary (다크 섹션)

| 역할 | HEX | 현재값 | 사용처 |
|------|-----|--------|--------|
| **secondary.main** | `#2C1F20` | `#263238` | Hero 배경, Footer 배경 |
| **secondary.light** | `#463335` | blueGrey[700] | 다크 섹션 내 강조 |
| **secondary.dark** | `#1A1213` | `#1a252b` | 가장 어두운 배경 |

### Divider & State

| 역할 | HEX | 현재값 |
|------|-----|--------|
| **divider** | `rgba(70,51,53,0.12)` | `rgba(0,0,0,0.12)` |
| **action.hover** | `rgba(70,51,53,0.04)` | `rgba(0,0,0,0.04)` |
| **action.selected** | `rgba(70,51,53,0.08)` | `rgba(0,0,0,0.08)` |

---

## 3. 타이포그래피 방향

### 폰트 패밀리

| 역할 | 폰트 | 현재 | 변경 방향 |
|------|------|------|----------|
| **Heading (영문)** | Cormorant Garamond | Outfit | 세리프체로 교체 — 클래식·에디토리얼 감도 |
| **Heading (한글)** | Pretendard 800~900 | Pretendard | 유지 |
| **Body** | Pretendard | Pretendard | 유지 |

> **Cormorant Garamond** (Google Fonts): 이탤릭체와 다양한 굵기가 풍부한 세리프 계열. 고급 매거진·호텔 브랜딩에서 자주 쓰임.  
> 한글 제목에는 Pretendard 900을 유지하되, 영문이 포함된 Hero 헤드라인에는 Cormorant로 전환.

### 타이포 스케일

| 요소 | 현재 설정 | 변경 방향 | 근거 |
|------|----------|----------|------|
| `h1` | Outfit 900 / 2.5rem / ls -0.02em | Cormorant Garamond 700 italic / `clamp(2.5rem, 5vw, 4rem)` / ls -0.01em | Hero에서 레이아웃을 지배하는 대형 헤딩 |
| `h2` | Outfit 900 / 2rem | Cormorant Garamond 700 / 2.5rem | 페이지 제목 |
| `h3` | Outfit 800 / 1.75rem | Pretendard 800 / 1.75rem | 섹션 타이틀 — 한글 중심이므로 유지 |
| `h4`~`h6` | Outfit 700 | Pretendard 700 | 유지 |
| `body1` | 1rem / lh 1.6 | 1rem / lh 1.8 | 행간 넉넉히 — 코지 느낌 |
| `overline` | 0.75rem / ls 0.08em | 0.75rem / ls 0.14em | 섹션 라벨 여백 강조 |
| `button` | textTransform none | 유지 | — |

---

## 4. 간격 및 레이아웃

| 항목 | 방향 | 근거 |
|------|------|------|
| **spacing 기본 단위** | 8px 유지 | — |
| **섹션 수직 여백** | `py: { xs: 10, md: 16 }` (현재 8/12) | 코지·브리딩 룸 확보 |
| **Hero 최소 높이** | `min-height: 92vh` (현재 80~90vh) | 공간감 강조 |
| **콘텐츠 수평 패딩** | `px: { xs: 3, sm: 5, md: 10, lg: 16 }` | lg 이상 더 여유롭게 |
| **max-width** | `xl` (1536px) 유지 | — |
| **borderRadius** | `0` 유지 | Sharp corners — 클래식·절제 |
| **카드 보더** | `1px solid divider` (warm tone) | 두꺼운 선 지양 |

---

## 5. 섹션별 배경 컬러 리듬

레퍼런스 이미지의 **3톤 대비(흰·웜베이지·딥다크)** 패턴을 Grand Soho 섹션 흐름에 적용한다.

| 섹션 | 배경 | 레퍼런스 대응 |
|------|------|--------------|
| Hero | `#2C1F20` 딥 다크 | 레퍼런스 우측 컬러 패널 — 강렬한 첫인상 |
| Feature | `#EDE8DF` 크림 베이지 | 레퍼런스 좌측 밝은 배경 — 따뜻한 전환 |
| Partner Program | `#FAF8F5` 웜 화이트 | 정보 가독성 우선 |
| Gallery | `#2C1F20` 딥 다크 | 사진이 돋보이는 단색 배경 (레퍼런스 우측 패널) |
| Location | `#EDE8DF` 크림 베이지 | 부드러운 마무리 |
| Footer (추후) | `#1A1213` 딥 다크 | 완전한 클로징 |

---

## 6. 레이아웃 패턴 (레퍼런스 적용)

레퍼런스 이미지(`reference/UI reference.png`)에서 추출한 레이아웃 패턴을 Grand Soho에 적용한다.

### 6-1. Hero — 비대칭 좌우 분할

레퍼런스의 **텍스트 좌(60%) + 컬러 패널 우(40%)** 구조를 Hero에 적용.

```
[ 텍스트 영역 · #FAF8F5 ]  [ 공간 사진 패널 · #2C1F20 ]
  "공간도 전략입니다."         공간 대표 이미지
  서브카피
  [입주 문의] [예약하기 ↗]
```

- 현재 Hero: 전체 다크 배경 + 텍스트만
- **변경**: 좌측은 웜화이트(#FAF8F5), 우측은 딥다크(#2C1F20) + 공간 사진
- 모바일: 세로 스택 (이미지 상단, 텍스트 하단)

### 6-2. GNB — Pill 형태 메뉴 아이템

레퍼런스의 **각 메뉴 항목을 캡슐형 버튼**으로 처리하는 패턴 적용.

- 현재 GNB: NavMenu default variant (배경색 없음)
- **변경**: 각 nav 아이템에 `border: 1px solid divider` + 캡슐형 padding — hover 시 filled
- Active 아이템: `background: #463335`, `color: #FAF8F5`
- CTA "예약하기 ↗": `variant="contained"` 유지

### 6-3. CTA 버튼 — Outlined + 화살표 아이콘

레퍼런스의 `GO TO CATALOG →↗` 패턴을 2차 CTA에 적용.

- 1차 CTA (입주 문의): `variant="contained"` — `#463335` filled
- 2차 CTA (예약하기 ↗, 공간 안내): `variant="outlined"` + `↗` 아이콘

### 6-4. Floating Card — 섹션 경계 오버랩

레퍼런스의 **플로팅 카드가 두 영역 경계를 걸치는** 패턴을 Partner Program에 적용.

```
[ Feature 섹션 · 크림베이지 ]
                    ┌──────────────────────┐
                    │ Partner Program 배지  │ ← 섹션 상단에 걸쳐 오버랩
                    │ 타이틀               │
[ Partner Program · 웜화이트 ]
```

- 섹션 타이틀 블록을 `margin-top: -48px` 으로 끌어올려 이전 섹션과 오버랩
- 또는 Accent(`#C4956A`) 배지를 섹션 바깥으로 protrude

### 6-5. 공간 사진 — 단색 배경 위 배치

레퍼런스처럼 **사진 뒤에 텍스처 없는 단색 배경**을 깔아 공간 자체에 집중.

- Gallery 섹션: `#2C1F20` 다크 배경 + 사진 그리드
- Hero 우측 패널: `#2C1F20` + 공간 대표 사진 (object-fit: cover)

---

## 7. 레퍼런스

| # | 파일 | 참고 포인트 |
|---|------|------------|
| 1 | `reference/UI reference.png` | 비대칭 좌우 분할 레이아웃, Pill GNB, Floating Card, 단색 배경 패널, CTA 화살표 버튼 |

---

## 8. 변경 필요 토큰 요약

`src/styles/themes/default.js` 기준으로 수정이 필요한 토큰 목록.

| 토큰 경로 | 현재값 | 변경값 | 적용 대상 |
|-----------|--------|--------|----------|
| `palette.primary.main` | `#0000FF` | `#463335` | CTA 버튼, 강조 |
| `palette.primary.light` | `#6666FF` | `#6B4E51` | Hover |
| `palette.primary.dark` | `#0000B2` | `#2C1F20` | Active/Pressed |
| `palette.primary.contrastText` | `#FFFFFF` | `#FAF8F5` | Primary 배경 위 텍스트 |
| `palette.secondary.main` | `#263238` | `#2C1F20` | Hero·Footer 배경 |
| `palette.secondary.light` | blueGrey[700] | `#463335` | 다크 섹션 강조 |
| `palette.secondary.dark` | `#1a252b` | `#1A1213` | 가장 어두운 배경 |
| `palette.background.default` | `#FFFFFF` | `#FAF8F5` | 페이지 기본 배경 |
| `palette.text.primary` | `rgba(0,0,0,0.87)` | `rgba(44,31,32,0.87)` | 본문 텍스트 |
| `palette.text.secondary` | `rgba(0,0,0,0.60)` | `rgba(44,31,32,0.55)` | 보조 텍스트 |
| `palette.text.disabled` | `rgba(0,0,0,0.38)` | `rgba(44,31,32,0.35)` | 비활성 |
| `palette.divider` | `rgba(0,0,0,0.12)` | `rgba(70,51,53,0.12)` | 구분선 |
| `typography.headingFontFamily` | `"Outfit", ...` | `"Cormorant Garamond", "Outfit", ...` | h1·h2 헤딩 |
| `typography.h1.fontSize` | `2.5rem` | `clamp(2.5rem, 5vw, 4rem)` | Hero 헤드라인 반응형 |
| `typography.h1.fontStyle` | — | `italic` | 클래식 감도 |
| `typography.body1.lineHeight` | `1.6` | `1.8` | 코지 느낌 행간 |
| `typography.overline.letterSpacing` | `0.08em` | `0.14em` | 섹션 라벨 여백 |
| *(신규)* `palette.accent.main` | — | `#C4956A` | 포인트 강조 (커스텀 토큰) |
| *(신규)* `palette.accent.light` | — | `#DDBFA0` | Accent hover |
| *(신규)* `palette.subtleBg` | — | `#EDE8DF` | 크림 베이지 섹션 배경 |
