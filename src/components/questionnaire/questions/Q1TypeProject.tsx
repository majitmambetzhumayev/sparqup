// src/components/questionnaire/questions/Q1TypeProject.tsx
'use client';

import { useState } from 'react';
import QuestionCard from '../QuestionCard';
import RadioGroup, { RadioOption } from '../inputs/RadioGroup';
import { PROJECT_TYPES } from '@/lib/questionnaire/constants';
import { ProjectType, Branch } from '@/lib/questionnaire/types';

interface Q1TypeProjectProps {
  value: ProjectType | null;
  onNext: (projectType: ProjectType, branch: Branch) => void;
}

export default function Q1TypeProject({ value, onNext }: Q1TypeProjectProps) {
  const [selectedType, setSelectedType] = useState<string | null>(value);

  // Convertir PROJECT_TYPES en RadioOption[]
  const options: RadioOption[] = PROJECT_TYPES.map(type => ({
    id: type.id,
    label: type.label,
    description: type.description,
    icon: <span>{type.icon}</span>,
  }));

  return (
    <QuestionCard title="Quel type de projet avez-vous ?" width="narrow" spacing="compact">
      <RadioGroup
        options={options}
        value={selectedType}
        onChange={id => {
          setSelectedType(id);
          const selected = PROJECT_TYPES.find(t => t.id === id);
          if (selected) {
            onNext(selected.id, selected.branch);
          }
        }}
        name="project-type"
      />
    </QuestionCard>
  );
}
