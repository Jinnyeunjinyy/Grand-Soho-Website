/**
 * 공간 안내 페이지 - 공간 유형, 요금 카드, 탭 데이터
 */

export const spaceTypes = [
  { id: 'private', label: '오피스' },
  { id: 'meeting', label: '미팅룸' },
  { id: 'lounge', label: '라운지' },
];

const PRIVATE_FEATURES = [
  '전용 사무 공간',
  '고속 인터넷 (유·무선)',
  '공용 라운지 이용',
  '회의실 월 2시간 무료',
  '우편·택배 수령',
];

const MEETING_FEATURES_8 = [
  '최대 9인 수용',
  '모니터 · 화이트보드',
  '화상회의 장비',
  '음료 서비스',
  '시간 단위 예약 가능',
];

const MEETING_FEATURES_6 = [
  '최대 6인 수용',
  '모니터 · 화이트보드',
  '음료 서비스',
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
    features: [...PRIVATE_FEATURES, '전용 수납장'],
    isPopular: false,
  },

  // ── 미팅룸 ──────────────────────────────
  {
    id: 'meeting-1',
    type: 'meeting',
    name: '미팅룸 1',
    image: '/images/meeting-ut-01.jpeg',
    capacity: '9인실',
    contract: '',
    priceLabel: '34,000원 / 시간',
    priceNote: '반일 · 종일 패키지 별도',
    features: MEETING_FEATURES_8,
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
    features: MEETING_FEATURES_6,
    isPopular: false,
  },

  // ── 라운지 ──────────────────────────────
  {
    id: 'lounge',
    type: 'lounge',
    name: '라운지',
    image: '/images/lounge-01.jpeg',
    capacity: '최대 40명',
    contract: '',
    priceLabel: '66,000원 / 시간',
    priceNote: '입주사 무료',
    features: [
      '최대 40인 수용',
      '커피 · 음료 무료',
      '캐주얼 미팅 공간',
      '네트워킹 이벤트 공간',
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
