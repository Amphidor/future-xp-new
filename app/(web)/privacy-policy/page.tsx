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
        <section className="bg-gradient-to-r from-primary-600 to-primary-600 text-white py-10 md:py-14">
          <div className="w-full mx-auto text-center px-4">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-center">
              { policy?.title}
            </h1>
  
            <p className="text-sm md:text-base text-indigo-100 max-w-2xl mx-auto text-center">
              This Privacy Policy explains how Germanfy collects, uses, and protects
              your personal data when you use the app.
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
  