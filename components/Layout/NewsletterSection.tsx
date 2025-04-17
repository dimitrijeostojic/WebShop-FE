import React from "react";

const NewsletterSection = () => {
  return (
    <section className="bg-violet-100 py-10 px-6 rounded-xl text-center mb-16">
      <h2 className="text-2xl font-semibold mb-2">
        Prijavite se na naš newsletter
      </h2>
      <p className="mb-4 text-gray-700">
        Budite prvi koji će saznati o popustima, novim proizvodima i posebnim
        ponudama!
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <input
          type="email"
          placeholder="Unesite vaš email"
          className="px-4 py-2 rounded border border-gray-300 w-full sm:w-1/3"
        />
        <button className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-500">
          Prijavi se
        </button>
      </div>
    </section>
  );
};

export default NewsletterSection;
