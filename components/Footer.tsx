import Link from "next/link";
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-violet-600 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-row justify-between">
        {/* Left: Brand & Social */}
        <div className="space-y-4">
          <div className="brand-social-header">
            <h2 className="text-xl font-semibold">WebShop</h2>
          </div>
          <div>
            <p className="text-sm">
              Kupujte sa stilom. <br /> Sve za vaše ljubimce na jednom mestu!
            </p>
          </div>
          <div className="flex space-x-4 mt-2">
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

        {/* Center: Quick Links */}
        <div className="space-y-3">
          <div className="quick-links-header">
            <h3 className="text-lg font-medium">Linkovi</h3>
          </div>
          <div className="quick-links-content">
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
                <Link
                  href="mailto:support@webshop.com"
                  className="hover:underline"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-3 flex flex-col items-right">
          <div className="info-header">
            <h3 className="text-lg font-medium">Informacije</h3>
          </div>
          <div className="info-content">
            <p className="text-sm">
              📍 Beograd, Srbija <br />
              🕒 Pon - Pet: 9:00 - 18:00 <br />
              📞 +381 11 123 4567
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-200 py-4 border-t border-violet-500">
        &copy; {new Date().getFullYear()} WebShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
