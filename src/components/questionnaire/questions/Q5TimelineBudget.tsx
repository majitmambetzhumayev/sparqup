// src/components/questionnaire/questions/Q5TimelineBudget.tsx
'use client';

import { useState, useEffect } from 'react';
import QuestionCard from '../QuestionCard';
import RadioGroup, { RadioOption } from '../inputs/RadioGroup';
import {
  TIMELINE_OPTIONS,
  BUDGET_OPTIONS_TPE,
  BUDGET_OPTIONS_TECH,
} from '@/lib/questionnaire/constants';
import { Timeline, Budget } from '@/lib/questionnaire/types';

interface Q5TimelineBudgetProps {
  timeline: Timeline | null;
  budget: Budget | null;
  onTimelineChange: (timeline: Timeline) => void;
  onBudgetChange: (budget: Budget) => void; // ← Budget générique
  budgetType?: 'tpe' | 'tech';
}

export default function Q5TimelineBudget({
  timeline,
  budget,
  onTimelineChange,
  onBudgetChange,
  budgetType = 'tpe',
}: Q5TimelineBudgetProps) {
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(timeline);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(budget);

  useEffect(() => {
    if (selectedTimeline) {
      onTimelineChange(selectedTimeline as Timeline);
    }
  }, [selectedTimeline, onTimelineChange]);

  useEffect(() => {
    if (selectedBudget) {
      onBudgetChange(selectedBudget as Budget); // ← Cast en Budget générique
    }
  }, [selectedBudget, onBudgetChange]);

  const timelineOptions: RadioOption[] = TIMELINE_OPTIONS.map(opt => ({
    id: opt.id,
    label: opt.label,
    description: opt.description,
  }));

  const budgetOptionsSource = budgetType === 'tech' ? BUDGET_OPTIONS_TECH : BUDGET_OPTIONS_TPE;
  const budgetOptions: RadioOption[] = budgetOptionsSource.map(opt => ({
    id: opt.id,
    label: opt.label,
  }));

  const getTip = () => {
    if (
      selectedTimeline === 'fast' &&
      selectedBudget &&
      ['<2000', '2000-5000'].includes(selectedBudget)
    ) {
      return {
        message:
          '⚠️ Timeline rapide + budget limité : le scope devra être réduit pour tenir les délais.',
        type: 'warning' as const,
      };
    }

    if (budgetType === 'tpe' && selectedBudget === '<2000') {
      return {
        message:
          '💡 Pour ce budget, je recommande un site vitrine simple. Les fonctionnalités avancées nécessitent un budget supérieur.',
        type: 'info' as const,
      };
    }

    return null;
  };

  const tip = getTip();

  return (
    <QuestionCard
      title="Planning et budget"
      tip={tip?.message}
      tipType={tip?.type}
      width="narrow"
      spacing="compact"
    >
      <div className="space-y-10">
        <div>
          <h3 className="text-xl font-bold text-neutral-950 mb-4">
            Quand souhaitez-vous lancer votre projet ?
          </h3>
          <RadioGroup
            options={timelineOptions}
            value={selectedTimeline}
            onChange={setSelectedTimeline}
            name="timeline"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-neutral-950 mb-4">
            Quel est votre budget estimé ?
          </h3>
          <RadioGroup
            options={budgetOptions}
            value={selectedBudget}
            onChange={setSelectedBudget}
            name="budget"
          />
        </div>
      </div>
    </QuestionCard>
  );
}
