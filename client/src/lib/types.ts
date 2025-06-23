export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface RSVPFormData {
  name: string;
  attendance: 'ja' | 'nein' | 'vielleicht' | '';
  menu: 'fleisch' | 'vegetarisch' | 'vegan' | '';
  allergies: string;
}
