'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/common';
import { Button } from '@/components/common';
import { cn } from '@/lib/utils/cn';
import { CheckCircle, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';
import type { ExperienceConfig, ContactFormData } from '@/types';
import { sendContactEmail } from '@/lib/emailjs';

interface ContactModalProps {
  experience: ExperienceConfig;
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function ContactModal({ experience, isOpen, onClose, defaultService }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    projectType: defaultService || '',
    location: '',
    budget: '',
    message: '',
  });

  useEffect(() => {
    if (isOpen && defaultService && formData.projectType !== defaultService) {
      setTimeout(() => {
        setFormData(prev => ({ ...prev, projectType: defaultService }));
      }, 0);
    }
  }, [isOpen, defaultService, formData.projectType]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        document.body.style.overflow = 'hidden';
      }, 10);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.projectType) newErrors.projectType = 'Required';
    if (!formData.location.trim()) newErrors.location = 'Required';
    if (!formData.message.trim()) newErrors.message = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      await sendContactEmail({
        ...formData,
        source: experience.type === 'interiors' ? 'Interiors Website' : 'Construction Website'
      });
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', projectType: '', location: '', budget: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMessage('Oops! Something went wrong. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const projectTypes = experience.services ? experience.services.map(s => s.name) : [];

  const budgetRanges = [
    'Under ₹50 Lakhs',
    '₹50 Lakhs - ₹1 Crore',
    '₹1 Crore - ₹2 Crores',
    '₹2 Crores - ₹5 Crores',
    'Above ₹5 Crores',
    'Prefer not to say',
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md" // Smaller max-width
      // Added mt-20 to avoid navbar, constrained height, and removed standard scrollbars
      className="max-h-[calc(100dvh-100px)] mt-20 md:mt-24 overflow-y-auto sm:overflow-hidden rounded-3xl bg-black text-white border border-white/10 shadow-2xl scrollbar-hide"
    >
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            className="flex flex-col items-center justify-center p-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-green-500/10 border-4 border-green-500/20 flex items-center justify-center mb-4"
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <CheckCircle className="w-8 h-8 text-green-400" />
            </motion.div>
            <h3 className="font-display text-xl text-white mb-2">Message Sent!</h3>
            <p className="text-xs text-white/70 mb-6 max-w-[250px] mx-auto leading-relaxed">
              Thanks for reaching out! We&apos;ll review your details and get back to you within 24 hours.
            </p>
            <Button
              variant={experience.accentColor === 'clay' ? 'primary' : 'primary-construction'}
              className="rounded-full px-8 py-2 text-black bg-gold hover:bg-white text-xs"
              onClick={() => {
                setStatus('idle');
                onClose();
              }}
            >
              Done
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Highly compact header */}
            <div className="px-5 pt-5 pb-2 border-b border-white/5">
              <h2 className="font-display text-xl sm:text-2xl text-white mb-1">Contact Us</h2>
              <p className="text-xs text-white/60">Tell us about your space.</p>
            </div>

            {/* Compressed body with tighter gaps and smaller inputs */}
            <ModalBody className="p-5">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="name" className="text-[9px] uppercase tracking-wider font-semibold text-white/60 ml-1 mb-1 block">Name *</label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      className={cn('input rounded-xl bg-white/5 border-white/10 text-xs py-2 text-white placeholder:text-white/30 focus:border-gold focus:ring-1 focus:ring-gold', errors.name && 'border-red-500/50 bg-red-500/10')}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-[9px] uppercase tracking-wider font-semibold text-white/60 ml-1 mb-1 block">Email *</label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      className={cn('input rounded-xl bg-white/5 border-white/10 text-xs py-2 text-white placeholder:text-white/30 focus:border-gold focus:ring-1 focus:ring-gold', errors.email && 'border-red-500/50 bg-red-500/10')}
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="phone" className="text-[9px] uppercase tracking-wider font-semibold text-white/60 ml-1 mb-1 block">Phone *</label>
                    <input
                      type="tel" id="phone" name="phone"
                      value={formData.phone} onChange={handleChange}
                      className={cn('input rounded-xl bg-white/5 border-white/10 text-xs py-2 text-white placeholder:text-white/30 focus:border-gold focus:ring-1 focus:ring-gold', errors.phone && 'border-red-500/50 bg-red-500/10')}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="text-[9px] uppercase tracking-wider font-semibold text-white/60 ml-1 mb-1 block">Location *</label>
                    <input
                      type="text" id="location" name="location"
                      value={formData.location} onChange={handleChange}
                      className={cn('input rounded-xl bg-white/5 border-white/10 text-xs py-2 text-white placeholder:text-white/30 focus:border-gold focus:ring-1 focus:ring-gold', errors.location && 'border-red-500/50 bg-red-500/10')}
                      placeholder="Hyderabad"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="projectType" className="text-[9px] uppercase tracking-wider font-semibold text-white/60 ml-1 mb-1 block">Project Type *</label>
                    <select
                      id="projectType" name="projectType"
                      value={formData.projectType} onChange={handleChange}
                      className={cn('input rounded-xl bg-white/5 border-white/10 text-xs py-2 text-white focus:border-gold focus:ring-1 focus:ring-gold [&>option]:bg-neutral-900', errors.projectType && 'border-red-500/50 bg-red-500/10')}
                    >
                      <option value="">Select type</option>
                      {projectTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="text-[9px] uppercase tracking-wider font-semibold text-white/60 ml-1 mb-1 block">Budget (Optional)</label>
                    <select
                      id="budget" name="budget"
                      value={formData.budget} onChange={handleChange}
                      className="input rounded-xl bg-white/5 border-white/10 text-xs py-2 text-white focus:border-gold focus:ring-1 focus:ring-gold [&>option]:bg-neutral-900"
                    >
                      <option value="">Select range</option>
                      {budgetRanges.map(range => <option key={range} value={range}>{range}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="text-[9px] uppercase tracking-wider font-semibold text-white/60 ml-1 mb-1 block">Details *</label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    rows={2} // Reduced to 2 rows to fit smaller screens
                    className={cn('input rounded-xl bg-white/5 border-white/10 text-xs py-2 resize-none text-white placeholder:text-white/30 focus:border-gold focus:ring-1 focus:ring-gold', errors.message && 'border-red-500/50 bg-red-500/10')}
                    placeholder="Tell us what you're looking for..."
                  />
                </div>

                {status === 'error' && (
                  <motion.div
                    className="flex items-center gap-2 p-2 rounded-xl bg-red-500/10 border border-red-500/20"
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    <p className="text-[10px] text-red-300 font-medium">{errorMessage}</p>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  variant={experience.accentColor === 'clay' ? 'primary' : 'primary-construction'}
                  className="w-full rounded-full mt-1 py-2.5 shadow-md text-xs tracking-widest uppercase bg-gold text-black hover:bg-white border-none"
                  isLoading={status === 'submitting'}
                >
                  Send Message
                </Button>
              </form>
            </ModalBody>

            {/* Compact footer buttons */}
            <ModalFooter className="bg-white/5 border-t border-white/10 py-3 px-5">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <a
                  href={`tel:${experience.footer.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-semibold text-white hover:bg-gold hover:text-black hover:border-gold transition-colors"
                >
                  <Phone className="w-3 h-3" /> Call
                </a>

                <a
                  href={`mailto:${experience.footer.email}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-semibold text-white hover:bg-gold hover:text-black hover:border-gold transition-colors"
                >
                  <Mail className="w-3 h-3" /> Email
                </a>

                {experience.footer.mapsUrl && (
                  <a
                    href={experience.footer.mapsUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-semibold text-white hover:bg-gold hover:text-black hover:border-gold transition-colors"
                  >
                    <MapPin className="w-3 h-3" /> Location
                  </a>
                )}
              </div>
            </ModalFooter>
          </>
        )}
      </AnimatePresence>
    </Modal>
  );
}