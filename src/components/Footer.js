// src/components/Footer.js
import React from 'react';
import { Footer as FlowbiteFooter } from 'flowbite-react';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from 'react-icons/bs';

const Footer = () => {
  return (
    <FlowbiteFooter container className="bg-gray-900 text-white py-4">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="mb-4">
            <FlowbiteFooter.Brand
              href="#"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Streaming App Logo"
              name="StreamFlix"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FlowbiteFooter.Title title="About" />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link href="#">About Us</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#">Features</FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
            <div>
              <FlowbiteFooter.Title title="Legal" />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link href="#">Privacy Policy</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#">Terms & Conditions</FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
            <div>
              <FlowbiteFooter.Title title="Help" />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link href="#">Support</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#">Contact Us</FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
          </div>
        </div>
        <FlowbiteFooter.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FlowbiteFooter.Copyright href="#" by="StreamFlix™" year={2023} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FlowbiteFooter.Icon href="#" icon={BsFacebook} />
            <FlowbiteFooter.Icon href="#" icon={BsInstagram} />
            <FlowbiteFooter.Icon href="#" icon={BsTwitter} />
            <FlowbiteFooter.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </FlowbiteFooter>
  );
};

export default Footer;