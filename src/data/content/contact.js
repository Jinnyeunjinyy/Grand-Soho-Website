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
  phone: '0507-1372-1352',
  address: '서울 서초구 강남대로93길 9 1층',
  hours: {
    daily: '매일 09:00 ~ 22:00',
  },
};

export const locationInfo = {
  name: 'Grand Soho',
  address: '서울 서초구 강남대로93길 9 1층',
  addressDetail: '논현역 8번 출구에서 176m',
  directionsNote: "※ '미팅룸'은 건물 내부, '라운지'는 건물 외부에 있습니다.",
  lat: 37.5084,
  lng: 127.0299,
  transit: [
    { type: 'subway', line: '7호선', station: '논현역', walk: '8번 출구 도보 2분' },
    { type: 'subway', line: '3호선', station: '신사역', walk: '도보 5분' },
  ],
  parking: '인근 공영주차장 이용 (유료)',
};

/** EmailJS 설정 키 — 실제 값은 환경변수로 관리 */
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
};
