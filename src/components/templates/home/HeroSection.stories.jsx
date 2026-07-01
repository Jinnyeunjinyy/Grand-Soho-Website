import HeroSection from './HeroSection';

export default {
  title: 'Section/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    copy: { control: 'object', description: '히어로 카피 데이터 (headline/subheadline/cta)' },
    imageSrc: { control: 'text', description: '배경 이미지 경로' },
    imageAlt: { control: 'text', description: '이미지 alt 텍스트' },
    is3DEnabled: { control: 'boolean', description: '3D 오버레이 활성화 여부' },
    isAssemblyOnly: { control: 'boolean', description: 'LogoPhysics 대신 LogoAssembly3D(glass) 전체 화면 오버레이 사용 여부' },
  },
};

export const Default = {
  args: {
    imageSrc: '/images/exterior.jpeg',
    is3DEnabled: true,
    isAssemblyOnly: false,
  },
};

/** 사진풍 히어로 이미지 — image + LogoAssembly3D(glass) 조합 */
export const PhotographicGlassAssembly = {
  args: {
    imageSrc: '/images/Hero_edit.png',
    is3DEnabled: true,
    isAssemblyOnly: true,
  },
};

/** 일러스트풍 히어로 이미지 — image + LogoPhysics 조합 */
export const IllustrativeLogoPhysics = {
  args: {
    imageSrc: '/images/SOHO Hero_.png',
    is3DEnabled: true,
    isAssemblyOnly: false,
  },
};
