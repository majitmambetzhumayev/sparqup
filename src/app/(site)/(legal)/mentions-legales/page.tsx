// src/app/legal/mentions/page.tsx
import Container from '@/components/ui/Container';

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-neutral-50 py-20">
      <Container size="md">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-neutral-200 p-8 lg:p-12">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-950 mb-8">Mentions légales</h1>

          <div className="prose prose-neutral max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-neutral-950 mb-4">Éditeur du site</h2>
              <p className="text-neutral-700">
                SparqUp
                <br />
                SASU
                <br />
                Représentée par : Majit Morosetti
                <br />
                Adresse : Bordeaux, France
                <br />
                Email :{' '}
                <a href="mailto:contact@sparqup.fr" className="underline">
                  contact@sparqup.fr
                </a>
                <br />
                SIRET : 93840485200015
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-950 mb-4">Hébergeur</h2>
              <p className="text-neutral-700">
                Vercel Inc.
                <br />
                340 S Lemon Ave #4133
                <br />
                Walnut, CA 91789, USA
                <br />
                Site :{' '}
                <a href="https://vercel.com" target="_blank" rel="noopener" className="underline">
                  vercel.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-950 mb-4">Propriété intellectuelle</h2>
              <p className="text-neutral-700">
                L&apos;ensemble du contenu de ce site (textes, images, vidéos) est la propriété
                exclusive de SparqUp, sauf mention contraire. Toute reproduction, même partielle,
                est interdite sans autorisation préalable.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
