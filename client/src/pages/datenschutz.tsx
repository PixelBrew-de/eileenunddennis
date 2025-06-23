import { Mail } from 'lucide-react';

export default function Datenschutz() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-8">Datenschutzerklärung</h1>
        
        <div className="prose prose-lg max-w-none text-charcoal/80">
          <h2 className="font-serif text-2xl font-bold text-charcoal mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
          
          <h3 className="font-medium text-charcoal mt-6 mb-2">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h3 className="font-medium text-charcoal mt-6 mb-2">Datenerfassung auf dieser Website</h3>
          <p>
            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>

          <h2 className="font-serif text-2xl font-bold text-charcoal mt-8 mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
          
          <h3 className="font-medium text-charcoal mt-6 mb-2">Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>

          <h2 className="font-serif text-2xl font-bold text-charcoal mt-8 mb-4">3. Datenerfassung auf dieser Website</h2>
          
          <h3 className="font-medium text-charcoal mt-6 mb-2">Kontaktformular</h3>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>

          <h3 className="font-medium text-charcoal mt-6 mb-2">RSVP-Formular</h3>
          <p>
            Die über das RSVP-Formular übermittelten Daten (Name, Teilnahme-Status, Menüwahl, Allergien/Anmerkungen) werden ausschließlich zur Organisation unserer Hochzeitsfeier verwendet. Die Daten werden nach der Veranstaltung gelöscht und nicht an Dritte weitergegeben.
          </p>

          <h2 className="font-serif text-2xl font-bold text-charcoal mt-8 mb-4">4. Ihre Rechte</h2>
          <p>
            Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.
          </p>

          <div className="bg-rose-light p-6 rounded-xl mt-8">
            <p className="font-medium text-charcoal flex items-center">
              <Mail className="text-dusty-rose mr-2" size={20} />
              Bei Fragen zum Datenschutz kontaktieren Sie uns unter: anna.lukas@hochzeit2025.de
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
