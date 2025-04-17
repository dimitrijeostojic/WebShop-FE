import Link from "next/link";
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-violet-600 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between gap-8">
        {/* Brand & Social */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">WebShop</h2>
          <p className="text-sm">
            Kupujte sa stilom. <br /> Sve za vaše ljubimce na jednom mestu!
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-gray-200">
              <FaFacebookF />
            </Link>
            <Link href="#" className="hover:text-gray-200">
              <FaInstagram />
            </Link>
            <Link href="#" className="hover:text-gray-200">
              <FaGithub />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Linkovi</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="mailto:support@webshop.com" className="hover:underline">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Informacije</h3>
          <p className="text-sm">
            📍 Beograd, Srbija <br />
            🕒 Pon - Pet: 9:00 - 18:00 <br />
            📞 +381 11 123 4567
          </p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-200 py-4 border-t border-violet-500">
        &copy; {new Date().getFullYear()} WebShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
