import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | RWAi',
  description: 'Learn how RWAi handles and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-lg mb-6">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>
          RWAi ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
        </p>
        <p>
          Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">2.1 Personal Information</h3>
        <p>
          We may collect personally identifiable information, such as:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Billing address</li>
          <li>Payment information</li>
          <li>Blockchain wallet addresses</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">2.2 Non-Personal Information</h3>
        <p>
          We may also collect non-personal information about how you use our services, including:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Log data (IP address, browser type, pages visited)</li>
          <li>Device information</li>
          <li>Usage patterns and preferences</li>
          <li>Performance data related to AI model usage</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
        <p>
          We may use the information we collect for various purposes, including:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Providing, maintaining, and improving our services</li>
          <li>Processing transactions and sending related information</li>
          <li>Sending administrative messages and updates</li>
          <li>Responding to inquiries and providing customer support</li>
          <li>Sending marketing communications (with your consent)</li>
          <li>Analyzing usage patterns to enhance user experience</li>
          <li>Detecting and preventing fraudulent or unauthorized activities</li>
          <li>Complying with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Information Sharing and Disclosure</h2>
        <p>
          We may share your information in the following situations:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Service Providers:</strong> We may share your information with third-party vendors who provide services on our behalf.</li>
          <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
          <li><strong>Protection of Rights:</strong> We may disclose your information to protect our rights, privacy, safety, or property, and that of our users or others.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights and Choices</h2>
        <p>
          Depending on your location, you may have certain rights regarding your personal information, including:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Accessing, correcting, or deleting your personal information</li>
          <li>Withdrawing consent for processing your information</li>
          <li>Requesting restriction of processing</li>
          <li>Data portability</li>
          <li>Objecting to processing</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the information provided at the end of this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We take appropriate measures to ensure that your personal information remains protected in accordance with this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Children's Privacy</h2>
        <p>
          Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child, we will take steps to delete that information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
        </p>
        <p className="mt-2">
          <strong>Email:</strong> privacy@rwai.xyz
        </p>
      </div>
    </div>
  );
} 