// src/app/legal/privacy/page.tsx
import Container from '@/components/ui/Container';

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen  py-20">
      <Container size="md">
        <div className="max-w-3xl mx-auto rounded-2xl border-2 border-neutral-200 p-8 lg:p-12">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-950 mb-8">
            Politique de confidentialité
          </h1>

          <div className="prose prose-neutral max-w-none">
            <p className="text-sm text-neutral-600 mb-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>

            <h2 className="text-2xl font-bold text-neutral-950 mt-8 mb-4">
              1. Responsable du traitement
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              SparqUp, représentée par Majit Morosetti, est responsable du traitement de vos données
              personnelles.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Email : contact@sparqup.fr
              <br />
              Adresse : Bordeaux, France
            </p>

            <h2 className="text-2xl font-bold text-neutral-950 mt-8 mb-4">2. Données collectées</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Nous collectons les données suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-4">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Téléphone (optionnel)</li>
              <li>Nom de l&apos;entreprise</li>
              <li>Informations sur votre projet (questionnaire)</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-950 mt-8 mb-4">
              3. Finalités du traitement
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Vos données sont utilisées pour :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-4">
              <li>Répondre à vos demandes de contact</li>
              <li>Vous envoyer une estimation de projet personnalisée</li>
              <li>Gérer notre relation commerciale</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-950 mt-8 mb-4">4. Base légale</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Le traitement de vos données repose sur votre <strong>consentement</strong> (article
              6.1.a du RGPD) que vous nous donnez en cochant la case lors de l&apos;envoi du
              formulaire.
            </p>

            <h2 className="text-2xl font-bold text-neutral-950 mt-8 mb-4">
              5. Durée de conservation
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Vos données sont conservées pendant <strong>3 ans</strong> à compter de notre dernier
              contact, sauf obligation légale contraire.
            </p>

            <h2 className="text-2xl font-bold text-neutral-950 mt-8 mb-4">
              6. Destinataires des données
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Vos données sont accessibles uniquement par :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-4">
              <li>SparqUp (responsable du traitement)</li>
              <li>Nos prestataires techniques (hébergement : Vercel, emails : Resend)</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-950 mt-8 mb-4">7. Vos droits</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-4">
              <li>
                <strong>Droit d&apos;accès :</strong> obtenir une copie de vos données
              </li>
              <li>
                <strong>Droit de rectification :</strong> corriger vos données inexactes
              </li>
              <li>
                <strong>Droit à l&apos;effacement :</strong> supprimer vos données
              </li>
              <li>
                <strong>Droit d&apos;opposition :</strong> vous opposer au traitement
              </li>
              <li>
                <strong>Droit à la portabilité :</strong> recevoir vos données dans un format
                structuré
              </li>
              <li>
                <strong>Droit de retrait du consentement :</strong> retirer votre consentement à
                tout moment
              </li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Pour exercer vos droits, contactez-nous à :{' '}
              <a href="mailto:contact@sparqup.fr" className="underline">
                contact@sparqup.fr
              </a>
            </p>

            <h2 className="text-2xl font-bold text-neutral-950 mt-8 mb-4">8. Réclamation</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une
              réclamation auprès de la CNIL :
              <br />
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                www.cnil.fr
              </a>
            </p>

            <h2 className="text-2xl font-bold text-neutral-950 mt-8 mb-4">9. Sécurité</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées
              pour protéger vos données contre la perte, l&apos;utilisation abusive ou l&apos;accès
              non autorisé.
            </p>

            <h2 className="text-2xl font-bold text-neutral-950 mt-8 mb-4">10. Cookies</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Notre site n&apos;utilise pas de cookies de tracking ou publicitaires. Seuls des
              cookies techniques essentiels au fonctionnement du site peuvent être utilisés.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
