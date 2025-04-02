"use client";
import React from "react";

const AboutPage = () => {
  return (
    <div className="pt-24 pb-12 px-6 md:px-20 max-w-5xl mx-auto text-gray-800">
      <div className="header-about">
        <h1 className="text-3xl font-bold mb-6 text-violet-600">O nama</h1>
      </div>

      <div className="about-description">
        <p className="mb-4 text-lg leading-relaxed">
          Dobrodošli na <span className="font-semibold">WebShop</span> – mesto
          gde vaši ljubimci dobijaju pažnju koju zaslužuju! Naša misija je da
          vam pružimo kvalitetne proizvode i sjajno korisničko iskustvo kroz
          jednostavnu i pouzdanu online prodavnicu.
        </p>
      </div>

      <div className="about-description2">
        <p className="mb-4 text-lg leading-relaxed">
          Bilo da tražite hranu, opremu ili igračke – mi imamo sve na jednom
          mestu. Naš tim redovno bira najbolje proizvode kako biste vi mogli da
          kupujete bez brige.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="about-left">
          <div className="about-left-header">
            <h2 className="text-2xl font-semibold text-violet-500 mb-3">
              Zašto izabrati nas?
            </h2>
          </div>
          <div className="about-left-list">
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>✅ Brza i sigurna dostava</li>
              <li>✅ Kvalitetni proizvodi i provereni brendovi</li>
              <li>✅ Ljubazna korisnička podrška</li>
              <li>✅ Laka i brza kupovina online</li>
            </ul>
          </div>
        </div>

        <div className="about-right">
          <div className="about-right-header">
            <h2 className="text-2xl font-semibold text-violet-500 mb-3">
              Kontakt informacije
            </h2>
          </div>
          <div className="about-right-contact">
            <p className="text-base">
              📍 Beograd, Srbija <br />
              📞 +381 11 123 4567 <br />
              📧 webshop@support.rs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
