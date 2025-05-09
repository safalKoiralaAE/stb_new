import React, { useState } from 'react';
import { Card } from 'flowbite-react';
import AuthTabs from '../components/AuthTabs';
import LogoBanner from '../components/LogoBanner';
import BackgroundPreview from '../components/BackgroundPreview';
import ForgotPasswordModal from '../modals/ForgotPasswordModal';
import RegistrationConfirmationModal from '../modals/RegistrationConfirmationModal';
import LoginErrorModal from '../modals/LoginErrorModal';
import TermsAndConditionsModal from '../modals/TermsAndConditionsModal';
import PrivacyPolicyModal from '../modals/PrivacyPolicyModal';

const AuthenticationScreen = () => {
  // State for handling modals
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showLoginErrorModal, setShowLoginErrorModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [authStep, setAuthStep] = useState(1);
  const [loginError, setLoginError] = useState(null);

  // Handler functions for modals
  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
  };

  const handleRegistrationComplete = () => {
    setShowRegistrationModal(true);
  };

  const handleLoginError = (error) => {
    setLoginError(error);
    setShowLoginErrorModal(true);
  };

  const handleViewTerms = () => {
    setShowTermsModal(true);
  };

  const handleViewPrivacy = () => {
    setShowPrivacyModal(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {/* Background Preview Component */}
      <BackgroundPreview />

      {/* Main Authentication Card */}
      <Card className="w-full max-w-md z-10 p-2">
        <div className="mb-4">
          <LogoBanner />
        </div>

        <AuthTabs 
          onForgotPassword={handleForgotPassword}
          onRegistrationComplete={handleRegistrationComplete}
          onLoginError={handleLoginError}
          onViewTerms={handleViewTerms}
          onViewPrivacy={handleViewPrivacy}
          authStep={authStep}
          setAuthStep={setAuthStep}
        />
      </Card>

      {/* Modals */}
      <ForgotPasswordModal 
        show={showForgotPasswordModal} 
        onClose={() => setShowForgotPasswordModal(false)} 
      />
      
      <RegistrationConfirmationModal 
        show={showRegistrationModal} 
        onClose={() => setShowRegistrationModal(false)} 
      />
      
      <LoginErrorModal 
        show={showLoginErrorModal} 
        onClose={() => setShowLoginErrorModal(false)}
        error={loginError} 
      />
      
      <TermsAndConditionsModal 
        show={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
      />
      
      <PrivacyPolicyModal 
        show={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)} 
      />
    </div>
  );
};

export default AuthenticationScreen;
