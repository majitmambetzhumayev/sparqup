// src/components/questionnaire/questions/Q3Assets.tsx
'use client';

import { useState, useEffect } from 'react';
import QuestionCard from '../QuestionCard';
import CheckboxGroup, { CheckboxOption } from '../inputs/CheckboxGroup';
import { ASSETS } from '@/lib/questionnaire/constants';

interface Q3AssetsProps {
  value: string[];
  onChange: (assets: string[]) => void;
}

export default function Q3Assets({ value, onChange }: Q3AssetsProps) {
  const [selectedAssets, setSelectedAssets] = useState<string[]>(value);

  useEffect(() => {
    onChange(selectedAssets);
  }, [selectedAssets, onChange]);

  const options: CheckboxOption[] = ASSETS.map(asset => ({
    id: asset.id,
    label: asset.label,
    description: asset.help,
  }));

  const getTip = () => {
    if (selectedAssets.includes('none')) {
      return {
        message:
          '💡 Pas de souci ! Je peux vous guider sur la création de charte graphique et vous recommander des ressources (photographes, rédacteurs).',
        type: 'info' as const,
      };
    }

    if (selectedAssets.length >= 4 && !selectedAssets.includes('none')) {
      return {
        message:
          '✅ Excellent ! Avec ces assets, on pourra démarrer rapidement et réduire les délais.',
        type: 'info' as const,
      };
    }

    if (selectedAssets.length === 0) {
      return {
        message: '⚠️ Sélectionnez vos assets disponibles, ou cochez "Rien de tout ça"',
        type: 'warning' as const,
      };
    }

    return null;
  };

  const tip = getTip();

  return (
    <QuestionCard
      title="Avez-vous déjà ces éléments ?"
      subtitle="Cela nous aide à estimer le temps et le budget"
      tip={tip?.message}
      tipType={tip?.type}
      width="narrow"
      spacing="compact"
    >
      <CheckboxGroup
        options={options}
        value={selectedAssets}
        onChange={setSelectedAssets}
        exclusiveOptions={['none']} // "Rien de tout ça" désélectionne les autres
      />
    </QuestionCard>
  );
}
