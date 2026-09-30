import type { Metadata } from 'next';
import { interiorsConfig } from '@/data/interiors/config';

export const metadata: Metadata = {
  title: "Privacy Policy | GridHome Interiors",
  description: "Read the Privacy Policy of GridHome Interiors to understand how we collect, use, and protect your personal information.",
  alternates: {
    canonical: 'https://gridhomes.in/privacy-policy'
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-md mx-auto px-6 py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 md:mb-24 text-center md:text-left">
          <p className="font-mono text-sm tracking-[0.2em] text-gold uppercase mb-6">Legal</p>
          <h1 className="font-display text-4xl md:text-6xl text-primary mb-6">
            Privacy Policy
          </h1>
          <p className="font-sans text-lg md:text-xl text-primary/70 leading-relaxed max-w-2xl mb-8">
            Your privacy matters to us. Learn how GridHome Interiors collects, uses, and protects your information.
          </p>
          <p className="font-mono text-sm text-primary/60">
            Effective Date: September 30, 2026
          </p>
        </header>

        {/* Content Section */}
        <article className="prose prose-lg prose-neutral max-w-none font-sans text-primary/80 space-y-12">
          
          <section>
            <p className="leading-relaxed">
              At GridHome Interiors, we respect your privacy and are committed to protecting the personal information you share with us through our website, enquiry forms, and other communication channels.
            </p>
            <p className="leading-relaxed mt-4">
              This Privacy Policy explains how we collect, use, store, and protect your information when you visit or interact with our website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-primary mb-6">1. Information We Collect</h2>
            <p className="mb-4">When you interact with our website, we may collect the following information:</p>
            
            <h3 className="font-semibold text-xl text-primary mb-3">Personal Information</h3>
            <p className="mb-3">You may voluntarily provide information such as:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Location or project address</li>
              <li>Project requirements</li>
              <li>Preferred budget</li>
              <li>Interior design or construction requirements</li>
              <li>Any other information you provide through our enquiry or contact forms</li>
            </ul>

            <h3 className="font-semibold text-xl text-primary mb-3">Automatically Collected Information</h3>
            <p className="mb-3">When you visit our website, certain technical information may be collected automatically, including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Time spent on the website</li>
              <li>Referring website</li>
              <li>General website usage information</li>
            </ul>
            <p>This information helps us understand how visitors use our website and improve our services.</p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-primary mb-6">2. How We Use Your Information</h2>
            <p className="mb-4">We may use the information collected from you to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Respond to your enquiries and requests</li>
              <li>Contact you regarding your interior design or construction requirements</li>
              <li>Provide quotations and project-related information</li>
              <li>Schedule consultations or site visits</li>
              <li>Understand your project requirements</li>
              <li>Provide and improve our services</li>
              <li>Improve our website and user experience</li>
              <li>Send service-related communications</li>
              <li>Maintain website security and prevent fraudulent or unauthorized activity</li>
              <li>Comply with applicable legal and regulatory requirements</li>
            </ul>
            <p>
              We will not use your personal information for purposes unrelated to the services or communication you have requested without a lawful basis or your consent where required.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-primary mb-6">3. Enquiry and Contact Forms</h2>
            <p className="mb-4">
              When you submit an enquiry through our website, the information you provide may be forwarded to the GridHome Interiors team for the purpose of responding to your request.
            </p>
            <p className="mb-4">By submitting a form, you acknowledge that GridHome Interiors may contact you through:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Phone calls</li>
              <li>Email</li>
              <li>WhatsApp</li>
              <li>SMS or other relevant communication channels</li>
            </ul>
            <p>You may request that we stop contacting you at any time.</p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-primary mb-6">4. Cookies</h2>
            <p className="mb-4">
              Our website may use cookies and similar technologies to improve functionality, understand website usage, and provide a better browsing experience.
            </p>
            <p className="mb-4">Cookies may be used to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Remember preferences</li>
              <li>Understand visitor activity</li>
              <li>Analyze website performance</li>
              <li>Improve website functionality</li>
              <li>Measure marketing and advertising performance, where applicable</li>
            </ul>
            <p>
              You can control or disable cookies through your browser settings. Disabling certain cookies may affect some website functionality.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-primary mb-6">5. Third-Party Services</h2>
            <p className="mb-4">
              We may use third-party services to operate, maintain, analyze, or improve our website.
            </p>
            <p className="mb-4">These services may include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Website hosting providers</li>
              <li>Analytics services</li>
              <li>Email communication services</li>
              <li>Form submission services</li>
              <li>WhatsApp or communication services</li>
              <li>Security and performance services</li>
            </ul>
            <p className="mb-4">
              These third parties may process information according to their own privacy policies and applicable laws.
            </p>
            <p>We do not sell or rent your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-primary mb-6">6. Data Security</h2>
            <p className="mb-4">
              We take reasonable technical and organizational measures to protect your personal information against unauthorized access, misuse, alteration, disclosure, or destruction.
            </p>
            <p>
              However, no method of transmitting or storing information online can be guaranteed to be completely secure. Therefore, while we take reasonable steps to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-primary mb-6">7. Data Retention</h2>
            <p className="mb-4">
              We retain personal information only for as long as reasonably necessary to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Respond to your enquiry</li>
              <li>Provide requested services</li>
              <li>Maintain business and communication records</li>
              <li>Fulfil legal, accounting, or regulatory requirements</li>
              <li>Resolve disputes or enforce agreements</li>
            </ul>
            <p>
              When information is no longer required, we may securely delete or anonymize it where appropriate.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-primary mb-6">8. Your Privacy Rights</h2>
            <p className="mb-4">
              Depending on applicable law, you may have rights regarding your personal information, including the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Request access to information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information where legally applicable</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Request restrictions on certain uses of your information</li>
              <li>Opt out of promotional communications</li>
            </ul>
            <p>
              To exercise any applicable rights, you can contact us using the details provided below.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-primary mb-6">9. Children's Privacy</h2>
            <p className="mb-4">
              Our website is not specifically directed toward children. We do not knowingly collect personal information from children without appropriate consent where such consent is required by law.
            </p>
            <p>
              If you believe that a child has provided personal information to us, please contact us so that we can take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-primary mb-6">10. External Links</h2>
            <p className="mb-4">
              Our website may contain links to third-party websites, including social media platforms and other external services.
            </p>
            <p>
              GridHome Interiors is not responsible for the privacy practices, content, or security of external websites. We recommend reviewing the privacy policies of those websites before providing them with personal information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-primary mb-6">11. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our services, technology, legal requirements, or business practices.
            </p>
            <p className="mb-4">
              Any updated version will be published on this page with a revised Effective Date.
            </p>
            <p>
              We encourage you to review this page periodically to stay informed about how we handle your information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-primary mb-6">12. Contact Us</h2>
            <p className="mb-6">
              If you have any questions, concerns, or requests regarding this Privacy Policy or how your personal information is handled, please contact GridHome Interiors.
            </p>
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
              <h3 className="font-display text-2xl text-primary mb-4">GridHome Interiors</h3>
              <ul className="space-y-4">
                <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <span className="font-semibold text-primary min-w-[80px]">Email:</span>
                  <a href={`mailto:${interiorsConfig.footer.email.trim()}`} className="text-gold hover:underline break-all">
                    {interiorsConfig.footer.email.trim()}
                  </a>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <span className="font-semibold text-primary min-w-[80px]">Phone:</span>
                  <a href={`tel:${interiorsConfig.footer.phone.replace(/\s/g, '')}`} className="text-gold hover:underline">
                    {interiorsConfig.footer.phone}
                  </a>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <span className="font-semibold text-primary min-w-[80px]">Location:</span>
                  <span>{interiorsConfig.footer.address}</span>
                </li>
              </ul>
            </div>
            <p className="mt-8 font-mono text-sm text-primary/60">
              Last Updated: September 30, 2026
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
