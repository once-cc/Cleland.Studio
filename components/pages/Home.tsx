import React from 'react';
import { Hero } from '../Hero';
import { Authority } from '../sections/Authority';
import { SystemThinking } from '../sections/SystemThinking';
import { Work } from '../sections/Work';
import { CraftFrameworkSection } from '../sections/CraftFrameworkSection';
import { Services } from '../sections/Services';
import { BeginSection } from '../sections/BeginSection';
import { LogoCarousel } from '../sections/LogoCarousel';

export const Home: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <Authority />
      <LogoCarousel />
      <SystemThinking />
      <Work />
      <Services />
      <CraftFrameworkSection id="blueprint" />
      <BeginSection />
    </>
  );
};