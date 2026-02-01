// src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/layout/PageHeader';
import toast from 'react-hot-toast';
import { useQuestionnaireModal } from '@/components/questionnaire/QuestionnaireProvider';
import Link from 'next/link';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  const { open } = useQuestionnaireModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = toast.loading('Envoi en cours...');

    if (!consent) {
      alert('Veuillez accepter la politique de confidentialité');
      return;
    }

    setIsSubmitting(true);

    const form = e.currentTarget;

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Message envoyé ! Je vous réponds sous 24h.', {
          id: toastId, // Remplace le loading
        });
        form.reset();
        setConsent(false);
      } else {
        toast.error("Erreur lors de l'envoi. Réessayez.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error('Erreur envoi contact:', error);
      toast.error('Erreur réseau. Contactez-moi par email.', {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader title="Nous contacter" subtitle="Une question ? Un projet ? Parlons-en." />
      <Container size="md">
        <div className="max-w-2xl mx-auto pt-20 px-4">
          <div className="bg-white rounded-2xl border-2 border-neutral-200 p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-950 mb-2">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-950 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-950 mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                  placeholder="Décrivez brièvement votre besoin..."
                />
              </div>

              {/* RGPD Consentement */}
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-neutral-300 text-neutral-900 focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                  <span className="text-sm text-neutral-700 leading-relaxed">
                    J&apos;accepte que mes données soient utilisées pour me recontacter concernant
                    ma demande. Vos données sont traitées conformément à notre{' '}
                    <Link href="/legal/privacy" className="underline hover:text-neutral-900">
                      politique de confidentialité
                    </Link>
                    . <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting || !consent}
                className="w-full"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </Button>
            </form>
          </div>

          {/* Alternative questionnaire */}
          <div className="bg-forest-900 rounded-xl p-6 text-center border border-neutral-800 my-12">
            <p className="text-sm text-forest-400 mb-3">
              💡 <strong>Pour un devis précis :</strong> Simulez votre projet en 5 minutes
            </p>
            <Button variant="secondary" onClick={() => open()}>
              Accéder au questionnaire →
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
