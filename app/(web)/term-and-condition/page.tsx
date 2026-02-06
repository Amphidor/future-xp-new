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
      <section className="bg-gradient-to-r from-primary-600 to-primary-600 text-white py-10 md:py-14">
        <div className="w-full mx-auto text-center px-4">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">
            { terms?.title}
          </h1>

          <p className="text-sm md:text-base text-indigo-100 max-w-2xl mx-auto">
            Please read these terms carefully before using Germanfy. By
            accessing or using our app, you agree to the terms below.
          </p>
        </div>
      </section>

      <article className="p-5 md:p-8 space-y-5 text-sm md:text-base text-gray-700 leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: terms.description }}></div>
      </article>
    </main>
  );
}
