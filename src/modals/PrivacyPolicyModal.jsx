import React from 'react';
import { Modal, Button, Accordion } from 'flowbite-react';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <Modal.Header>
        Privacy Policy
      </Modal.Header>
      <Modal.Body className="overflow-y-auto max-h-[60vh]">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Introduction</h3>
            <p className="text-sm text-gray-700">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application. Please read this Privacy Policy carefully. By using the application, you consent to the practices described in this policy.
            </p>
          </div>

          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>Information We Collect</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-sm text-gray-700">
                  We may collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  <li>Personal identifiers such as name, email address, and phone number</li>
                  <li>Account credentials including username and password</li>
                  <li>Profile information such as profile picture and preferences</li>
                  <li>Any other information you choose to provide</li>
                </ul>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>How We Use Your Information</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-sm text-gray-700">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  <li>Create and maintain your account</li>
                  <li>Provide and personalize our services</li>
                  <li>Communicate with you about updates and new features</li>
                  <li>Improve our application and develop new features</li>
                  <li>Protect against fraud and unauthorized access</li>
                </ul>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>Sharing Your Information</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-sm text-gray-700">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  <li>Service providers who perform services on our behalf</li>
                  <li>Business partners with your consent</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>Data Security</Accordion.Title>
              <Accordion.Content>
                <p className="text-sm text-gray-700">
                  We implement appropriate technical and organizational measures to protect the security of your personal information. However, no electronic transmission or storage technology is completely secure, and we cannot guarantee that your information will not be accessed, disclosed, altered, or destroyed.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>Your Rights</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-sm text-gray-700">
                  Depending on your location, you may have rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate or incomplete information</li>
                  <li>Deletion of your personal information</li>
                  <li>Restriction or objection to processing</li>
                  <li>Data portability</li>
                </ul>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>I Accept</Button>
        <Button color="gray" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrivacyPolicyModal;
