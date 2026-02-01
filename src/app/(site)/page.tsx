// src/app/page.tsx
'use client';

import HeroSection from '@/components/home/HeroSection';
import TechMarquee from '@/components/home/TechMarquee';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import FinalCTA from '@/components/home/FinalCTA';
import QuestionnaireModal from '@/components/questionnaire/QuestionnaireModal';
import { useEffect, useState } from 'react';
import SolutionsGrid from '@/components/home/SolutionsGrid';

export default function HomePage() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  // ✅ Écoute l'event custom
  useEffect(() => {
    const handleOpenQuestionnaire = () => {
      setIsQuestionnaireOpen(true);
    };

    window.addEventListener('open-questionnaire', handleOpenQuestionnaire);

    return () => {
      window.removeEventListener('open-questionnaire', handleOpenQuestionnaire);
    };
  }, []);

  return (
    <>
      <HeroSection />
      <TechMarquee />
      <SolutionsGrid />
      <FeaturedProjects />
      <ProcessTimeline />
      <FinalCTA />
      <QuestionnaireModal
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
      />
    </>
  );
}
