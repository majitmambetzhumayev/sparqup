// src/components/home/FeaturedProjects.tsx
'use client';

import { ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import SectionContainer from '@/components/ui/SectionContainer';

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

export default function FeaturedProjects() {
  const sectionGradients = {
    topLeft: 'bg-gradient-to-b from-white to-neutral-50',
    topCenter: 'bg-gradient-to-b from-white to-neutral-50',
    topRight: 'bg-gradient-to-b from-white to-neutral-50',
    middleLeft: 'bg-gradient-to-b from-neutral-50 to-neutral-100',
    middleRight: 'bg-gradient-to-b from-neutral-50 to-neutral-100',
    bottomLeft: 'bg-gradient-to-b from-neutral-100 to-neutral-200',
    bottomCenter: 'bg-gradient-to-b from-neutral-100 to-neutral-200',
    bottomRight: 'bg-gradient-to-b from-neutral-100 to-neutral-200',
  };

  return (
    <SectionContainer
      className="bg-neutral-50"
      gradients={sectionGradients}
      gridBgColor="bg-neutral-200"
      cellBgColor="bg-gradient-to-b from-neutral-50 to-neutral-100"
      showTopGradient={false}
      showTopBar={false}
      showBottomBar={false}
      id="featured-projects"
    >
      {/* Header */}
      <div className="max-w-3xl px-4 pb-4  md:px-8 md:pb-8 pt-32 mb-8 relative z-10">
        <p className="text-forest-600 font-medium text-sm mb-2">Projets récents</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-950 mb-6 leading-[01]">
          Des réalisations concrètes.
        </h2>
        <p className="text-xl text-neutral-600 leading-relaxed">
          Du e-learning à l&apos;e-commerce en passant par les sites vitrines
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-4 md:-mx-8 overflow-visible">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card padding="none" className="overflow-hidden group relative z-10">
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

              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-neutral-900 ">{project.name}</h3>
                <p className="text-sm text-slate-400 font-medium mb-2">{project.tagline}</p>
                <p className="text-neutral-700 mb-8">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
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

      <div className="mt-16 text-center mb-32">
        <Link href="/questionnaire">
          <Button variant="primary" size="lg">
            Un projet similaire ?
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </SectionContainer>
  );
}
