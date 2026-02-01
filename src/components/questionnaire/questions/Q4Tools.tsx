// src/components/questionnaire/questions/Q4Tools.tsx
'use client';

import { useState, useEffect } from 'react';
import QuestionCard from '../QuestionCard';
import CheckboxGroup, { CheckboxOption } from '../inputs/CheckboxGroup';
import { TOOLS } from '@/lib/questionnaire/constants';

interface Q4ToolsProps {
  value: string[];
  onChange: (tools: string[]) => void;
}

export default function Q4Tools({ value, onChange }: Q4ToolsProps) {
  const [selectedTools, setSelectedTools] = useState<string[]>(value);

  useEffect(() => {
    onChange(selectedTools);
  }, [selectedTools, onChange]);

  const sections = [
    { id: 'communication', title: '📧 Communication', tools: TOOLS.communication },
    { id: 'email', title: '📬 Email Marketing', tools: TOOLS.email },
    { id: 'payment', title: '💰 Paiement & Facturation', tools: TOOLS.payment },
    { id: 'crm', title: '📊 Organisation & CRM', tools: TOOLS.crm },
    { id: 'automation', title: '🔗 Automatisation', tools: TOOLS.automation },
    { id: 'booking', title: '📅 Réservation & Planning', tools: TOOLS.booking },
    { id: 'social', title: '📱 Social Media', tools: TOOLS.social },
    { id: 'none', title: '❌ Aucun outil', tools: TOOLS.none },
  ];

  const getTip = () => {
    if (selectedTools.length === 0) {
      return {
        message: '⚠️ Sélectionnez au moins un outil, ou cochez "Je n\'utilise aucun de ces outils"',
        type: 'warning' as const,
      };
    }

    if (selectedTools.includes('none')) {
      return {
        message:
          "💡 Je vous recommanderai les outils adaptés à votre activité lors de l'estimation.",
        type: 'info' as const,
      };
    }

    if (selectedTools.length >= 6) {
      return {
        message:
          '⚡ Écosystème riche ! Je pourrai connecter tous ces outils pour créer des automatisations puissantes.',
        type: 'info' as const,
      };
    }

    return null;
  };

  const tip = getTip();

  return (
    <QuestionCard
      title="Quels outils utilisez-vous déjà ?"
      subtitle="On pourra les connecter à votre nouveau site"
      tip={tip?.message}
      tipType={tip?.type}
      width="narrow"
      spacing="compact"
    >
      <div className="space-y-8">
        {sections.map(section => {
          const options: CheckboxOption[] = section.tools.map(tool => ({
            id: tool.id,
            label: tool.label,
          }));

          return (
            <div key={section.id}>
              <h3 className="text-lg font-bold text-neutral-950 mb-4">{section.title}</h3>
              <CheckboxGroup
                options={options}
                value={selectedTools}
                onChange={setSelectedTools}
                exclusiveOptions={['none']}
              />
            </div>
          );
        })}
      </div>
    </QuestionCard>
  );
}
