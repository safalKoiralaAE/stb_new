// src/components/Footer.js
import React from 'react';
import { Footer as FlowbiteFooter } from 'flowbite-react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import SocialMediaButtons from './SocialMediaButtons';
import LanguageSelector from './LanguageSelector';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FlowbiteFooter container className="bg-gray-900 text-white">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="mb-6">
            <FlowbiteFooter.Brand
              href="/"
              src="/logo.png"
              alt="StreamFlix Logo"
              name="StreamFlix"
            />
            <p className="mt-2 text-sm text-gray-400">
              Your ultimate streaming destination for the best movies and series.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FlowbiteFooter.Title title="About" className="text-white" />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link href="#" className="text-gray-400 hover:text-white">About Us</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#" className="text-gray-400 hover:text-white">Careers</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#" className="text-gray-400 hover:text-white">Press</FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
            <div>
              <FlowbiteFooter.Title title="Support" className="text-white" />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link href="#" className="text-gray-400 hover:text-white">Help Center</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#" className="text-gray-400 hover:text-white">Contact Us</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#" className="text-gray-400 hover:text-white">FAQ</FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
            <div>
              <FlowbiteFooter.Title title="Legal" className="text-white" />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#" className="text-gray-400 hover:text-white">Terms of Service</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#" className="text-gray-400 hover:text-white">Cookie Policy</FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t border-gray-700 pt-8">
          <FlowbiteFooter.Copyright 
            by="StreamFlix™" 
            year={currentYear} 
            className="text-gray-400"
          />
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <LanguageSelector />
            <div className="flex mt-4 space-x-6 sm:mt-0">
              <FaFacebook className="text-gray-400 hover:text-white cursor-pointer" />
              <FaTwitter className="text-gray-400 hover:text-white cursor-pointer" />
              <FaInstagram className="text-gray-400 hover:text-white cursor-pointer" />
              <FaYoutube className="text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </FlowbiteFooter>
  );
};

export default Footer;