// src/components/questionnaire/questions/tech/Q2TechNature.tsx
'use client';

import { useState } from 'react';
import QuestionCard from '../../QuestionCard';
import RadioGroup, { RadioOption } from '../../inputs/RadioGroup';
import { TECH_NATURE_OPTIONS } from '@/lib/questionnaire/constants';

interface Q2TechNatureProps {
  value: string | null;
  onChange: (nature: string) => void;
}

export default function Q2TechNature({ value, onChange }: Q2TechNatureProps) {
  const [selectedNature, setSelectedNature] = useState<string | null>(value);

  const handleChange = (nature: string) => {
    setSelectedNature(nature);
    onChange(nature); // ← Appel direct, pas de useEffect
  };

  const options: RadioOption[] = TECH_NATURE_OPTIONS.map(opt => ({
    id: opt.id,
    label: opt.label,
    description: opt.description,
    icon: <span className="text-4xl">{opt.icon}</span>,
  }));

  return (
    <QuestionCard title="Quel type de projet technique ?" width="narrow" spacing="compact">
      <RadioGroup
        options={options}
        value={selectedNature}
        onChange={handleChange} // ← Utilise le wrapper
        name="tech-nature"
      />
    </QuestionCard>
  );
}
