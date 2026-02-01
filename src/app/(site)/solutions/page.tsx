// src/app/services/page.tsx
import { SERVICES } from '@/lib/services-data';
import Container from '@/components/ui/Container';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ServiceSection from '@/components/services/ServiceSection';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Solutions" subtitle="Développement / automatisation / Digitalisation" />
      {/* Services détaillés */}
      {SERVICES.map((service, index) => {
        const IconComponent = service.icon; // ← Récupère le composant Lucide
        const isReversed = index % 2 !== 0; // Alterne gauche/droite

        return (
          <ServiceSection
            id={service.id}
            key={service.id}
            title={service.title}
            subtitle={service.subtitle}
            description={service.description}
            icon={<IconComponent className="w-12 h-12 text-forest-700" />}
            features={service.includes || []}
            technologies={service.technologies || []}
            pricing={service.pricing}
            duration={service.duration}
            imageUrl={`/media/services/${service.id}.png`}
            imageAlt={`${service.title} - SparqUp`}
            reversed={isReversed}
            SVG={service.SVG}
            showTopGradient={service.showTopGradient ?? true}
            // Customize par service si besoin
            imageBorder={service.imageConfig?.border ?? true}
            imageShadow={service.imageConfig?.shadow ?? true}
            imageRounded={service.imageConfig?.rounded ?? true}
            imageObjectFit={service.imageConfig?.objectFit || 'cover'}
            aspectRatio={service.imageConfig?.aspectRatio}
          />
        );
      })}

      {/* CTA Final */}
      <section className="bg-forest-950 text-white py-20">
        <Container size="md">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Pas sûr de quelle solution choisir ?</h2>
            <p className="text-forest-100 mb-8 text-lg">
              Répondez à quelques questions, je vous recommande la meilleure approche
            </p>
            <Link
              href="/questionnaire"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest-950 rounded-lg font-bold hover:bg-neutral-100 transition-colors"
            >
              Démarrer le questionnaire
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
