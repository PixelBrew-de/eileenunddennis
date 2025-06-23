import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heart, HeartHandshake, HelpCircle, Loader2 } from 'lucide-react';
import type { RSVPFormData } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich'),
  attendance: z.enum(['ja', 'nein', 'vielleicht'], {
    required_error: 'Bitte wählt eure Teilnahme aus',
  }),
  menu: z.enum(['fleisch', 'vegetarisch', 'vegan']).optional(),
  allergies: z.string().optional(),
});

export default function RSVPForm() {
  const [selectedAttendance, setSelectedAttendance] = useState<string>('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<RSVPFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      attendance: '',
      menu: '',
      allergies: '',
    },
  });

  const submitRSVP = useMutation({
    mutationFn: async (data: RSVPFormData) => {
      return await apiRequest('POST', '/api/rsvp', data);
    },
    onSuccess: () => {
      toast({
        title: 'Dankeschön!',
        description: 'Eure Antwort ist bei uns angekommen. Wir freuen uns riesig!',
      });
      form.reset();
      setSelectedAttendance('');
      queryClient.invalidateQueries({ queryKey: ['/api/rsvps'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Fehler',
        description: 'Es gab ein Problem beim Senden eurer Antwort. Bitte versucht es noch einmal.',
        variant: 'destructive',
      });
      console.error('RSVP submission error:', error);
    },
  });

  const onSubmit = (data: RSVPFormData) => {
    submitRSVP.mutate(data);
  };

  const attendanceOptions = [
    { value: 'ja', label: 'Ja, wir kommen!', icon: Heart },
    { value: 'nein', label: 'Leider nein', icon: HeartHandshake },
    { value: 'vielleicht', label: 'Vielleicht', icon: HelpCircle },
  ];

  return (
    <section id="rsvp" className="py-20 bg-gradient-to-br from-rose-light to-beige-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Bitte um Antwort
          </h2>
          <p className="text-lg text-charcoal/80">
            Wir freuen uns auf eure Rückmeldung bis zum <strong>1. August 2025</strong>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal">
                      Name(n) *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Euer Name(n)"
                        className="border-wedding-beige focus:border-dusty-rose focus:ring-dusty-rose"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attendance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal mb-4 block">
                      Teilnahme *
                    </FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {attendanceOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = selectedAttendance === option.value;
                        return (
                          <label key={option.value} className="relative cursor-pointer">
                            <input
                              type="radio"
                              value={option.value}
                              checked={field.value === option.value}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                setSelectedAttendance(e.target.value);
                              }}
                              className="sr-only"
                            />
                            <div
                              className={`border-2 rounded-lg p-4 text-center transition duration-300 ${
                                isSelected
                                  ? 'border-dusty-rose bg-dusty-rose/10'
                                  : 'border-wedding-beige hover:border-dusty-rose'
                              }`}
                            >
                              <Icon className="w-6 h-6 text-dusty-rose mx-auto mb-2" />
                              <div className="font-medium">{option.label}</div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="menu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal">
                      Menüwahl
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-wedding-beige focus:border-dusty-rose focus:ring-dusty-rose">
                          <SelectValue placeholder="Bitte wählen..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fleisch">Fleisch</SelectItem>
                        <SelectItem value="vegetarisch">Vegetarisch</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal">
                      Allergien / Besondere Wünsche
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Teilt uns gerne mit, wenn ihr besondere Bedürfnisse oder Wünsche habt..."
                        className="border-wedding-beige focus:border-dusty-rose focus:ring-dusty-rose"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center pt-6">
                <Button
                  type="submit"
                  disabled={submitRSVP.isPending}
                  className="bg-dusty-rose text-white px-12 py-4 rounded-full font-medium text-lg hover:bg-dusty-rose/90 transition duration-300 shadow-lg"
                >
                  {submitRSVP.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2" />
                      Antwort senden
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
