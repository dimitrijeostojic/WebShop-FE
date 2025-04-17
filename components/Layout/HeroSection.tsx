import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
    <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Dobrodošli u PetShop 🐾</h1>
        <p className="text-lg mb-6 text-gray-700">
          Sve za vaše ljubimce na jednom mestu
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/shop"
            className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-500"
          >
            Shop Now
          </Link>
          <Link
            href="mailto:support@webshop.com"
            className="border border-violet-600 text-violet-600 px-6 py-2 rounded hover:bg-violet-100"
          >
            Contact Us
          </Link>
        </div>
      </section>
  )
}

export default HeroSection