import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="flex absolute w-full bg-blueColor _3d text-white py-6 bottom-0">
      <div className="container mx-auto px-4 flex flex-col w-1/3 md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <ul className="flex flex-col px-4">
            <li>
              <Link href="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gray-400">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex space-x-4 text-xl w-1/3">
          <Link href="https://facebook.com" aria-label="Facebook">
            <FaFacebook className="hover:text-gray-400" />
          </Link>
          <Link href="https://twitter.com" aria-label="Twitter">
            <FaTwitter className="hover:text-gray-400" />
          </Link>
          <Link href="https://instagram.com" aria-label="Instagram">
            <FaInstagram className="hover:text-gray-400" />
          </Link>
          <Link href="https://linkedin.com" aria-label="LinkedIn">
            <FaLinkedin className="hover:text-gray-400" />
          </Link>
        </div>
        <div className="mt-4 md:mt-0 w-1/3">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} 3dverse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
