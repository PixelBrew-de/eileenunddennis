import { Link } from 'wouter';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-script text-2xl text-dusty-rose mb-4">Eillen & Dennis</h3>
            <p className="text-white/80">
              14. September 2026<br />
              Gut Sonnenberg
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Kontakt</h4>
            <p className="text-white/80">
              E-Mail: eillen.dennis@hochzeit2025.de<br />
              Telefon: +49 (0) 123 456789
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Rechtliches</h4>
            <div className="space-y-2">
              <Link href="/impressum">
                <span className="block text-white/80 hover:text-dusty-rose transition duration-300 cursor-pointer">
                  Impressum
                </span>
              </Link>
              <Link href="/datenschutz">
                <span className="block text-white/80 hover:text-dusty-rose transition duration-300 cursor-pointer">
                  Datenschutz
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm flex items-center justify-center">
            © 2026 Eillen & Dennis. Made with <Heart className="w-4 h-4 text-dusty-rose mx-1" /> for our special day.
          </p>
        </div>
      </div>
    </footer>
  );
}
