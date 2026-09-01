import type { ExperienceConfig } from '@/types';
import { constructionProjects } from './projects';
import { constructionServices } from './services';
import { constructionTestimonials } from './testimonials';
import { constructionStats } from './stats';

export const constructionConfig: ExperienceConfig = {
  type: 'construction',
  name: 'Construction',
  description: 'Building enduring spaces with precision, quality and craftsmanship.',
  heroHeadline: 'Built to Endure.',
  heroSubtext: 'Construction is where design meets reality. We bring rigor to every phase structural integrity, material honesty, schedule discipline, budget certainty. The result: buildings that perform as beautifully as they look.',
  accentColor: 'steel',
  accentColorLight: '#A3ACB3',
  accentColorDark: '#5D656B',
  focusColor: '#7A848C',
  projects: constructionProjects,
  services: constructionServices,
  testimonials: constructionTestimonials,
  stats: constructionStats,
  aboutContent: {
    heading: 'About Grid Homes Construction',
    intro: 'Established in 2016, Grid Homes Construction was founded on the belief that the way a building is built matters as much as how it is designed.',
    body: 'We are engineers, project managers, and site leaders who have delivered over 95 projects across residential, commercial, institutional, and hospitality sectors. Our work spans 4.2 million square feet from luxury villas on impossible sites to research facilities with vibration-isolated labs.\n\nWe don\'t subcontract responsibility. Our resident engineers, quality inspectors, and safety officers are on site every day. We run BIM Level 2 on major projects. We test concrete, mock up details, and track every rupee. Quality is not a final inspection it is a daily practice.',
    image: '/images/construction/about-site.jpg',
  },
  whyChooseUs: [
    { number: '01', title: 'Precision Engineering', description: 'In-house structural review, BIM coordination, and specialist subcontractor management for complex builds.' },
    { number: '02', title: 'Quality Systems', description: 'Mock-up approvals, material testing logs, third-party inspections, photographic documentation — embedded in process, not added at the end.' },
    { number: '03', title: 'Schedule Certainty', description: 'Critical-path scheduling with float monitoring. Weekly look-aheads. Monthly milestone reviews. 96% on-time delivery record.' },
    { number: '04', title: 'Budget Discipline', description: 'Fixed-price lump sum contracts. Real-time cost tracking. Change order management with owner approval gates. No surprise overruns.' },
    { number: '05', title: 'Site Discipline', description: 'Resident engineers, safety officers, quality inspectors on every site. Daily logs, weekly coordination, monthly reviews.' },
    { number: '06', title: 'End-to-End Accountability', description: 'From statutory approvals to defect liability period — one contract, one point of contact, full responsibility.' },
  ],
  processSteps: [
    { number: '01', title: 'Pre-Construction Planning', description: 'Feasibility, budgeting, statutory approvals, contractor pre-qualification, BIM setup, procurement strategy.' },
    { number: '02', title: 'Mobilization & Groundworks', description: 'Site setup, enabling works, excavation, piling, basement construction. Quality systems activated from day one.' },
    { number: '03', title: 'Superstructure & Envelope', description: 'Frame construction, slab cycles, façade installation, roofing. Mock-up sign-offs before production.' },
    { number: '04', title: 'Fit-Out & Services', description: 'MEP installation, internal finishes, joinery, specialist systems. Coordinated through BIM clash resolution.' },
    { number: '05', title: 'Testing & Commissioning', description: 'Systems testing, performance verification, statutory inspections, snagging, handover documentation.' },
    { number: '06', title: 'Defect Liability & Handover', description: '12-month defect liability period with scheduled inspections. Operations & maintenance manuals. Training.' },
  ],
  cta: {
    headline: 'Let\'s Build Something That Lasts.',
    subtext: 'Every project begins with a site visit and a conversation about your requirements, timeline, and budget. No obligation — just clarity.',
    buttonText: 'Start a Conversation',
    backgroundImage: '/images/construction/cta-background.jpg',
  },
  footer: {
    description: 'Grid Homes Construction — building with precision, quality, and commitment. Hyderabad · Bangalore · Visakhapatnam',
    address: '2-76/1, beside registration office, Narsingi, Hyderabad, Telangana 500075',
    mapsUrl: 'https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d673.0768530016809!2d78.3570884796051!3d17.387889053708715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d17.4591681!2d78.363249!4m5!1s0x3bcb9527ec013c87%3A0xce481596ea37e3b9!2sGridhomes%20interior%20and%20construction%2C%202-76%2F1%2C%20beside%20registration%20office%2C%20Narsingi%2C%20Hyderabad%2C%20Telangana%20500075!3m2!1d17.387690499999998!2d78.3569807!5e0!3m2!1sen!2sin!4v1788173195474!5m2!1sen!2sin',
    phone: '+91 9559631566',
    email: 'Gridhomesconstructionpvtltd@gmail.com',
    social: [
      { platform: 'Instagram', url: 'https://instagram.com/gridhomesconstruction', icon: 'instagram' },
      { platform: 'Facebook', url: 'https://facebook.com/gridhomesconstruction', icon: 'facebook' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/gridhomesconstruction', icon: 'linkedin' },
      { platform: 'YouTube', url: 'https://youtube.com/@gridhomesconstruction', icon: 'youtube' },
    ],
  },
};