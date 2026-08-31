import type { ExperienceConfig } from '@/types';
import { interiorsProjects } from './projects';
import { interiorsServices } from './services';
import { interiorsTestimonials } from './testimonials';
import { interiorsStats } from './stats';

export const interiorsConfig: ExperienceConfig = {
  type: 'interiors',
  name: 'Home Interiors',
  description: 'Thoughtfully designed spaces that reflect the way you live.',
  heroHeadline: 'Spaces Designed Around You.',
  heroSubtext: 'We create interiors that emerge from how you live — not from a catalogue. Every project begins with listening, evolves through iteration, and arrives at a place that feels inevitable.',
  accentColor: 'clay',
  accentColorLight: '#D4B896',
  accentColorDark: '#967752',
  focusColor: '#B8956A',
  projects: interiorsProjects,
  services: interiorsServices,
  testimonials: interiorsTestimonials,
  stats: interiorsStats,
  aboutContent: {
    heading: 'About Grid Homes Interiors',
    intro: 'Founded in 2012, Grid Homes Interiors began with a simple conviction: the best interiors are invisible — they get out of the way of life.',
    body: 'We are a team of designers, architects, and makers who believe that good design is not a style but a discipline. It is the rigor of asking "why" at every decision. It is the patience to iterate until the solution feels inevitable. It is the humility to let the client\'s life lead, and the craft to make that life beautiful.\n\nOur work spans villas, apartments, penthouses, and commercial spaces across South India. Each project is different because each client is different — but our process remains constant: listen deeply, think rigorously, execute precisely.',
    image: '/images/interiors/about-studio.jpg',
  },
  whyChooseUs: [
    { number: '01', title: 'Thoughtful Design', description: 'We design from the inside out — starting with your rituals, rhythms, and aspirations.' },
    { number: '02', title: 'Attention to Detail', description: 'The joint between materials. The reveal of a drawer. The fall of light at 4 PM. Details are not decoration; they are the design.' },
    { number: '03', title: 'Premium Materials', description: 'We source natural stone, solid timber, hand-troweled plasters, and artisan textiles — materials that age with character.' },
    { number: '04', title: 'Transparent Process', description: 'Fixed-fee proposals. Weekly updates. Real-time budget tracking. No surprises, no hidden costs.' },
    { number: '05', title: 'Experienced Team', description: 'Senior designers lead every project from concept to handover. Your project never gets handed to a junior.' },
    { number: '06', title: 'End-to-End Execution', description: 'Design, procurement, fabrication, installation — all managed in-house. One point of accountability.' },
  ],
  cta: {
    headline: 'Let\'s Create a Space You\'ll Love Coming Home To.',
    subtext: 'Every project begins with a conversation. No obligation, no pressure — just a dialogue about what you\'re looking for.',
    buttonText: 'Start a Conversation',
    backgroundImage: '/images/interiors/cta-background.jpg',
  },
  footer: {
    description: 'Grid Homes Interiors — designing spaces that reflect the way you live. Hyderabad · Bangalore · Visakhapatnam',
    address: '2-76/1, beside registration office, Narsingi, Hyderabad, Telangana 500075',
    mapsUrl: 'https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d673.0768530016809!2d78.3570884796051!3d17.387889053708715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d17.4591681!2d78.363249!4m5!1s0x3bcb9527ec013c87%3A0xce481596ea37e3b9!2sGridhomes%20interior%20and%20construction%2C%202-76%2F1%2C%20beside%20registration%20office%2C%20Narsingi%2C%20Hyderabad%2C%20Telangana%20500075!3m2!1d17.387690499999998!2d78.3569807!5e0!3m2!1sen!2sin!4v1788173195474!5m2!1sen!2sin',
    phone: '+91 9559631566',
    email: ' Gridhomesinteriors@gmail.com',
    social: [
      { platform: 'Instagram', url: 'https://www.instagram.com/gridhomes_interiors', icon: 'instagram' },
      { platform: 'Facebook', url: 'https://facebook.com/gridhomesinteriors', icon: 'facebook' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/gridhomesinteriors', icon: 'linkedin' },
      { platform: 'YouTube', url: 'https://youtube.com/@gridhomesinteriors', icon: 'youtube' },
    ],
  },
};