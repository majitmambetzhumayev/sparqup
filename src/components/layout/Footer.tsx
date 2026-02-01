// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-forest-100 border-t border-forest-900">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">SparqUp</h3>
            <p className="text-forest-200 mb-6 leading-relaxed">
              Développement web et automatisation pour TPE/PME. Bordeaux.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:contact@sparqup.fr"
                className="flex items-center gap-2 text-forest-200 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@sparqup.fr
              </a>
              <div className="flex items-center gap-2 text-forest-200">
                <MapPin className="w-4 h-4" />
                Bordeaux, France
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Solutions</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/services#creation-web"
                  className="text-forest-200 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Création de sites web
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services#automatisation"
                  className="text-forest-200 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Automatisation
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services#contenu"
                  className="text-forest-200 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Production de contenu
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services#connexion-outils"
                  className="text-forest-200 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Connexion d&apos;outils
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services#digitalisation"
                  className="text-forest-200 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Digitalisation complète
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services#projet-technique"
                  className="text-forest-200 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Projets techniques
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="font-semibold text-white mb-4">Entreprise</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/realisations"
                  className="text-forest-200 hover:text-white transition-colors"
                >
                  Réalisations
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-forest-200 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal & CTA */}
          <div>
            <h4 className="font-semibold text-white mb-4">Démarrer</h4>
            <Link
              href="/questionnaire"
              className="inline-block px-6 py-3 bg-forest-600 hover:bg-forest-500 text-white font-semibold rounded-lg transition-colors mb-6"
            >
              Simuler mon projet
            </Link>

            <h4 className="font-semibold text-white mb-4 mt-8">Légal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-forest-200 hover:text-white transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="text-forest-200 hover:text-white transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-forest-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-forest-300">
          <p>© {currentYear} SparqUp · Développement web Bordeaux</p>
          <p>
            Conçu et développé par <span className="text-white font-medium">Majit Morosetti</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
