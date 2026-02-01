// src/components/questionnaire/questions/Q7Confirmation.tsx
'use client';

import Button from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';
import QuestionCard from '../QuestionCard';

interface Q7ConfirmationProps {
  email: string;
  projectType: string;
  onClose: () => void;
}

export default function Q7Confirmation({ email, projectType, onClose }: Q7ConfirmationProps) {
  return (
    <QuestionCard
      title="Merci pour votre demande !"
      subtitle="Votre estimation personnalisée est en route."
      width="narrow"
      spacing="compact"
    >
      {/* Icon success */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>

      {/* Message */}
      <div className="text-center mb-8">
        <p className="text-neutral-700 mb-4">
          Vous recevrez une estimation personnalisée à l&apos;adresse :
        </p>
        <p className="text-lg font-semibold text-neutral-950 mb-6">{email}</p>
        <p className="text-sm text-neutral-600">
          Je reviendrai vers vous sous <strong>24h ouvrées</strong> avec une proposition détaillée
          pour votre projet <strong>{projectType}</strong>.
        </p>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <Button variant="primary" size="lg" onClick={onClose}>
          Retour à l&apos;accueil
        </Button>
      </div>
    </QuestionCard>
  );
}
