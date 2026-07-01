import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import PartnerProgramSection from './PartnerProgramSection';
import GallerySection from './GallerySection';
import LocationSection from './LocationSection';

const HERO_IMAGE = '/images/Hero_edit.png';

const GALLERY_IMAGES = [
  { src: '/images/lounge-01.jpeg',       alt: '라운지 공간' },
  { src: '/images/lounge-08.jpeg',        alt: '라운지 공간' },
  { src: '/images/meeting-ut-01.jpeg',   alt: '미팅룸' },
  { src: '/images/lounge-02.jpeg',       alt: '커뮤니티 라운지' },
];

/**
 * HomePage 컴포넌트
 *
 * Grand Soho 홈 페이지.
 * Hero → Feature → PartnerProgram → Gallery → Location 섹션 순서로 구성.
 *
 * Props:
 * @param {string} heroImage - Hero 우측 패널 이미지 경로 [Optional]
 * @param {Array} galleryImages - 갤러리 이미지 배열 [Optional]
 *
 * Example usage:
 * <HomePage />
 */
function HomePage({ heroImage = HERO_IMAGE, galleryImages = GALLERY_IMAGES }) {
  return (
    <main>
      <HeroSection imageSrc={heroImage} isAssemblyOnly sx={{ mt: '-84px' }} />
      <PartnerProgramSection />
      <GallerySection images={galleryImages} />
      <FeatureSection />
      <LocationSection />
    </main>
  );
}

export default HomePage;
