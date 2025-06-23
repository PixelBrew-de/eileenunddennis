export default function Impressum() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-8">Impressum</h1>
        
        <div className="prose prose-lg max-w-none text-charcoal/80">
          <h2 className="font-serif text-2xl font-bold text-charcoal mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
          <p>
            Eillen Mustermann & Dennis Beispiel<br />
            Musterstraße 123<br />
            12345 Musterstadt<br />
            Deutschland
          </p>

          <h2 className="font-serif text-2xl font-bold text-charcoal mt-8 mb-4">Kontakt</h2>
          <p>
            E-Mail: eillen.dennis@hochzeit2025.de<br />
            Telefon: +49 (0) 123 456789
          </p>

          <h2 className="font-serif text-2xl font-bold text-charcoal mt-8 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            Eillen Mustermann & Dennis Beispiel<br />
            Musterstraße 123<br />
            12345 Musterstadt
          </p>

          <h2 className="font-serif text-2xl font-bold text-charcoal mt-8 mb-4">Haftungsausschluss</h2>
          <h3 className="font-medium text-charcoal mt-6 mb-2">Haftung für Inhalte</h3>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>

          <h3 className="font-medium text-charcoal mt-6 mb-2">Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
        </div>
      </div>
    </div>
  );
}
