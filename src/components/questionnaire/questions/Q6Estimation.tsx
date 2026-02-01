// src/components/questionnaire/questions/Q6Estimation.tsx
'use client';

import { useState } from 'react';
import QuestionCard from '../QuestionCard';
import EstimationCard from '../EstimationCard';
import ContactForm from '../ContactForm';
import { Estimation, ContactData } from '@/lib/questionnaire/types';

interface Q6EstimationProps {
  estimation: Estimation;
  onSubmit: (contact: ContactData) => Promise<void>;
}

export default function Q6Estimation({ estimation, onSubmit }: Q6EstimationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ContactData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <QuestionCard
      title="Votre estimation"
      subtitle="📌 Estimation indicative basée sur vos réponses. Budget final et timeline précis définis après audit gratuit de 30 min."
      width="narrow"
      spacing="compact"
    >
      <div className="space-y-10">
        {/* Estimation */}

        <EstimationCard estimation={estimation} />

        {/* Contact Form */}
        <div>
          <h3 className="text-2xl font-bold text-neutral-950 mb-2">
            Recevez cette estimation par email
          </h3>
          <p className="text-neutral-600 mb-6">
            Je l&apos;affine et je vous recontacte sous 24h avec des recommandations personnalisées
          </p>
          <ContactForm onSubmit={handleSubmit} isLoading={isSubmitting} />
        </div>
      </div>
    </QuestionCard>
  );
}
