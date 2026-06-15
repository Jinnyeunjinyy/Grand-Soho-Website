/**
 * 문의 페이지 - 폼 옵션, 연락처, 위치 정보
 */

export const inquiryTypes = [
  { value: 'residence', label: '입주 상담' },
  { value: 'meeting-room', label: '회의실 예약' },
  { value: 'other', label: '기타 문의' },
];

export const contactInfo = {
  email: 'contact@grandsoho.com',
  operatorEmail: 'ehong@gvc.im',
  address: '서울특별시 강남구',
  addressDetail: '상세 주소는 입주 상담 후 안내드립니다.',
  hours: {
    weekday: '평일 08:00 ~ 22:00',
    weekend: '주말 10:00 ~ 18:00',
  },
};

export const locationInfo = {
  name: 'Grand Soho',
  address: '서울특별시 강남구',
  lat: 37.4979,
  lng: 127.0276,
  transit: [
    { type: 'subway', line: '2호선', station: '강남역', walk: '도보 5분' },
    { type: 'subway', line: '신분당선', station: '강남역', walk: '도보 5분' },
  ],
  parking: '인근 공영주차장 이용 (유료)',
};

/** EmailJS 설정 키 — 실제 값은 환경변수로 관리 */
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
};
