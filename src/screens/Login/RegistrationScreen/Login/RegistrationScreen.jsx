import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Tabs } from 'flowbite-react';
import LogoBanner from '../components/LogoBanner';
import AuthTabSwitcher from '../components/AuthTabSwitcher';
import SocialMediaButtons from '../components/SocialMediaButtons';
import PromotionalCarousel from '../components/PromotionalCarousel';
import SecurityIndicators from '../components/SecurityIndicators';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import PasswordRecoveryModal from '../modals/PasswordRecoveryModal';
import RegistrationSuccessModal from '../modals/RegistrationSuccessModal';
import LoginErrorModal from '../modals/LoginErrorModal';
import PrivacyPolicyModal from '../modals/PrivacyPolicyModal';
import AccountVerificationModal from '../modals/AccountVerificationModal';

const LoginRegistrationScreen = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showAccountVerification, setShowAccountVerification] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (credentials) => {
    // Mock login functionality
    if (credentials.emailOrUsername && credentials.password) {
      console.log('Login attempt with:', credentials);
      // Simulate successful login
      // In a real app, this would be an API call
    } else {
      setLoginError('Please enter both email/username and password');
      setShowLoginError(true);
    }
  };

  const handleRegister = (userData) => {
    // Mock registration functionality
    console.log('Registration with:', userData);
    // Simulate successful registration
    setShowRegistrationSuccess(true);
    // After successful registration, we would typically show account verification
    setTimeout(() => {
      setShowRegistrationSuccess(false);
      setShowAccountVerification(true);
    }, 3000);
  };

  const handleForgotPassword = () => {
    setShowPasswordRecovery(true);
  };

  const handlePrivacyPolicyClick = () => {
    setShowPrivacyPolicy(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <LogoBanner />
        
        <Card className="w-full mt-4">
          <AuthTabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="mt-4">
            {activeTab === 'login' ? (
              <LoginForm 
                onLogin={handleLogin} 
                onForgotPassword={handleForgotPassword} 
              />
            ) : (
              <RegistrationForm 
                onRegister={handleRegister}
                onPrivacyPolicyClick={handlePrivacyPolicyClick}
              />
            )}
          </div>
          
          <div className="mt-4">
            <SocialMediaButtons />
          </div>
          
          <div className="mt-4">
            <SecurityIndicators />
          </div>
        </Card>
        
        <div className="mt-6">
          <PromotionalCarousel />
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Need help? Visit our <Link to="/help" className="text-blue-600 hover:underline">Help and Support Page</Link></p>
          <p className="mt-2">
            <Link to="/terms" className="text-blue-600 hover:underline mr-4">Terms and Conditions</Link>
            <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
      
      {/* Modals */}
      <PasswordRecoveryModal 
        show={showPasswordRecovery} 
        onClose={() => setShowPasswordRecovery(false)} 
      />
      
      <RegistrationSuccessModal 
        show={showRegistrationSuccess} 
        onClose={() => setShowRegistrationSuccess(false)} 
      />
      
      <LoginErrorModal 
        show={showLoginError} 
        onClose={() => setShowLoginError(false)} 
        errorMessage={loginError}
      />
      
      <PrivacyPolicyModal 
        show={showPrivacyPolicy} 
        onClose={() => setShowPrivacyPolicy(false)} 
      />
      
      <AccountVerificationModal 
        show={showAccountVerification} 
        onClose={() => setShowAccountVerification(false)} 
      />
    </div>
  );
};

export default LoginRegistrationScreen;