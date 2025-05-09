import React, { useState } from 'react';
import { Card } from 'flowbite-react';
import LogoBanner from '../components/LogoBanner';
import AuthTabs from '../components/AuthTabs';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import PromotionalCarousel from '../components/PromotionalCarousel';
import LanguageSelector from '../components/LanguageSelector';
import ForgotPasswordModal from '../modals/ForgotPasswordModal';
import RegistrationSuccessModal from '../modals/RegistrationSuccessModal';
import LoginErrorModal from '../modals/LoginErrorModal';
import EmailVerificationModal from '../modals/EmailVerificationModal';
import TermsOfServiceModal from '../modals/TermsOfServiceModal';

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showRegistrationSuccessModal, setShowRegistrationSuccessModal] = useState(false);
  const [showLoginErrorModal, setShowLoginErrorModal] = useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);
  const [showTermsOfServiceModal, setShowTermsOfServiceModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (credentials) => {
    // Simulate login functionality
    console.log('Login attempt with:', credentials);
    if (!credentials.email || !credentials.password) {
      setErrorMessage('Please fill in all required fields');
      setShowLoginErrorModal(true);
      return;
    }
    // In a real app, you would make an API call here
  };

  const handleRegister = (userData) => {
    // Simulate registration functionality
    console.log('Registration with:', userData);
    if (userData.password !== userData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      setShowLoginErrorModal(true);
      return;
    }
    setShowEmailVerificationModal(true);
    // After email verification would be completed
    // setShowRegistrationSuccessModal(true);
  };

  const handleForgotPassword = (email) => {
    console.log('Password reset requested for:', email);
    setShowForgotPasswordModal(false);
    // In a real app, you would send a password reset email here
  };

  const handleOpenTerms = () => {
    setShowTermsOfServiceModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <LogoBanner />
          
          <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === 'login' ? (
            <LoginForm 
              onLogin={handleLogin} 
              onForgotPassword={() => setShowForgotPasswordModal(true)}
            />
          ) : (
            <RegisterForm 
              onRegister={handleRegister} 
              onOpenTerms={handleOpenTerms}
            />
          )}
          
          <div className="mt-6">
            <PromotionalCarousel />
          </div>
        </Card>
      </div>
      
      <div className="mt-auto p-4">
        <LanguageSelector />
      </div>

      {/* Modals */}
      <ForgotPasswordModal 
        show={showForgotPasswordModal} 
        onClose={() => setShowForgotPasswordModal(false)} 
        onSubmit={handleForgotPassword}
      />
      
      <RegistrationSuccessModal 
        show={showRegistrationSuccessModal} 
        onClose={() => setShowRegistrationSuccessModal(false)} 
      />
      
      <LoginErrorModal 
        show={showLoginErrorModal} 
        onClose={() => setShowLoginErrorModal(false)} 
        errorMessage={errorMessage}
      />
      
      <EmailVerificationModal 
        show={showEmailVerificationModal} 
        onClose={() => setShowEmailVerificationModal(false)} 
      />
      
      <TermsOfServiceModal 
        show={showTermsOfServiceModal} 
        onClose={() => setShowTermsOfServiceModal(false)} 
      />
    </div>
  );
};

export default MainScreen;