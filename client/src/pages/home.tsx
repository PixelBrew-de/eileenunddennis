import { Calendar, MapPin, Heart, Clock, Users, Utensils, Music, Car, Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RSVPForm from '@/components/rsvp-form';
import type { TimelineEvent } from '@/lib/types';

export default function Home() {
  const timelineEvents: TimelineEvent[] = [
    {
      time: '14:00 Uhr',
      title: 'Trauung',
      description: 'Die kirchliche Trauung findet in der wunderschönen Kapelle statt.',
      icon: 'heart',
    },
    {
      time: '15:30 Uhr',
      title: 'Empfang',
      description: 'Sektempfang im Garten mit Glückwünschen und ersten Fotos.',
      icon: 'users',
    },
    {
      time: '18:00 Uhr',
      title: 'Dinner',
      description: 'Festliches Dinner mit einem 4-Gang-Menü im Festsaal.',
      icon: 'utensils',
    },
    {
      time: '21:00 Uhr',
      title: 'Party',
      description: 'Tanzen und feiern bis in die frühen Morgenstunden!',
      icon: 'music',
    },
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'heart':
        return Heart;
      case 'users':
        return Users;
      case 'utensils':
        return Utensils;
      case 'music':
        return Music;
      default:
        return Heart;
    }
  };

  const scrollToRSVP = () => {
    setTimeout(() => {
      document.getElementById('rsvp')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-light to-beige-light py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-charcoal mb-6">
                Anna <span className="text-dusty-rose">&</span> Lukas
              </h1>
              <div className="font-script text-2xl md:text-3xl text-dusty-rose mb-8">
                heiraten
              </div>
              <div className="space-y-4 text-lg md:text-xl">
                <p className="flex items-center justify-center lg:justify-start">
                  <Calendar className="text-dusty-rose mr-3" size={20} />
                  <span>14. September 2025</span>
                </p>
                <p className="flex items-center justify-center lg:justify-start">
                  <MapPin className="text-dusty-rose mr-3" size={20} />
                  <span>Gut Sonnenberg</span>
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  onClick={scrollToRSVP}
                  className="bg-dusty-rose text-white px-8 py-3 rounded-full font-medium hover:bg-dusty-rose/90 transition duration-300 shadow-md"
                >
                  Jetzt antworten
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000" 
                alt="Romantic wedding couple portrait" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <p className="font-script text-2xl text-dusty-rose">Save the Date</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-8">
            Wir heiraten!
          </h2>
          <div className="prose prose-lg mx-auto text-charcoal/80 leading-relaxed">
            <p className="text-xl mb-6">
              Liebe Familie und Freunde,
            </p>
            <p className="mb-6">
              nach vielen wunderschönen Jahren möchten wir den nächsten großen Schritt gemeinsam gehen und heiraten! 
              Wir würden uns riesig freuen, wenn ihr diesen besonderen Tag mit uns feiert.
            </p>
            <p className="mb-6">
              Unser großer Tag findet am <strong>14. September 2025</strong> im wunderschönen <strong>Gut Sonnenberg</strong> statt. 
              Freut euch auf eine unvergessliche Feier voller Liebe, Lachen und schöner Erinnerungen.
            </p>
            <p className="font-script text-2xl text-dusty-rose mt-8">
              Wir können es kaum erwarten, mit euch zu feiern!
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 bg-gradient-to-br from-beige-light to-rose-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-charcoal mb-16">
            Unser Hochzeitstag
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timelineEvents.map((event, index) => {
              const IconComponent = getIconComponent(event.icon);
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                  <div className="w-16 h-16 bg-dusty-rose rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-center text-charcoal mb-2">
                    {event.title}
                  </h3>
                  <p className="text-dusty-rose text-center font-medium mb-2">
                    {event.time}
                  </p>
                  <p className="text-charcoal/70 text-center text-sm">
                    {event.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-6">
                Gut Sonnenberg
              </h2>
              <div className="space-y-4 text-lg text-charcoal/80">
                <p className="flex items-start">
                  <MapPin className="text-dusty-rose mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>
                    Sonnenbergstraße 123<br />
                    12345 Musterstadt<br />
                    Deutschland
                  </span>
                </p>
                <p className="flex items-center">
                  <Car className="text-dusty-rose mr-3 flex-shrink-0" size={20} />
                  <span>Ausreichend Parkplätze vorhanden</span>
                </p>
                <p className="flex items-center">
                  <Accessibility className="text-dusty-rose mr-3 flex-shrink-0" size={20} />
                  <span>Barrierefrei zugänglich</span>
                </p>
              </div>
              <div className="mt-8">
                <Button className="bg-dusty-rose text-white px-6 py-3 rounded-full font-medium hover:bg-dusty-rose/90 transition duration-300 shadow-md">
                  <MapPin className="mr-2" size={16} />
                  Route planen
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
                alt="Romantic wedding venue exterior"
                className="rounded-xl shadow-lg w-full h-48 object-cover col-span-2"
              />
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300"
                alt="Elegant wedding venue interior"
                className="rounded-xl shadow-lg w-full h-32 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300"
                alt="Beautiful wedding garden setting"
                className="rounded-xl shadow-lg w-full h-32 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <RSVPForm />
    </main>
  );
}
