import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | RWAi',
  description: 'The terms and conditions that govern your use of RWAi services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-lg mb-6">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
        <p>
          These Terms of Service ("Terms") constitute a legally binding agreement between you and RWAi ("we," "our," or "us") governing your access to and use of the RWAi website, services, and platform (collectively, the "Services").
        </p>
        <p>
          By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by updating the date at the top of these Terms and, in some cases, provide additional notice (such as adding a statement to our website or sending an email notification). Your continued use of the Services after we make changes indicates your acceptance of the updated Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Eligibility</h2>
        <p>
          To use our Services, you must be at least 18 years old and have the legal capacity to enter into a binding agreement. By using our Services, you represent and warrant that you meet these requirements.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Account Registration and Security</h2>
        <p>
          To access certain features of our Services, you may need to register for an account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated.
        </p>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
        </p>
        <p>
          We reserve the right to suspend or terminate your account if any information provided during registration or thereafter proves to be inaccurate, false, or misleading, or if you violate any term of these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Services and Subscription</h2>
        <h3 className="text-xl font-medium mt-6 mb-3">5.1 Description of Services</h3>
        <p>
          RWAi provides a platform that enables users to access, operate, and potentially earn income from AI computing resources. The specific features and functionalities available through our Services may change from time to time.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">5.2 Subscription and Billing</h3>
        <p>
          Some aspects of our Services may require a subscription or payment. If you choose a paid subscription, you agree to pay all fees in accordance with the pricing and payment terms presented to you. All payments are non-refundable unless otherwise specified.
        </p>
        <p>
          We may change our fees and payment structure at any time. We will provide notice of such changes in advance. Your continued use of the Services after the fee change becomes effective constitutes your agreement to pay the modified fee amount.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Tokenized Assets</h2>
        <p>
          Our platform may involve the use of digital tokens or other blockchain-based assets. By using these features, you acknowledge and agree to the following:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>The legal status of digital tokens and crypto assets may be uncertain and subject to regulatory changes.</li>
          <li>The value of digital tokens can be highly volatile and may fluctuate significantly.</li>
          <li>Transactions on blockchain networks are generally irreversible.</li>
          <li>You are solely responsible for the security of your digital wallets and private keys.</li>
          <li>We do not guarantee any returns or income from the ownership or use of tokenized assets on our platform.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. User Conduct</h2>
        <p>
          You agree not to engage in any of the following prohibited activities:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Violating any applicable laws, regulations, or third-party rights</li>
          <li>Using the Services for any illegal or unauthorized purpose</li>
          <li>Attempting to interfere with, compromise, or disrupt the Services</li>
          <li>Circumventing measures designed to prevent or restrict access to the Services</li>
          <li>Harassing, threatening, or intimidating other users</li>
          <li>Impersonating any person or entity</li>
          <li>Using the Services to transmit any malware, spyware, or other harmful code</li>
          <li>Engaging in any activity that could disable, overburden, or impair the proper working of the Services</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Intellectual Property Rights</h2>
        <p>
          The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by RWAi, its licensors, or other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
        </p>
        <p>
          These Terms do not grant you any right, title, or interest in the Services, content, or our trademarks, logos, or other proprietary information. Any use of the Services not expressly permitted by these Terms is a breach of these Terms and may violate copyright, trademark, and other laws.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. User Content</h2>
        <p>
          You retain ownership of any content you submit to the Services ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such User Content in connection with providing and promoting the Services.
        </p>
        <p>
          You represent and warrant that your User Content does not violate third-party rights and that you have all necessary rights to grant us the license described above.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Disclaimer of Warranties</h2>
        <p className="font-semibold">
          THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>
          We do not warrant that the Services will be uninterrupted, secure, or error-free, that defects will be corrected, or that the Services or the servers that make them available are free of viruses or other harmful components.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Limitation of Liability</h2>
        <p className="font-semibold">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL RWAi, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES;</li>
          <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES;</li>
          <li>ANY CONTENT OBTAINED FROM THE SERVICES; AND</li>
          <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT,</li>
        </ul>
        <p className="font-semibold">
          WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">12. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless RWAi and its officers, directors, employees, agents, licensors, and suppliers from and against all losses, expenses, damages, and costs, including reasonable attorneys' fees, resulting from any violation of these Terms or any activity related to your account (including negligent or wrongful conduct) by you or any other person accessing the Services using your account.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">13. Governing Law and Jurisdiction</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which RWAi is established, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located within this jurisdiction.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">14. Termination</h2>
        <p>
          We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason, including but not limited to a breach of these Terms. Upon termination, your right to use the Services will immediately cease.
        </p>
        <p>
          All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">15. Miscellaneous</h2>
        <p>
          These Terms, together with our Privacy Policy, constitute the entire agreement between you and RWAi regarding your use of the Services and supersede all prior agreements and understandings.
        </p>
        <p>
          Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">16. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="mt-2">
          <strong>Email:</strong> legal@rwai.xyz
        </p>
      </div>
    </div>
  );
} 