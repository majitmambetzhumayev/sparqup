// src/components/questionnaire/questions/Q0Intro.tsx
'use client';

import QuestionCard from '../QuestionCard';

interface Q0IntroProps {
  onStart: () => void;
}

export default function Q0Intro({ onStart }: Q0IntroProps) {
  return (
    <QuestionCard
      title="Simulez votre projet en 5 minutes"
      subtitle="Estimation gratuite sous 24h"
      width="narrow"
      spacing="compact"
    >
      <div className="max-w-2xl mx-auto text-center py-8">
        {/* Icon ou illustration */}

        {/* Description */}
        <p className="text-lg text-neutral-600 mb-8">
          Répondez à quelques questions sur votre projet. Vous recevrez une estimation budgétaire
          claire et réaliste sous 24h.
        </p>

        {/* Badges - Grid 3 colonnes */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="text-2xl mb-2">✓</div>
            <div className="font-semibold text-neutral-950 mb-1">Gratuit</div>
            <div className="text-sm text-neutral-600">Sans engagement</div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-semibold text-neutral-950 mb-1">5 minutes</div>
            <div className="text-sm text-neutral-600">Estimation rapide</div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="text-2xl mb-2">📧</div>
            <div className="font-semibold text-neutral-950 mb-1">24h</div>
            <div className="text-sm text-neutral-600">Réponse garantie</div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full sm:w-auto px-8 py-4 bg-forest-600 hover:bg-forest-500 text-white font-bold rounded-lg text-lg transition-colors"
        >
          Démarrer le questionnaire →
        </button>

        {/* Hint Enter */}
        <div className="mt-4 text-sm text-neutral-400">
          Ou appuyez sur{' '}
          <kbd className="px-2 py-1 bg-neutral-100 rounded text-neutral-600 font-mono">Enter ↵</kbd>
        </div>
      </div>
    </QuestionCard>
  );
}
