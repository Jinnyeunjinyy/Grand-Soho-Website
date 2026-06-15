/**
 * 공간 안내 페이지 - 공간 유형, 요금 카드, 탭 데이터
 */

export const spaceTypes = [
  { id: 'private', label: '개인실' },
  { id: 'meeting', label: '회의실' },
  { id: 'lounge', label: '라운지' },
];

export const spacePlans = [
  {
    id: 'room-2-3',
    type: 'private',
    name: '2~3인실',
    capacity: '2~3인',
    priceLabel: '문의',
    priceNote: '월 단위 계약',
    features: [
      '전용 사무 공간',
      '고속 인터넷 (유·무선)',
      '공용 라운지 이용',
      '회의실 월 2시간 무료',
      '우편·택배 수령',
    ],
    isPopular: false,
  },
  {
    id: 'room-4',
    type: 'private',
    name: '4인실',
    capacity: '4인',
    priceLabel: '문의',
    priceNote: '월 단위 계약',
    features: [
      '전용 사무 공간',
      '고속 인터넷 (유·무선)',
      '공용 라운지 이용',
      '회의실 월 4시간 무료',
      '우편·택배 수령',
      '전용 수납장',
    ],
    isPopular: true,
  },
  {
    id: 'meeting-room',
    type: 'meeting',
    name: '미팅룸',
    capacity: '최대 8인',
    priceLabel: '시간당 문의',
    priceNote: '반일 · 종일 패키지 별도',
    features: [
      '모니터 · 화이트보드',
      '화상회의 장비',
      '음료 서비스',
      '시간 단위 예약 가능',
    ],
    isPopular: false,
  },
  {
    id: 'lounge',
    type: 'lounge',
    name: '라운지',
    capacity: '공용',
    priceLabel: '입주사 무료',
    priceNote: '비입주사 별도 문의',
    features: [
      '커피 · 음료 무료',
      '캐주얼 미팅 공간',
      '네트워킹 이벤트 공간',
    ],
    isPopular: false,
  },
];

export const spacesMeta = {
  ctaLabel: '예약하기 ↗',
  ctaNote: '네이버 예약으로 이동합니다',
  inquiryLabel: '입주 문의',
};
