//FinalCTA.tsx

'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useQuestionnaireModal } from '../questionnaire/QuestionnaireProvider';

export default function FinalCTA() {
  const { open } = useQuestionnaireModal();

  return (
    <section className="py-24 px-4 bg-white">
      <Container size="md" className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Prêt à digitaliser votre activité ?
          </h2>
          <p className="text-xl text-neutral-700 mb-8 max-w-2xl mx-auto">
            5 questions → estimation immédiate
          </p>

          <Button
            onClick={() => open()}
            variant="primary"
            size="lg"
            className="bg-black text-neutral-100 hover:bg-accent-50 shadow-2xl hover:shadow-accent-500/20"
          >
            Simuler mon projet maintenant
            <ArrowRight className="w-5 h-5" />
          </Button>

          <p className="mt-6 text-sm text-neutral-400">
            ⚡ Moins de 3 minutes • Estimation immédiate • 🔒 Sans engagement • 📧 Réponse garantie
            sous 24h
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
