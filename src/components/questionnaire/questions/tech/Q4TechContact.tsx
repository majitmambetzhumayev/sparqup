// src/components/questionnaire/questions/tech/Q4TechContact.tsx
'use client';

import { useState } from 'react';
import QuestionCard from '../../QuestionCard';
import ContactForm from '../../ContactForm';
import { ContactData } from '@/lib/questionnaire/types';

interface Q4TechContactProps {
  onSubmit: (contact: ContactData) => Promise<void>;
}

export default function Q4TechContact({ onSubmit }: Q4TechContactProps) {
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
    <QuestionCard title="Parlons de votre projet technique" width="narrow" spacing="compact">
      <div className="space-y-8">
        {/* Message explicatif */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-sm text-blue-800 leading-relaxed">
            <strong>💡 Prochaines étapes :</strong>
            <br />
            Je vous recontacte sous 24h pour un échange de 30-45 min afin de :
          </p>
          <ul className="mt-3 space-y-1 text-sm text-blue-800">
            <li>• Comprendre vos contraintes techniques précises</li>
            <li>• Vous proposer une architecture adaptée</li>
            <li>• Estimer le budget et la timeline de façon réaliste</li>
            <li>• Répondre à toutes vos questions</li>
          </ul>
        </div>

        {/* Contact Form */}
        <ContactForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </QuestionCard>
  );
}
