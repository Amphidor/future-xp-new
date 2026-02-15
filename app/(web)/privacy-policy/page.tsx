// app/privacy/page.tsx
"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PrivacyPage() {


  const [policy, setPolicy] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  // ----------------------------------------------------
  // Fetch Privacy Policy (load once)
  // ----------------------------------------------------
  const fetchPolicy = async () => {
    try {
      const res = await axios.get("/api/setting/privacy-policy");

      if (res.data.data) {
        setPolicy(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load privacy policy");
    }
  };

  useEffect(() => {
    fetchPolicy();
  }, []);

  return (
    <main className="bg-gray-50">
      {/* Hero / Header Section */}
      <section className="py-10 md:py-14">
        <div className="w-full mx-auto text-center px-4 max-w-[1400px] mx-auto ">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-left">
            Privacy Policy
          </h1>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
            Future XP may collect personal and non-personal information when users visit or interact with our website.
            This may include names, email addresses, contact details, device information, IP addresses, browser types,
            and usage data. Information is collected to improve platform functionality, enhance user experience, and
            deliver relevant services.
          </p>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
            The information collected by Future XP is used to operate, maintain, and improve our website and services.
            We may use data to communicate with users, provide support, personalize content, analyze usage trends, and
            ensure platform security. Data is never used for unlawful or unauthorized purposes.
          </p>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
            Future XP uses cookies and similar tracking technologies to enhance website performance and user experience.
            Cookies help us understand user preferences, monitor traffic patterns, and optimize content delivery. Users
            can control or disable cookies through their browser settings, though some features may be affected.
          </p>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
            Future XP does not sell, rent, or trade personal information to third parties. We may share data with trusted
            service providers who assist in website operations, analytics, or communication, subject to strict confidentiality
            obligations. Information may also be disclosed if required by law or legal process.
          </p>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
            Users have the right to access, update, correct, or request deletion of their personal information, subject to
            applicable laws. You may also choose to opt out of certain communications or data processing activities. Requests
            can be made through the contact details provided on the website.
          </p>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
            The Future XP website may integrate third-party tools, plugins, or services to enhance functionality.
            These third parties operate under their own privacy policies, and Future XP is not responsible for their
            data handling practices. Users are encouraged to review third-party privacy terms independently.
          </p>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left mb-8">
            Future XP retains user information only for as long as necessary to fulfill the purposes outlined in this
            Privacy Policy, comply with legal obligations, or resolve disputes. When data is no longer required, it
            is securely deleted or anonymized in accordance with industry standards.
          </p>

          <p className="text-[14px] font-medium !leading-[1.8] text-[#7f7f7f] text-left">
            Future XP does not knowingly collect personal information from children under the age required by applicable
            law. If such information is discovered, we will take appropriate steps to delete it promptly. Parents
            or guardians may contact us if they believe a child has shared personal data.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-12">
        <div className="w-full mx-auto px-4 space-y-8">
          <article className="p-5 md:p-8 space-y-5 text-sm md:text-base text-gray-700 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: policy.description }}></div>
          </article>
        </div>
      </section>
    </main>
  );
}
