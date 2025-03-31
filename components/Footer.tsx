import Link from "next/link";
import {
    FaFacebookF,
    FaInstagram,
    FaGithub,
  } from "react-icons/fa";
  
  const Footer = () => {
    return (
      <footer className="bg-violet-600 text-white pt-5">
        <div className="container mx-auto flex justify-between">
  
          {/* Left: Brand & Social */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">WebShop</h2>
            <p className="text-sm">Kupujte sa stilom. <br /> Sve za vaše ljubimce na jednom mestu!</p>
            <div className="flex space-x-4 mt-2">
              <Link href="#" className="hover:text-gray-200"><FaFacebookF /></Link>
              <Link href="#" className="hover:text-gray-200"><FaInstagram /></Link>
              <Link href="#" className="hover:text-gray-200"><FaGithub /></Link>
            </div>
          </div>
  
          {/* Center: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Linkovi</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:underline">Terms of Service</Link></li>
              <li><Link href="mailto:support@webshop.com" className="hover:underline">Kontakt</Link></li>
            </ul>
          </div>
  
          {/* Right: Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Informacije</h3>
            <p className="text-sm">
              📍 Beograd, Srbija <br />
              🕒 Pon - Pet: 9:00 - 18:00 <br />
              📞 +381 11 123 4567
            </p>
          </div>
  
        </div>
  
        <div className="mt-7 pb-5 text-center text-sm text-gray-200">
          &copy; {new Date().getFullYear()} WebShop. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  