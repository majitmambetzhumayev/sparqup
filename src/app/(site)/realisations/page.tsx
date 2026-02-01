// src/app/realisations/page.tsx
'use client';

import { ExternalLink, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PageHeader from '@/components/layout/PageHeader';
import { useQuestionnaireModal } from '@/components/questionnaire/QuestionnaireProvider';

const projects = [
  {
    name: 'Face Plastie',
    tagline: 'Plateforme holistique anti-âge naturel',
    description:
      'Plateforme e-learning complète avec automatisation marketing et tunnel de vente pour programmes de rajeunissement facial naturel.',
    stack: [
      'LearnWorlds',
      'Mailerlite',
      'Zapier',
      'Stripe',
      'Notion',
      'Manychat',
      'Google Analytics',
      'Meta Pixels',
      'Meta Ads',
      'Google Ads',
    ],
    metrics: [
      { label: 'Automatisations', value: '15+' },
      { label: 'Intégrations', value: '9 outils' },
    ],
    link: 'https://faceplastie.com',
    screenshot: undefined, // ← undefined = utilise l'API screenshot
    status: 'En refonte',
    statusVariant: 'warning' as const,
  },
  {
    name: 'UMAÏ',
    tagline: 'E-commerce bien-être & beauté naturelle',
    description:
      'Site e-commerce premium pour produits de rajeunissement naturel : oreillers ergonomiques, outils LED, accessoires en soie.',
    stack: ['Shopify', 'TikTok Shop', 'Meta Pixels', 'Google Analytics'],
    metrics: [
      { label: 'Lancement', value: '2025' },
      { label: 'Produits', value: '10+' },
    ],
    link: 'https://boutique-umai.com',
    screenshot: undefined, // ← undefined = utilise l'API screenshot
    status: 'En ligne',
    statusVariant: 'success' as const,
  },
  {
    name: 'Chez Joon',
    tagline: 'Restaurant coréen',
    description: 'Site vitrine et menu intégré pour restaurant à Bordeaux.',
    stack: ['Wix', 'Wix Restaurants'],
    metrics: [
      { label: 'Pages', value: '5' },
      { label: 'En ligne', value: 'Menu intégré' },
    ],
    link: 'https://chezjoon.com',
    screenshot: '/media/mockups/chez-joon.webp', // ← Image locale de backup
    status: 'En développement',
    statusVariant: 'primary' as const,
  },
];

function getScreenshotUrl(url: string) {
  const microlinkApi = 'https://api.microlink.io';
  const params = new URLSearchParams({
    url: url,
    screenshot: 'true',
    meta: 'false',
    embed: 'screenshot.url',
    waitFor: '2000',
    viewport: '1200x800',
  });

  return `${microlinkApi}?${params.toString()}`;
}

export default function RealisationsPage() {
  const { open } = useQuestionnaireModal();

  return (
    <>
      <PageHeader
        title="Réalisations"
        subtitle="Du e-learning à l'e-commerce en passant par les sites vitrines"
      />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card padding="none" className="overflow-hidden group">
                <div className="relative h-64 bg-neutral-100 overflow-hidden">
                  <Image
                    src={project.screenshot || getScreenshotUrl(project.link)} // ← Logique fallback
                    alt={`Screenshot ${project.name}`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    unoptimized={!project.screenshot} // ← Unoptimized seulement si API externe
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant={project.statusVariant} className="backdrop-blur-md bg-white/90">
                      {project.status}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 bg-neutral-100">
                  <h3 className="text-2xl font-bold text-neutral-900 ">{project.name}</h3>
                  <p className="text-sm text-slate-400 font-medium mb-2">{project.tagline}</p>
                  <p className="text-neutral-700 mb-5">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4 pt-8">
                    {project.stack.slice(0, 3).map(tech => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                    {project.stack.length > 3 && (
                      <Badge variant="default">+{project.stack.length - 3}</Badge>
                    )}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-800 font-medium hover:gap-3 transition-all"
                  >
                    Voir le site
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="my-24 text-center">
          <Button variant="primary" size="lg" onClick={() => open()}>
            Un projet similaire ?
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Container>
    </>
  );
}
