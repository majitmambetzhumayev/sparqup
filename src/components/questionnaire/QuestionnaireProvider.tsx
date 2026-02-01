// src/components/questionnaire/QuestionnaireProvider.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import QuestionnaireModal from '@/components/questionnaire/QuestionnaireModal';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';

interface QuestionnaireContextValue {
  open: ReturnType<typeof useQuestionnaire>['open'];
  close: ReturnType<typeof useQuestionnaire>['close'];
}

const QuestionnaireContext = createContext<QuestionnaireContextValue | null>(null);

export function useQuestionnaireModal() {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaireModal must be used within QuestionnaireProvider');
  }
  return context;
}

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const { isOpen, modalKey, open, close } = useQuestionnaire();

  return (
    <QuestionnaireContext.Provider value={{ open, close }}>
      {children}
      <QuestionnaireModal key={modalKey} isOpen={isOpen} onClose={close} />
    </QuestionnaireContext.Provider>
  );
}
