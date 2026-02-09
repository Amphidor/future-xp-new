"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function WebviewTermsPage() {
  const [terms, setTerms] = useState<any>([]);
  const fetchTerms = async () => {
    try {
      const res = await axios.get("/api/setting/terms-conditions");

      if (res.data.data) {
        setTerms(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load Terms & Conditions");
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero / Header Section */}
      <section className="py-10 md:py-14">
        <div className="w-full mx-auto text-center px-4 max-w-[1400px] mx-auto ">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-left">
            Term & Condition
          </h1>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
            By accessing or using the Future XP website, you agree to comply with and be bound by
            these Terms and Conditions. Future XP provides information, services, and digital
            experiences for general informational and professional use only. All content available
            on this website, including text, graphics, logos, features, and software, is the property
            of Future XP and is protected by applicable intellectual property laws. Users agree not
            to misuse the platform, attempt unauthorized access, disrupt services, or use the website
            for any unlawful activities. Future XP reserves the right to modify, suspend, or discontinue
            any part of the website or services at any time without prior notice. We are not responsible
            for any direct or indirect damages arising from the use or inability to use the website.
            Continued use of the website after updates to these terms constitutes acceptance of the
            revised Terms and Conditions.
          </p>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
            By using the Future XP website, you acknowledge that you have read, understood, and
            agreed to these Terms and Conditions. The website is intended for lawful use only,
            and users must ensure that their activities do not violate any applicable laws or
            regulations. Unauthorized use of the platform, including data scraping, system interference,
            or misuse of content, is strictly prohibited and may result in restricted access or legal action.
          </p>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
            All content published on the Future XP website, including but not limited to designs,
            text, images, videos, features, and interactive experiences, is owned by or licensed
            to Future XP. Users may view or use the content for personal or internal business
            purposes only. Reproduction, redistribution, modification, or commercial use of any
            content without prior written consent from Future XP is not permitted.
          </p>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
            Future XP strives to ensure uninterrupted access to its services; however, we do not
            guarantee that the website will always be available, secure, or error-free. We reserve
            the right to update, enhance, modify, or discontinue any feature or service at our sole
            discretion, with or without notice. Future XP shall not be held liable for any loss or
            inconvenience caused by service interruptions or changes.  
          </p>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
            Future XP provides its website and services on an “as-is” and “as-available” basis.
            We make no warranties regarding accuracy, reliability, or suitability of the content
            or services. To the fullest extent permitted by law, Future XP shall not be liable
            for any direct, indirect, incidental, or consequential damages arising from the use
            of or reliance on the website, even if advised of the possibility of such damages.
          </p>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
            Users are responsible for maintaining the confidentiality of their account information,
            if applicable, and for all activities conducted through their access to the Future XP
            website. You agree to provide accurate and up-to-date information and not to impersonate
            any individual or entity. Any misuse of the platform that compromises security, performance,
            or user trust may result in immediate suspension or termination of access.
          </p>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
           The Future XP website may contain links to third-party websites or services for user
           convenience. Future XP does not control, endorse, or assume responsibility for the
           content, policies, or practices of any third-party platforms. Accessing third-party
           services is at your own risk, and users are encouraged to review the terms and
           privacy policies of those external websites.
          </p>


        </div>
      </section>

      <article className="p-5 md:p-8 space-y-5 text-sm md:text-base text-gray-700 leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: terms.description }}></div>
      </article>
    </main>
  );
}
