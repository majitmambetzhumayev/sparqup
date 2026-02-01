// src/components/questionnaire/EstimationCard.tsx
'use client';

import { Estimation } from '@/lib/questionnaire/types';

interface EstimationCardProps {
  estimation: Estimation;
}

export default function EstimationCard({ estimation }: EstimationCardProps) {
  const { minBudget, maxBudget, minWeeks, maxWeeks, stack, recurringCosts } = estimation;

  return (
    <div className="p-8 bg-gradient-to-br from-neutral-50 to-neutral-100 border-2 border-neutral-900 rounded-2xl shadow-lg">
      {/* Budget */}
      <div className="mb-6">
        <div className="text-sm font-bold text-neutral-600 uppercase tracking-wide mb-2">
          💰 Budget estimé
        </div>
        <div className="text-4xl font-bold text-neutral-950">
          {minBudget.toLocaleString()} € - {maxBudget.toLocaleString()} €{' '}
          <span className="text-2xl text-neutral-600">HT</span>
        </div>
      </div>

      <div className="h-px bg-neutral-300 my-6" />

      {/* Stack */}
      <div className="mb-6">
        <div className="text-sm font-bold text-neutral-600 uppercase tracking-wide mb-3">
          🛠️ Stack recommandée
        </div>
        <ul className="space-y-2">
          {stack.map((tool, index) => (
            <li key={index} className="flex items-start gap-2 text-neutral-700">
              <span className="text-neutral-900 font-medium">•</span>
              <div>
                <span className="font-semibold text-neutral-950">{tool.name}</span>
                <span className="text-neutral-600"> — {tool.description}</span>
                {tool.monthlyCost && (
                  <span className="text-sm text-neutral-500 ml-2">
                    ({tool.monthlyCost}, {tool.included ? 'inclus' : 'non inclus'})
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
        {recurringCosts && <p className="text-sm text-neutral-600 mt-3">💡 {recurringCosts}</p>}
      </div>

      <div className="h-px bg-neutral-300 my-6" />

      {/* Timeline */}
      <div>
        <div className="text-sm font-bold text-neutral-600 uppercase tracking-wide mb-2">
          ⏱️ Délai estimé
        </div>
        <div className="text-2xl font-bold text-neutral-950">
          {minWeeks === maxWeeks ? `${minWeeks} semaines` : `${minWeeks}-${maxWeeks} semaines`}
        </div>
        <p className="text-sm text-neutral-600 mt-1">Selon disponibilité de vos assets</p>
      </div>
    </div>
  );
}
