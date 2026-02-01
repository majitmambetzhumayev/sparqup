// src/components/questionnaire/ContactForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/questionnaire/schema';
import { ContactData } from '@/lib/questionnaire/types';
import TextInput from './inputs/TextInput';
import TextArea from './inputs/TextArea';
import Button from '@/components/ui/Button';
import { z } from 'zod';

interface ContactFormProps {
  onSubmit: (data: ContactData) => Promise<void>;
  isLoading: boolean;
}

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm({ onSubmit, isLoading }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const description = watch('description') || '';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Prénom + Nom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label="Prénom"
          {...register('firstName')}
          error={errors.firstName?.message}
          required
          placeholder="Jean"
        />
        <TextInput
          label="Nom"
          {...register('lastName')}
          error={errors.lastName?.message}
          required
          placeholder="Dupont"
        />
      </div>

      {/* Email */}
      <TextInput
        label="Email professionnel"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        required
        placeholder="jean.dupont@entreprise.fr"
      />

      {/* Téléphone */}
      <TextInput
        label="Téléphone"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
        placeholder="06 12 34 56 78"
        helpText="Optionnel - Pour un échange rapide si besoin"
      />

      {/* Entreprise */}
      <TextInput
        label="Nom de votre entreprise"
        {...register('company')}
        error={errors.company?.message}
        required
        placeholder="Ma Super Entreprise"
      />

      {/* Secteur */}
      <TextInput
        label="Secteur d'activité"
        {...register('sector')}
        error={errors.sector?.message}
        placeholder="Ex: Restaurant, e-commerce mode, coach sportif..."
      />

      {/* Description */}
      <TextArea
        label="Décrivez votre projet en quelques lignes"
        {...register('description')}
        error={errors.description?.message}
        placeholder="Tout détail utile pour affiner l'estimation..."
        rows={4}
        maxLength={1000}
        charCount
        value={description}
      />

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          {...register('consent')}
          className="mt-1 w-5 h-5 rounded border-2 border-neutral-300 text-neutral-900 focus:ring-2 focus:ring-neutral-400"
        />
        <div>
          <label className="text-sm text-neutral-700">
            J&apos;accepte d&apos;être recontacté par SparqUp concernant mon projet{' '}
            <span className="text-red-500">*</span>
          </label>
          {errors.consent && <p className="text-sm text-red-600 mt-1">{errors.consent.message}</p>}

          <a
            href="/confidentialite"
            target="_blank"
            className="text-xs text-neutral-500 hover:text-neutral-700 underline block mt-1"
          >
            Vos données ne seront jamais partagées. Politique de confidentialité →
          </a>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        disabled={isLoading}
        className="w-full"
      >
        Recevoir mon estimation détaillée
      </Button>
    </form>
  );
}
