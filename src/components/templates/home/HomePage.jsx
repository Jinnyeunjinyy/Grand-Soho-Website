import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import PartnerProgramSection from './PartnerProgramSection';
import GallerySection from './GallerySection';
import LocationSection from './LocationSection';

/**
 * HomePage 컴포넌트
 *
 * Grand Soho 홈 페이지.
 * Hero → Feature → PartnerProgram → Gallery → Location 섹션 순서로 구성.
 *
 * Props:
 * @param {Array} galleryImages - 갤러리 이미지 배열 [Optional, 기본값: []]
 *
 * Example usage:
 * <HomePage galleryImages={[{ src: '/img/space1.jpg', alt: '라운지' }]} />
 */
function HomePage({ galleryImages = [] }) {
  return (
    <main>
      <HeroSection />
      <FeatureSection />
      <PartnerProgramSection />
      <GallerySection images={galleryImages} />
      <LocationSection />
    </main>
  );
}

export default HomePage;
