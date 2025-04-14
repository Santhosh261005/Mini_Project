// src/pages/AboutUs.jsx
import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 to-lime-200 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-lime-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">About Campus Connect</h1>
          <p className="mt-2 text-emerald-100">Empowering Students. Enriching Communities.</p>
        </div>

        <div className="p-6 space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-600">Our Mission</h2>
            <p className="text-gray-600">
              Campus Connect is a socially-driven initiative designed to bridge the gap between students
              with unused resources and communities in need. We believe in the power of small actions —
              like donating a book or a shirt — to create a meaningful impact on someone's life.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-600">What We Do</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Enable students to donate unused books and clothes easily through the platform</li>
              <li>Track the journey of each donated item to ensure transparency and trust</li>
              <li>Reward students with points for their donations</li>
              <li>Connect campuses with nearby NGOs, orphanages, and shelters</li>
              <li>Promote a culture of giving and sustainability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-600">Meet the Founders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-700">Santhosh Reddy</h3>
                <p className="text-gray-600 mt-1">
                  A visionary developer with a heart for social good, dedicated to using
                  technology to bring real change to communities.
                </p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-700">Rithwik Mohan</h3>
                <p className="text-gray-600 mt-1">
                  Brings creativity and strategic thinking to make generosity
                  a part of student life through Campus Connect.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-600">Contact Us</h2>
            <p className="text-gray-600">📞 Phone: <span className="font-medium">8019853653</span></p>
            <p className="text-gray-600">📧 Email: <span className="font-medium">rizwik475@gmail.com</span></p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
