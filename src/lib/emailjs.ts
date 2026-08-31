import emailjs from '@emailjs/browser';

interface EmailTemplateParams extends Record<string, unknown> {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  budget: string;
  message: string;
  source: string;
}

export const sendContactEmail = async (params: EmailTemplateParams): Promise<void> => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error('EmailJS environment variables are missing');
    // If running in development and lacking config, resolve to allow UI to proceed
    if (process.env.NODE_ENV === 'development') {
      console.warn('Development mode: Simulating email send');
      return new Promise(resolve => setTimeout(resolve, 1500));
    }
    throw new Error('EmailJS configuration missing');
  }

  try {
    await emailjs.send(serviceId, templateId, params, publicKey);
  } catch (error) {
    console.error('EmailJS error:', error);
    throw error;
  }
};
