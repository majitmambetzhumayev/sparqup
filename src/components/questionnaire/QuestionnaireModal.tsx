// src/components/questionnaire/QuestionnaireModal.tsx
'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Q0Intro from './questions/Q0Intro';
import Q1TypeProject from './questions/Q1TypeProject';
import Q2Features from './questions/Q2Features';
import Q3Assets from './questions/Q3Assets';
import Q4Tools from './questions/Q4Tools';
import Q5TimelineBudget from './questions/Q5TimelineBudget';
import Q6Estimation from './questions/Q6Estimation';
import Q7Confirmation from './questions/Q7Confirmation';
import Q2TechNature from './questions/tech/Q2TechNature';
import Q4TechContact from './questions/tech/Q4TechContact';
import Q2ConseilContact from './questions/conseil/Q2ConseilContact';
import {
  QuestionnaireState,
  ProjectType,
  Branch,
  Timeline,
  ContactData,
  Budget,
} from '@/lib/questionnaire/types';
import { calculateEstimation } from '@/lib/questionnaire/estimation';
import { submitQuestionnaire } from '@/actions/questionnaire';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { questionnaireSchema } from '@/lib/questionnaire/schema';
import toast from 'react-hot-toast';

type QuestionnaireSubmitData = z.infer<typeof questionnaireSchema>;

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuestionnaireModal({ isOpen, onClose }: QuestionnaireModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [state, setState] = useState<QuestionnaireState>({
    projectType: null,
    branch: null,
    features: [],
    assets: [],
    tools: [],
    timeline: null,
    budget: null,
    complexityScore: 0,
    contact: null,
    currentStep: 0,
    totalSteps: 7,
    startedAt: new Date(),
  });

  // ✅ Charge preset au mount du modal
  useEffect(() => {
    if (!isOpen) return;

    const presetStr = sessionStorage.getItem('questionnaire-preset');
    if (presetStr) {
      try {
        const preset = JSON.parse(presetStr);
        setState(prev => ({
          ...prev,
          ...preset,
          currentStep: preset.currentStep || 0,
          startedAt: new Date(),
        }));
        sessionStorage.removeItem('questionnaire-preset');
      } catch (error) {
        console.error('Erreur chargement preset:', error);
      }
    }
  }, [isOpen]);

  // Scroll to top on step change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [state.currentStep]);

  const handleClose = useCallback(() => {
    if (state.currentStep > 0) {
      setShowConfirmExit(true);
    } else {
      onClose();
    }
  }, [state.currentStep, onClose]);

  const confirmExit = () => {
    setShowConfirmExit(false);
    onClose();
  };

  const cancelExit = () => {
    setShowConfirmExit(false);
  };

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  // Bloquer scroll du body quand modal ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ============================================
  // Handlers
  // ============================================

  const handleIntroStart = useCallback(() => {
    setState(prev => ({ ...prev, currentStep: 1 }));
  }, []);

  const handleQ1Next = useCallback((projectType: ProjectType, branch: Branch) => {
    setState(prev => ({
      ...prev,
      projectType,
      branch,
      currentStep: 2,
      totalSteps: branch === 'tech' ? 5 : branch === 'conseil' ? 3 : 7,
    }));
  }, []);

  const handleQ2FeaturesChange = useCallback((features: string[]) => {
    setState(prev => ({ ...prev, features }));
  }, []);

  const handleTechNatureChange = useCallback((nature: string) => {
    setState(prev => ({ ...prev, techNature: nature }));
  }, []);

  const handleQ3AssetsChange = useCallback((assets: string[]) => {
    setState(prev => ({ ...prev, assets }));
  }, []);

  const handleQ4ToolsChange = useCallback((tools: string[]) => {
    setState(prev => ({ ...prev, tools }));
  }, []);

  const handleQ5TimelineChange = useCallback((timeline: Timeline) => {
    setState(prev => ({ ...prev, timeline }));
  }, []);

  const handleQ5BudgetChange = useCallback((budget: Budget) => {
    setState(prev => ({ ...prev, budget }));
  }, []);

  const handleQ6Submit = useCallback(
    async (contact: ContactData) => {
      setState(prev => ({ ...prev, contact, completedAt: new Date() }));

      try {
        await submitQuestionnaire({
          ...state,
          contact,
          branch: state.branch!,
        } as QuestionnaireSubmitData);

        // Passe au step confirmation au lieu de redirect
        setState(prev => ({
          ...prev,
          currentStep: prev.totalSteps,
        }));
      } catch (error) {
        console.error('Erreur submission:', error);
        toast.error('Une erreur est survenue. Veuillez réessayer.');
      }
    },
    [state]
  );

  const handleNext = useCallback(() => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  }, []);

  const handlePrev = useCallback(() => {
    setState(prev => ({ ...prev, currentStep: Math.max(0, prev.currentStep - 1) }));
  }, []);

  // ============================================
  // Validation stricte
  // ============================================
  const isStepValid = useCallback((): boolean => {
    // Step 0 (intro) : pas de validation
    if (state.currentStep === 0) return false;

    // TPE branch
    if (state.branch === 'tpe') {
      switch (state.currentStep) {
        case 1:
          return state.projectType !== null;
        case 2:
          return state.features.length > 0;
        case 3:
          return state.assets.length > 0;
        case 4:
          return state.tools.length > 0;
        case 5:
          return state.timeline !== null && state.budget !== null;
        case 6:
          return false; // Form submit
        case 7:
          return false; // Confirmation
        default:
          return false;
      }
    }

    // Tech branch
    if (state.branch === 'tech') {
      switch (state.currentStep) {
        case 1:
          return state.projectType !== null;
        case 2:
          return (
            state.techNature !== undefined && state.techNature !== null && state.techNature !== ''
          );
        case 3:
          return state.timeline !== null && state.budget !== null;
        case 4:
          return false; // Form submit
        case 5:
          return false; // Confirmation
        default:
          return false;
      }
    }

    // Conseil branch
    if (state.branch === 'conseil') {
      switch (state.currentStep) {
        case 1:
          return state.projectType !== null;
        case 2:
          return false; // Form submit
        case 3:
          return false; // Confirmation
        default:
          return false;
      }
    }

    return false;
  }, [
    state.currentStep,
    state.branch,
    state.projectType,
    state.features.length,
    state.assets.length,
    state.tools.length,
    state.timeline,
    state.budget,
    state.techNature,
  ]);

  // Navigation avec Enter
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (!isOpen) return;

      // Step 0 (intro) : Enter démarre
      if (e.key === 'Enter' && state.currentStep === 0) {
        handleIntroStart();
        return;
      }

      // Steps suivants : Enter = Next si valide
      if (e.key === 'Enter' && state.currentStep > 0 && isStepValid()) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  }, [isOpen, state.currentStep, isStepValid, state, handleNext, handleIntroStart]);

  const estimation =
    state.currentStep === 6 && state.branch === 'tpe' && state.projectType
      ? calculateEstimation(state)
      : null;

  if (!isOpen) return null;

  // Détermine si on affiche le footer
  const shouldShowFooter = (): boolean => {
    // Pas de footer sur step 0 (intro)
    if (state.currentStep === 0) return false;

    // Pas de footer sur step confirmation finale
    if (state.currentStep === state.totalSteps) return false;

    // Pas de footer sur pages avec form de contact
    if (
      (state.branch === 'conseil' && state.currentStep === 2) ||
      (state.branch === 'tpe' && state.currentStep === 6) ||
      (state.branch === 'tech' && state.currentStep === 4)
    ) {
      return false;
    }

    return true;
  };

  return (
    <>
      {/* Overlay - Click = ferme */}
      <div
        className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-50"
        onClick={handleClose}
      />

      {/* Container centré */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        {/* Modal */}
        <div
          className="w-full max-w-4xl max-h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto animate-in zoom-in-95 fade-in duration-300"
          onClick={e => e.stopPropagation()}
        >
          {/* Header avec progress + close - Masqué sur Step 0 */}
          {state.currentStep > 0 && state.currentStep < state.totalSteps && (
            <div className="sticky top-0 z-10 bg-white border-b border-neutral-200">
              <div className="h-1 bg-neutral-200">
                <div
                  className="h-full bg-neutral-900 transition-all duration-500"
                  style={{ width: `${(state.currentStep / state.totalSteps) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
                <div className="text-xs sm:text-sm text-neutral-600">
                  Étape {state.currentStep}/{state.totalSteps}
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
                </button>
              </div>
            </div>
          )}

          {/* Close button sur Step 0 uniquement */}
          {state.currentStep === 0 && (
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleClose}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
              </button>
            </div>
          )}

          {/* Content scrollable */}
          <div
            ref={contentRef}
            className="overflow-y-auto max-h-[calc(95vh-140px)] px-4 sm:px-8 lg:px-12 py-6 lg:py-8"
          >
            {/* Q0 - Intro */}
            {state.currentStep === 0 && <Q0Intro onStart={handleIntroStart} />}

            {/* Q1 - Type de projet (TOUTES branches) */}
            {state.currentStep === 1 && (
              <Q1TypeProject value={state.projectType} onNext={handleQ1Next} />
            )}

            {/* ========== BRANCH TPE ========== */}
            {state.currentStep === 2 && state.branch === 'tpe' && state.projectType && (
              <Q2Features
                value={state.features}
                onChange={handleQ2FeaturesChange}
                projectType={state.projectType}
              />
            )}

            {state.currentStep === 3 && state.branch === 'tpe' && (
              <Q3Assets value={state.assets} onChange={handleQ3AssetsChange} />
            )}

            {state.currentStep === 4 && state.branch === 'tpe' && (
              <Q4Tools value={state.tools} onChange={handleQ4ToolsChange} />
            )}

            {state.currentStep === 5 && state.branch === 'tpe' && (
              <Q5TimelineBudget
                timeline={state.timeline}
                budget={state.budget}
                onTimelineChange={handleQ5TimelineChange}
                onBudgetChange={handleQ5BudgetChange}
                budgetType="tpe"
              />
            )}

            {state.currentStep === 6 && state.branch === 'tpe' && estimation && (
              <Q6Estimation estimation={estimation} onSubmit={handleQ6Submit} />
            )}

            {/* Q7 - Confirmation TPE */}
            {state.currentStep === 7 && state.branch === 'tpe' && (
              <Q7Confirmation
                email={state.contact?.email || ''}
                projectType={state.projectType || 'site web'}
                onClose={onClose}
              />
            )}

            {/* ========== BRANCH TECH ========== */}
            {state.currentStep === 2 && state.branch === 'tech' && (
              <Q2TechNature value={state.techNature || null} onChange={handleTechNatureChange} />
            )}

            {state.currentStep === 3 && state.branch === 'tech' && (
              <Q5TimelineBudget
                timeline={state.timeline}
                budget={state.budget}
                onTimelineChange={handleQ5TimelineChange}
                onBudgetChange={handleQ5BudgetChange}
                budgetType="tech"
              />
            )}

            {state.currentStep === 4 && state.branch === 'tech' && (
              <Q4TechContact onSubmit={handleQ6Submit} />
            )}

            {/* Q7 - Confirmation Tech */}
            {state.currentStep === 5 && state.branch === 'tech' && (
              <Q7Confirmation
                email={state.contact?.email || ''}
                projectType={state.projectType || 'projet technique'}
                onClose={onClose}
              />
            )}

            {/* ========== BRANCH CONSEIL ========== */}
            {state.currentStep === 2 && state.branch === 'conseil' && (
              <Q2ConseilContact
                objectives={state.conseilObjectives || []}
                onObjectivesChange={obj => setState(prev => ({ ...prev, conseilObjectives: obj }))}
                onSubmit={handleQ6Submit}
              />
            )}

            {/* Q7 - Confirmation Conseil */}
            {state.currentStep === 3 && state.branch === 'conseil' && (
              <Q7Confirmation
                email={state.contact?.email || ''}
                projectType="conseil"
                onClose={onClose}
              />
            )}
          </div>

          {/* Footer - Affiché selon shouldShowFooter() */}
          {shouldShowFooter() && (
            <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  className="text-md text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  ← Retour
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={cn(
                    'px-4 sm:px-6 py-2 rounded-lg font-medium transition-all text-md sm:text-base',
                    isStepValid()
                      ? 'bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer'
                      : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  )}
                >
                  Continuer →
                </button>
              </div>

              {isStepValid() && (
                <div className="mt-2 sm:mt-3 text-center">
                  <span className="text-xs text-neutral-400">
                    Appuyez sur{' '}
                    <kbd className="px-2 py-1 bg-neutral-100 rounded text-neutral-600 font-mono text-xs">
                      Enter ↵
                    </kbd>
                  </span>
                </div>
              )}
            </div>
          )}

          {/* ✅ Modal de confirmation exit */}
          {showConfirmExit && (
            <>
              <div
                className="fixed inset-0 bg-black/60 z-[60] animate-in fade-in duration-200"
                onClick={cancelExit}
              />

              <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                <div
                  className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 pointer-events-auto animate-in zoom-in-95 fade-in duration-200"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-950 mb-1">
                        Quitter le questionnaire ?
                      </h3>
                      <p className="text-sm text-neutral-600">
                        Votre progression sera perdue. Vous devrez recommencer depuis le début.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={cancelExit}
                      className="flex-1 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold rounded-lg transition-colors"
                    >
                      Continuer
                    </button>
                    <button
                      onClick={confirmExit}
                      className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Quitter
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
