<script setup lang="ts">
useHead({
  title: 'Privacy Policy',
})

useSeoMeta({
  description: 'uGrant Privacy Policy - how we collect, use, and protect your personal data when you use our energy grant eligibility service.',
  ogTitle: 'Privacy Policy | uGrant',
  ogDescription: 'How uGrant collects, uses, and protects your personal data.',
})

const lastUpdated = '25 November 2024'
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="py-12 md:py-16 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Privacy Policy
          </h1>
          <p class="text-neutral-600">
            Last updated: {{ lastUpdated }}
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12 md:py-16 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl prose prose-lg prose-neutral">
          <h2>1. Introduction</h2>
          <p>
            uGrant ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
          <p>
            Please read this privacy policy carefully. By using our services, you consent to the practices described in this policy.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide when using our eligibility checker or contact forms, including:</p>
          <ul>
            <li>Name and contact details (email address, phone number)</li>
            <li>Property address and postcode</li>
            <li>Property type, tenure, and heating system details</li>
            <li>Information about benefits you receive</li>
            <li>Household income information (broad bands only)</li>
            <li>EPC rating and related property data</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website</li>
            <li>Device type</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li><strong>Eligibility Assessment:</strong> To determine which energy efficiency schemes you may qualify for</li>
            <li><strong>Installer Connection:</strong> To share your details with approved installers when you request contact (with your explicit consent)</li>
            <li><strong>Communication:</strong> To respond to your enquiries and provide customer support</li>
            <li><strong>Service Improvement:</strong> To analyse usage patterns and improve our website and services</li>
            <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
          </ul>

          <h2>4. Legal Basis for Processing</h2>
          <p>We process your personal data on the following legal bases:</p>
          <ul>
            <li><strong>Consent:</strong> Where you have given clear consent for us to process your personal data for a specific purpose</li>
            <li><strong>Contract:</strong> Where processing is necessary for a contract we have with you</li>
            <li><strong>Legitimate Interests:</strong> Where processing is necessary for our legitimate interests and does not override your rights</li>
            <li><strong>Legal Obligation:</strong> Where processing is necessary to comply with the law</li>
          </ul>

          <h2>5. Sharing Your Information</h2>
          <h3>5.1 Installer Partners</h3>
          <p>
            If you complete our eligibility checker and request to be connected with installers, we will share your contact details and property information with approved installer partners who can provide the relevant services in your area.
          </p>

          <h3>5.2 Third-Party Service Providers</h3>
          <p>We may share information with third-party service providers who assist us in operating our website and services, including:</p>
          <ul>
            <li>Website hosting providers</li>
            <li>Analytics services</li>
            <li>Email service providers</li>
            <li>Customer relationship management systems</li>
          </ul>
          <p>These providers are contractually obligated to protect your information and use it only for the services they provide to us.</p>

          <h3>5.3 Legal Requirements</h3>
          <p>We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to protect our rights or the safety of others.</p>

          <h2>6. EPC Data</h2>
          <p>
            We use the publicly available Energy Performance Certificate (EPC) Register API to look up EPC information for properties. This data is published by the UK Government and helps us assess eligibility for energy efficiency schemes. The EPC data we access includes property characteristics, energy ratings, and improvement recommendations.
          </p>

          <h2>7. Data Security</h2>
          <p>
            We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include:
          </p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Secure hosting infrastructure</li>
            <li>Access controls and authentication</li>
            <li>Regular security assessments</li>
            <li>Staff training on data protection</li>
          </ul>

          <h2>8. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements.
          </p>
          <ul>
            <li><strong>Eligibility Check Data:</strong> Retained for 3 years to support any subsequent applications or enquiries</li>
            <li><strong>Lead Data:</strong> Retained for 6 years for legal and accounting purposes</li>
            <li><strong>Contact Enquiries:</strong> Retained for 2 years</li>
          </ul>

          <h2>9. Your Rights</h2>
          <p>Under UK data protection law, you have the following rights:</p>
          <ul>
            <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data in certain circumstances</li>
            <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your data</li>
            <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service</li>
            <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at <a href="mailto:privacy@ugrant.co.uk">privacy@ugrant.co.uk</a>.
          </p>

          <h2>10. Cookies</h2>
          <p>
            Our website uses cookies and similar tracking technologies. Cookies are small text files stored on your device that help us provide and improve our services.
          </p>
          <h3>Types of Cookies We Use:</h3>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          </ul>
          <p>
            You can control cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.
          </p>

          <h2>11. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
          </p>

          <h2>12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website with a new "Last Updated" date.
          </p>

          <h2>13. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
          <ul>
            <li>Email: <a href="mailto:privacy@ugrant.co.uk">privacy@ugrant.co.uk</a></li>
            <li>Phone: 0800 123 4567</li>
            <li>Post: uGrant Data Protection, [Address to be added]</li>
          </ul>

          <h2>14. Complaints</h2>
          <p>
            If you are not satisfied with how we handle your personal data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO):
          </p>
          <ul>
            <li>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a></li>
            <li>Phone: 0303 123 1113</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.prose h2 {
  @apply text-2xl font-bold text-neutral-900 mt-12 mb-4;
}
.prose h3 {
  @apply text-xl font-semibold text-neutral-900 mt-8 mb-3;
}
.prose p {
  @apply text-neutral-700 mb-4;
}
.prose ul {
  @apply list-disc pl-6 mb-4 space-y-2;
}
.prose li {
  @apply text-neutral-700;
}
.prose a {
  @apply text-primary-700 hover:underline;
}
.prose strong {
  @apply font-semibold text-neutral-900;
}
</style>
