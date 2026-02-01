// src/components/questionnaire/questions/conseil/Q2ConseilContact.tsx
'use client';

import { useState } from 'react';
import QuestionCard from '../../QuestionCard';
import ContactForm from '../../ContactForm';
import CheckboxGroup, { CheckboxOption } from '../../inputs/CheckboxGroup';
import { ContactData } from '@/lib/questionnaire/types';

interface Q2ConseilContactProps {
  objectives: string[];
  onObjectivesChange: (objectives: string[]) => void;
  onSubmit: (contact: ContactData) => Promise<void>;
}

export default function Q2ConseilContact({
  objectives,
  onObjectivesChange,
  onSubmit,
}: Q2ConseilContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const objectiveOptions: CheckboxOption[] = [
    { id: 'sell', label: 'Vendre en ligne', description: 'E-commerce, paiements' },
    { id: 'visibility', label: 'Être visible sur Google', description: 'SEO, référencement' },
    { id: 'automate', label: 'Automatiser des tâches', description: 'Gain de temps' },
    { id: 'crm', label: 'Gérer mes clients', description: 'CRM, suivi' },
    { id: 'booking', label: 'Prendre des réservations', description: 'Agenda en ligne' },
    { id: 'modern', label: 'Site moderne et pro', description: 'Image de marque' },
  ];

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
      title="Je vous aide à définir votre besoin"
      subtitle="Sélectionnez vos objectifs, puis laissez-moi vos coordonnées"
      width="narrow"
      spacing="compact"
    >
      <div className="space-y-10">
        {/* Objectifs */}
        <div>
          <h3 className="text-xl font-bold text-neutral-950 mb-4">
            Que souhaitez-vous accomplir ?
          </h3>
          <CheckboxGroup
            options={objectiveOptions}
            value={objectives}
            onChange={onObjectivesChange}
          />
        </div>

        {/* Message */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <p className="text-sm text-green-800 leading-relaxed">
            <strong>✅ Je vous recontacte sous 24h pour :</strong>
          </p>
          <ul className="mt-3 space-y-1 text-sm text-green-800">
            <li>• Comprendre vos objectifs business</li>
            <li>• Vous recommander la meilleure approche</li>
            <li>• Estimer le budget réaliste</li>
            <li>• Vous orienter vers les bons outils</li>
          </ul>
        </div>

        {/* Contact Form */}
        <ContactForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </QuestionCard>
  );
}
