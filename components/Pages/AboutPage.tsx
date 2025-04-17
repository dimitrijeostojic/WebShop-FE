"use client";
import React from "react";
import AboutSection from "@/components/Layout/AboutSection";
import FeatureList from "@/components/Layout/FeatureList";
import ContactInfo from "@/components/Forms/ContactInfo";

const AboutPage = () => {
  return (
    <div className="pt-24 pb-12 px-6 md:px-20 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-violet-600">O nama</h1>

      <AboutSection text="Dobrodošli na WebShop – mesto gde vaši ljubimci dobijaju pažnju koju zaslužuju! Naša misija je da vam pružimo kvalitetne proizvode i sjajno korisničko iskustvo kroz jednostavnu i pouzdanu online prodavnicu." />
      <AboutSection text="Bilo da tražite hranu, opremu ili igračke – mi imamo sve na jednom mestu. Naš tim redovno bira najbolje proizvode kako biste vi mogli da kupujete bez brige." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div>
          <AboutSection title="Zašto izabrati nas?" text="" />
          <FeatureList />
        </div>
        <div>
          <AboutSection title="Kontakt informacije" text="" />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
