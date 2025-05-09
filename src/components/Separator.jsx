import React, { useState } from 'react';
import { Button, Card, Checkbox, Label, TextInput, Tabs, Toast } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const AuthenticationScreen = ({ onLogin, onRegister }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setToastMessage('Please fill in all required fields');
      setShowToast(true);
      return;
    }
    if (onLogin) {
      onLogin(loginData);
    }
  };
  
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      setToastMessage('Please fill in all required fields');
      setShowToast(true);
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setToastMessage('Passwords do not match');
      setShowToast(true);
      return;
    }
    if (!registerData.agreeTerms) {
      setToastMessage('Please agree to the terms and conditions');
      setShowToast(true);
      return;
    }
    if (onRegister) {
      onRegister(registerData);
    }
  };
  
  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implementation would connect to the respective OAuth provider
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
          <p className="text-gray-600">Sign in or create an account to continue</p>
        </div>
        
        <Tabs 
          style="underline"
          onActiveTabChange={(tab) => setActiveTab(tab)}
        >
          <Tabs.Item active={activeTab === 'login'} title="Login">
            <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={handleLoginChange}
                />
                <Label htmlFor="rememberMe">Remember me</Label>
              </div>
              <Button type="submit" className="w-full">Log in</Button>
              <div className="text-sm text-center">
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </form>
            
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
              <p className="mx-4 mb-0 text-center font-medium text-gray-500">or</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button color="light" onClick={() => handleSocialLogin('Google')}>
                <FaGoogle className="mr-2" />
                Continue with Google
              </Button>
              <Button color="light" onClick={() => handleSocialLogin('Facebook')}>
                <FaFacebook className="mr-2" />
                Continue with Facebook
              </Button>
              <Button color="light" onClick={() => handleSocialLogin('Apple')}>
                <FaApple className="mr-2" />
                Continue with Apple
              </Button>
            </div>
          </Tabs.Item>
          
          <Tabs.Item active={activeTab === 'register'} title="Register">
            <form className="flex flex-col gap-4" onSubmit={handleRegisterSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Full Name" />
                </div>
                <TextInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="registerEmail" value="Email" />
                </div>
                <TextInput
                  id="registerEmail"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="registerPassword" value="Password" />
                </div>
                <TextInput
                  id="registerPassword"
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confirmPassword" value="Confirm Password" />
                </div>
                <TextInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={registerData.agreeTerms}
                  onChange={handleRegisterChange}
                />
                <Label htmlFor="agreeTerms">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    terms and conditions
                  </a>
                </Label>
              </div>
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
            
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
              <p className="mx-4 mb-0 text-center font-medium text-gray-500">or</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button color="light" onClick={() => handleSocialLogin('Google')}>
                <FaGoogle className="mr-2" />
                Sign up with Google
              </Button>
              <Button color="light" onClick={() => handleSocialLogin('Facebook')}>
                <FaFacebook className="mr-2" />
                Sign up with Facebook
              </Button>
              <Button color="light" onClick={() => handleSocialLogin('Apple')}>
                <FaApple className="mr-2" />
                Sign up with Apple
              </Button>
            </div>
          </Tabs.Item>
        </Tabs>
      </Card>
      
      {showToast && (
        <Toast className="fixed bottom-4 right-4" onClose={() => setShowToast(false)}>
          <div className="text-sm font-normal">{toastMessage}</div>
          <Toast.Toggle />
        </Toast>
      )}
    </div>
  );
};

export default AuthenticationScreen;