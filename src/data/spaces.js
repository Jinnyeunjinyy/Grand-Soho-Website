/**
 * 공간 안내 페이지 - 공간 유형, 요금 카드, 탭 데이터
 */

export const spaceTypes = [
  { id: 'private', label: '오피스' },
  { id: 'meeting', label: '미팅룸' },
  { id: 'lounge', label: '라운지' },
  { id: 'special', label: '스페셜룸' },
];

const PRIVATE_FEATURES = [
  '전용 사무 공간',
  '고속 인터넷 (유·무선)',
  '공용 라운지 이용',
  '회의실 월 2시간 무료',
  '우편·택배 수령',
];

const MEETING_FEATURES_9 = [
  '최대 9인 수용',
  '75인치 TV',
  '초고속 WIFI',
  '에스프레소 머신 · 얼음 · 정수기',
  '시간 단위 예약 가능',
];

const MEETING_FEATURES_6 = [
  '최대 6인 수용',
  '55인치 전자칠판',
  '초고속 WIFI',
  '에스프레소 머신 · 정수기',
  '시간 단위 예약 가능',
];

export const spacePlans = [
  // ── 2~3인실 ──────────────────────────────
  {
    id: 'room-2-3-1y',
    type: 'private',
    name: '2~3인실',
    image: '/images/office-105-01.jpeg',
    capacity: '2~3인',
    contract: '1년 계약',
    priceLabel: '825,000원 / 월',
    priceNote: '',
    privilege: null,
    features: PRIVATE_FEATURES,
    isPopular: true,
  },
  {
    id: 'room-2-3-6m',
    type: 'private',
    name: '2~3인실',
    image: '/images/office-105-01.jpeg',
    capacity: '2~3인',
    contract: '6개월 계약',
    priceLabel: '893,700원 / 월',
    priceNote: '',
    privilege: null,
    features: PRIVATE_FEATURES,
    isPopular: false,
  },
  {
    id: 'room-2-3-3m',
    type: 'private',
    name: '2~3인실',
    image: '/images/office-105-01.jpeg',
    capacity: '2~3인',
    contract: '3개월 계약',
    priceLabel: '962,500원 / 월',
    priceNote: '',
    privilege: null,
    features: PRIVATE_FEATURES,
    isPopular: false,
  },

  // ── 4인실 ──────────────────────────────
  {
    id: 'room-4-1y',
    type: 'private',
    name: '4인실',
    image: '/images/office-101-01.jpeg',
    capacity: '4인',
    contract: '1년 계약',
    priceLabel: '1,320,000원 / 월',
    priceNote: '',
    privilege: null,
    features: [...PRIVATE_FEATURES, '전용 수납장'],
    isPopular: true,
  },
  {
    id: 'room-4-6m',
    type: 'private',
    name: '4인실',
    image: '/images/office-101-01.jpeg',
    capacity: '4인',
    contract: '6개월 계약',
    priceLabel: '1,430,000원 / 월',
    priceNote: '',
    privilege: null,
    features: [...PRIVATE_FEATURES, '전용 수납장'],
    isPopular: false,
  },
  {
    id: 'room-4-3m',
    type: 'private',
    name: '4인실',
    image: '/images/office-101-01.jpeg',
    capacity: '4인',
    contract: '3개월 계약',
    priceLabel: '1,540,000원 / 월',
    priceNote: '',
    privilege: null,
    features: [...PRIVATE_FEATURES, '전용 수납장'],
    isPopular: false,
  },

  // ── 미팅룸 ──────────────────────────────
  {
    id: 'meeting-1',
    type: 'meeting',
    name: '미팅룸 1',
    image: '/images/meeting-01-01.jpeg',
    capacity: '9인실',
    contract: '',
    priceLabel: '34,000원 / 시간',
    priceNote: '반일 · 종일 패키지 별도',
    privilege: 'SOHO',
    privilegeNote: '입주사 무료',
    features: MEETING_FEATURES_9,
    isPopular: false,
  },
  {
    id: 'meeting-2',
    type: 'meeting',
    name: '미팅룸 2',
    image: '/images/meeting-02.jpeg',
    capacity: '6인실',
    contract: '',
    priceLabel: '22,000원 / 시간',
    priceNote: '반일 · 종일 패키지 별도',
    privilege: 'SOHO',
    privilegeNote: '입주사 무료',
    features: MEETING_FEATURES_6,
    isPopular: false,
  },

  // ── 라운지 ──────────────────────────────
  {
    id: 'lounge',
    type: 'lounge',
    name: '라운지',
    image: '/images/lounge-01.jpeg',
    capacity: '최대 40인',
    contract: '',
    priceLabel: '66,000원 / 시간',
    priceNote: '테이블석 25인 + 스툴 15인',
    privilege: 'SOHO',
    privilegeNote: '입주사 -40%',
    features: [
      '최대 40인 수용',
      '85인치 스마트 TV · 마이크',
      '에스프레소 머신 · 정수기',
      '세미나 · 강연 · 파티 가능',
      '시간 단위 예약 가능',
    ],
    isPopular: false,
  },

  // ── 스페셜룸 ──────────────────────────────
  {
    id: 'ut-room',
    type: 'special',
    name: 'UT ROOM by user spoon',
    image: '/images/meeting-ut-01.jpeg',
    capacity: '최대 4인',
    contract: '',
    priceLabel: '55,000원 / 시간',
    priceNote: 'UX 리서치 전용 공간',
    privilege: 'SOHO',
    privilegeNote: '입주사 -40%',
    features: [
      '손동작 · 화면 · 표정 동시 촬영',
      '실시간 스트리밍 지원',
      '사용자 테스트 전용 장비',
      '브랜드 노출 없는 테스트 가능',
      '시간 단위 예약 가능',
    ],
    isPopular: false,
  },
  {
    id: 'gvc-ir-room',
    type: 'special',
    name: 'GVC IR ROOM',
    image: '/images/meeting-overview.jpeg',
    capacity: '피칭 전용',
    contract: '',
    priceLabel: '입주사 문의',
    priceNote: 'GVC 투자 심사 · 피칭 전용',
    privilege: 'GVC',
    privilegeNote: 'GVC Privilege',
    features: [
      'GVC 파트너 직접 피칭 가능',
      '투자 유치 준비 전용 공간',
      'IR 발표 환경 제공',
      '그랜드벤처스 포트폴리오사 우선',
    ],
    isPopular: false,
  },
];

export const spacesMeta = {
  reservationUrl: 'https://naver.me/FqZhjQ0i',
  ctaLabel: '네이버 예약하기 ↗',
  ctaNote: '네이버 예약으로 이동합니다',
  inquiryLabel: '입주 문의',
};
