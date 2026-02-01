// src/components/home/ProcessTimeline.tsx
'use client';

import { Search, Layers, Rocket, Zap, GraduationCap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionContainer from '../ui/SectionContainer';
import { cn } from '@/lib/utils';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Un audit qui a du sens',
    description:
      "On étudie votre projet ensemble. L'objectif : identifier ce dont vous avez VRAIMENT besoin. Pas de sur-vente, pas de fonctionnalités inutiles qui gonflent la facture. Si un site vitrine simple suffit (comme Chez Joon), je vous le dis.",
    deliverable: 'Recommandations claires + estimation budgétaire réaliste',
    duration: '2-3 jours',
  },
  {
    icon: Layers,
    number: '02',
    title: 'Conception & planning',
    description:
      "On définit la timeline en fonction de vos assets (logo, photos, textes). Pas de charte graphique ? Je peux vous guider. On choisit les bons outils, on valide l'architecture, on s'aligne sur les priorités.",
    deliverable: 'Cahier des charges + planning détaillé + maquettes si besoin',
    duration: '3-5 jours',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Développement itératif',
    description:
      "Je développe par sprints de 3-7 jours. Vous validez à chaque étape. On ajuste en temps réel si besoin. Vous voyez l'avancement en direct. Validations toutes les semaines.",
    deliverable: 'Livrables fonctionnels à chaque sprint',
    duration: '1-16 semaines selon complexité',
  },
  {
    icon: Zap,
    number: '04',
    title: 'Automatisations & intégrations',
    description:
      "Je connecte vos outils (CRM, email, paiement, compta). J'automatise vos workflows si vous n'en avez pas encore. J'intègre de l'IA uniquement si c'est pertinent pour votre business (pas d'IA gadget qui bouffe votre budget API).",
    deliverable: 'Écosystème digital complet + process documentés',
    duration: 'Selon besoins (inclus ou extension)',
  },
  {
    icon: GraduationCap,
    number: '05',
    title: 'Formation & suivi lancement',
    description:
      'Je vous forme à 100% sur vos outils. Vous repartez autonome avec une documentation claire. Suivi rapproché pendant 2 semaines post-lancement pour corriger les bugs et ajuster si besoin. Après, vous êtes libre.',
    deliverable: 'Documentation complète + 2 semaines de support',
    duration: '2 semaines post-lancement',
  },
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1.1], ['0%', '100%']);
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
      id="process-timeline"
    >
      {/* Header */}
      <div className="max-w-3xl px-4 pb-4  md:px-8 md:pb-8 pt-32 mb-8 relative z-10">
        <p className="text-forest-600 font-medium text-sm ">Comment on travaille ensemble</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-950 mb-6 leading-[01]">
          Un process transparent
        </h2>
        <p className="text-xl text-neutral-600 leading-relaxed">
          Pas de tunnel noir, pas de surprise
        </p>
      </div>
      {/* Timeline */}
      <div ref={containerRef} className="relative max-w-6xl  z-10 -mx-2 lg:-mx-8">
        {/* Ligne verticale statique  */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 -translate-x-1/2 block mb-32" />

        {/* Ligne verticale progressive */}
        <motion.div
          className="absolute left-1/2 top-0 w-0.5 bg-forest-400 bg-gradient-to-r -translate-x-1/2 block origin-top mb-32"
          style={{ height: lineHeight }}
        />

        {/* Steps - Stack vertical mobile, alterné desktop */}
        <div className="space-y-8 lg:space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-50px' }}
                className={`
                    relative 
                    lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center
                    ${isLeft ? '' : 'lg:grid-flow-dense'}
                  `}
              >
                {/* Card */}
                <div
                  className={`
                    w-full
                    ${isLeft ? 'lg:justify-self-end' : 'lg:justify-self-start lg:col-start-2'}
                  `}
                >
                  <div
                    className={cn(
                      `${isLeft ? '' : 'lg:justify-self-end'}`,
                      `group relative p-6 bg-white border-2 border-neutral-200 rounded-2xl shadow-sm hover:border-neutral-900 hover:shadow-xl transition-all duration-300 lg:max-w-lg`
                    )}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                            Étape {step.number}
                          </span>
                          <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full font-medium">
                            {step.duration}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-950">{step.title}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                      {step.description}
                    </p>

                    {/* Deliverable */}
                    <div className="flex items-start gap-2 text-sm">
                      <span className="font-semibold text-neutral-950">→</span>
                      <span className="font-medium text-neutral-800">{step.deliverable}</span>
                    </div>
                  </div>
                </div>

                {/* Dot central (desktop only) */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <motion.div
                    className="w-6 h-6 bg-neutral-900 border-4 border-neutral-50 rounded-full shadow-lg"
                    whileInView={{
                      boxShadow: ['0 0 0 0 rgba(15, 23, 42, 0.4)', '0 0 0 8px rgba(15, 23, 42, 0)'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                    viewport={{ once: false }}
                  />
                </motion.div>

                {/* Ligne horizontale (desktop only) */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className={`
                      hidden lg:block 
                      absolute top-1/2 w-8 h-0.5 bg-neutral-900
                      ${isLeft ? 'right-1/2 mr-3 origin-right' : 'left-1/2 ml-3 origin-left'}
                    `}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom reassurance */}
      <div className="text-center px-4 py-16 md:px-8 md:pt-24 md:pb-20 max-w-3xl mx-auto relative z-10">
        <h3 className="text-2xl lg:text-3xl font-bold text-neutral-950 mb-4">
          Pas de devis surprise, pas de tunnel noir
        </h3>
        <p className="text-base lg:text-lg text-neutral-700 mb-6 leading-relaxed">
          Vous savez exactement où vous en êtes à chaque étape. Budget ET timeline validés dès
          l&apos;audit. Pas de frais cachés, pas de deadline fantaisiste
        </p>
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4 text-sm text-forest-700">
          <span className="inline-flex items-center gap-2">✓ Estimation précise après audit</span>
          <span className="inline-flex items-center gap-2">✓ Validation à chaque étape</span>
          <span className="inline-flex items-center gap-2">✓ Vous gardez le contrôle</span>
        </div>
      </div>
    </SectionContainer>
  );
}
