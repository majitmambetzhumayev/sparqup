// src/components/questionnaire/questions/Q2Features.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import QuestionCard from '../QuestionCard';
import CheckboxGroup, { CheckboxOption } from '../inputs/CheckboxGroup';
import { FEATURES } from '@/lib/questionnaire/constants';
import { ProjectType } from '@/lib/questionnaire/types';

interface Q2FeaturesProps {
  value: string[];
  onChange: (features: string[]) => void;
  projectType: ProjectType;
}

export default function Q2Features({ value, onChange, projectType }: Q2FeaturesProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(value);

  // Sync avec parent
  useEffect(() => {
    onChange(selectedFeatures);
  }, [selectedFeatures, onChange]);

  // Déterminer quelles sections afficher selon le type de projet
  const visibleSections = useMemo(() => {
    const sections: Array<{ id: string; title: string; features: CheckboxOption[] }> = [];

    // Section Essentiels (toujours affichée)
    sections.push({
      id: 'essentials',
      title: '🎨 Essentiels',
      features: FEATURES.essentials.map(f => ({
        id: f.id,
        label: f.label,
        description: f.description,
      })),
    });

    // Section Vente (seulement pour e-commerce)
    if (projectType === 'ecommerce') {
      sections.push({
        id: 'vente',
        title: '💳 Vente & Conversion',
        features: FEATURES.vente.map(f => ({
          id: f.id,
          label: f.label,
          description: f.description,
        })),
      });
    }

    // Section Réservation (pour vitrine, plateforme, refonte)
    if (['vitrine', 'plateforme', 'refonte'].includes(projectType)) {
      sections.push({
        id: 'reservation',
        title: '📅 Réservation & Gestion',
        features: FEATURES.reservation.map(f => ({
          id: f.id,
          label: f.label,
          description: f.description,
        })),
      });
    }

    // Section Automatisation (toujours affichée)
    sections.push({
      id: 'automation',
      title: '🤖 Automatisation & Intégrations',
      features: FEATURES.automation.map(f => ({
        id: f.id,
        label: f.label,
        description: f.description,
      })),
    });

    // Section Avancé (toujours affichée)
    sections.push({
      id: 'advanced',
      title: '🌍 International & Avancé',
      features: FEATURES.advanced.map(f => ({
        id: f.id,
        label: f.label,
        description: f.description,
      })),
    });

    return sections;
  }, [projectType]);

  // Pré-cocher certaines features si automatisation
  useEffect(() => {
    if (projectType === 'automatisation' && selectedFeatures.length === 0) {
      // Auto-sélection des features d'automatisation
      const autoFeatures = FEATURES.automation.map(f => f.id);
      setSelectedFeatures(autoFeatures);
    }
  }, [projectType, selectedFeatures]); // Seulement au mount

  // Tip dynamique
  const getTip = () => {
    if (selectedFeatures.length === 0) {
      return {
        message: '⚠️ Sélectionnez au moins une fonctionnalité pour continuer',
        type: 'warning' as const,
      };
    }

    if (selectedFeatures.length > 8) {
      return {
        message:
          '💡 Votre projet semble complexe. Je vous recommanderai un accompagnement sur-mesure.',
        type: 'info' as const,
      };
    }

    return null;
  };

  const tip = getTip();

  return (
    <QuestionCard
      title="De quelles fonctionnalités avez-vous besoin ?"
      subtitle="Sélectionnez tout ce qui vous intéresse"
      tip={tip?.message}
      tipType={tip?.type}
      width="narrow"
      spacing="compact"
    >
      <div className="space-y-8">
        {visibleSections.map(section => (
          <div key={section.id}>
            {/* Section title */}
            <h3 className="text-2xl font-bold text-neutral-950 mb-3 flex items-center gap-2">
              {section.title}
            </h3>

            {/* Checkboxes */}
            <CheckboxGroup
              options={section.features}
              value={selectedFeatures}
              onChange={setSelectedFeatures}
            />
          </div>
        ))}

        {/* Option "Autre" */}
        <div>
          <h3 className="text-lg font-bold text-neutral-950 mb-4">✍️ Autre</h3>
          <CheckboxGroup
            options={[
              {
                id: 'other',
                label: "Autre besoin (précisez dans l'étape contact)",
                description: 'Fonctionnalité spécifique non listée',
              },
            ]}
            value={selectedFeatures}
            onChange={setSelectedFeatures}
          />
        </div>
      </div>
    </QuestionCard>
  );
}
