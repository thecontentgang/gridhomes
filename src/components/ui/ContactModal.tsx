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

  // Keep form data in sync with defaultService if modal opens with a new default
  useEffect(() => {
    if (isOpen && defaultService && formData.projectType !== defaultService) {
      setFormData(prev => ({ ...prev, projectType: defaultService }));
    }
  }, [isOpen, defaultService]);

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
  const linkedInUrl = experience.footer.social.find(s => s.platform === 'LinkedIn')?.url;

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
      size="lg" // Reduced from xl to lg for a cuter, more compact feel
      className="max-h-[90vh] overflow-y-auto rounded-3xl"
    >
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            className="flex flex-col items-center justify-center p-10 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-100 flex items-center justify-center mb-5"
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <CheckCircle className="w-10 h-10 text-green-500" />
            </motion.div>
            <h3 className="font-display text-2xl text-neutral-900 mb-2">Message Sent!</h3>
            <p className="text-sm text-neutral-500 mb-8 max-w-xs mx-auto leading-relaxed">
              Thanks for reaching out! We'll review your details and get back to you within 24 hours.
            </p>
            <Button
              variant={experience.accentColor === 'clay' ? 'primary' : 'primary-construction'}
              className="rounded-full px-8"
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
            <ModalHeader
              title="Say Hello 👋"
              subtitle="Tell us a little about your space, and we'll take it from there."
            />

            <ModalBody className="p-5 sm:p-7">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

                {/* Compact 2-Column Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 ml-1 mb-1 block">Name *</label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      className={cn('input rounded-xl bg-neutral-50 text-sm py-2.5', errors.name && 'input-error bg-red-50')}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 ml-1 mb-1 block">Email *</label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      className={cn('input rounded-xl bg-neutral-50 text-sm py-2.5', errors.email && 'input-error bg-red-50')}
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                {/* Compact 2-Column Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 ml-1 mb-1 block">Phone *</label>
                    <input
                      type="tel" id="phone" name="phone"
                      value={formData.phone} onChange={handleChange}
                      className={cn('input rounded-xl bg-neutral-50 text-sm py-2.5', errors.phone && 'input-error bg-red-50')}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 ml-1 mb-1 block">Location *</label>
                    <input
                      type="text" id="location" name="location"
                      value={formData.location} onChange={handleChange}
                      className={cn('input rounded-xl bg-neutral-50 text-sm py-2.5', errors.location && 'input-error bg-red-50')}
                      placeholder="Hyderabad"
                    />
                  </div>
                </div>

                {/* Compact 2-Column Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="projectType" className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 ml-1 mb-1 block">Project Type *</label>
                    <select
                      id="projectType" name="projectType"
                      value={formData.projectType} onChange={handleChange}
                      className={cn('input rounded-xl bg-neutral-50 text-sm py-2.5', errors.projectType && 'input-error bg-red-50')}
                    >
                      <option value="">Select type</option>
                      {projectTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 ml-1 mb-1 block">Budget (Optional)</label>
                    <select
                      id="budget" name="budget"
                      value={formData.budget} onChange={handleChange}
                      className="input rounded-xl bg-neutral-50 text-sm py-2.5"
                    >
                      <option value="">Select range</option>
                      {budgetRanges.map(range => <option key={range} value={range}>{range}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message Field (Reduced height) */}
                <div>
                  <label htmlFor="message" className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 ml-1 mb-1 block">Project Details *</label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    rows={3} // Reduced from 5 to 3 to keep it compact
                    className={cn('input rounded-xl bg-neutral-50 text-sm py-3 resize-none', errors.message && 'input-error bg-red-50')}
                    placeholder="Tell us a bit about what you're looking for..."
                  />
                </div>

                {status === 'error' && (
                  <motion.div
                    className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100"
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  variant={experience.accentColor === 'clay' ? 'primary' : 'primary-construction'}
                  size="lg"
                  className="w-full rounded-full mt-2 shadow-md hover:shadow-lg transition-shadow"
                  isLoading={status === 'submitting'}
                >
                  Send Message
                </Button>
              </form>
            </ModalBody>

            {/* Cute, compact pill-shaped footer */}
            <ModalFooter className="bg-neutral-50/50 border-t border-neutral-100/50 py-5">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`tel:${experience.footer.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full text-[11px] font-medium text-neutral-600 hover:border-gold hover:text-gold transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Us
                </a>

                <a
                  href={`mailto:${experience.footer.email}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full text-[11px] font-medium text-neutral-600 hover:border-gold hover:text-gold transition-colors shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>

                {experience.footer.mapsUrl && (
                  <a
                    href={experience.footer.mapsUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full text-[11px] font-medium text-neutral-600 hover:border-gold hover:text-gold transition-colors shadow-sm"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Location
                  </a>
                )}

                {/* {linkedInUrl && (
                  <a
                    href={linkedInUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full text-[11px] font-medium text-neutral-600 hover:border-gold hover:text-gold transition-colors shadow-sm"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                )} */}
              </div>
            </ModalFooter>
          </>
        )}
      </AnimatePresence>
    </Modal>
  );
}