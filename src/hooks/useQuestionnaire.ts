// src/hooks/useQuestionnaire.ts
'use client';

import { useState, useCallback } from 'react';
import { ProjectType, Branch } from '@/lib/questionnaire/types';

interface QuestionnairePreset {
  projectType?: ProjectType;
  branch?: Branch;
  currentStep?: number;
  totalSteps?: number;
}

export function useQuestionnaire() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const open = useCallback((preset?: QuestionnairePreset) => {
    // Nettoie d'abord
    sessionStorage.removeItem('questionnaire-preset');

    // Injecte preset si fourni
    if (preset) {
      sessionStorage.setItem('questionnaire-preset', JSON.stringify(preset));
    }

    // Force re-mount + ouvre
    setModalKey(prev => prev + 1);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    modalKey,
    open,
    close,
  };
}
