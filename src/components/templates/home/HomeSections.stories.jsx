import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import PartnerProgramSection from './PartnerProgramSection';
import GallerySection from './GallerySection';
import LocationSection from './LocationSection';

export default {
  title: 'Section/Home',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Hero = {
  name: 'Hero',
  render: () => <HeroSection />,
};

export const Feature = {
  name: 'Feature',
  render: () => <FeatureSection />,
};

export const PartnerProgram = {
  name: 'PartnerProgram',
  render: () => <PartnerProgramSection />,
};

export const Gallery = {
  name: 'Gallery (empty)',
  render: () => <GallerySection />,
};

export const Location = {
  name: 'Location',
  render: () => <LocationSection />,
};
