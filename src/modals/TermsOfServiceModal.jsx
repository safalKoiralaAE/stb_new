import React, { useState } from 'react';
import { Card, Label, TextInput, Button, Tabs, Checkbox } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple, FaTwitter } from 'react-icons/fa';

const AuthenticationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false });
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (onLogin) onLogin(loginData);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (onRegister) onRegister(registerData);
  };

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) onSocialLogin(provider);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-600">Sign in or create an account to continue</p>
        </div>
        
        <Tabs>
          <Tabs.Item active={activeTab === 'login'} title="Login" onClick={() => setActiveTab('login')}>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={loginData.email}
                  onChange={handleLoginChange}
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
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberMe"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleLoginChange}
                  />
                  <Label htmlFor="rememberMe">Remember me</Label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" className="w-full">
                Log in
              </Button>
            </form>
          </Tabs.Item>
          
          <Tabs.Item active={activeTab === 'register'} title="Register" onClick={() => setActiveTab('register')}>
            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="fullName" value="Full Name" />
                </div>
                <TextInput
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={registerData.fullName}
                  onChange={handleRegisterChange}
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
                  required
                  value={registerData.email}
                  onChange={handleRegisterChange}
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
                  required
                  value={registerData.password}
                  onChange={handleRegisterChange}
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
                  required
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={registerData.acceptTerms}
                  onChange={handleRegisterChange}
                  required
                />
                <Label htmlFor="acceptTerms" className="flex">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                    terms and conditions
                  </a>
                </Label>
              </div>
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </form>
          </Tabs.Item>
        </Tabs>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button color="light" onClick={() => handleSocialLogin('google')}>
              <FaGoogle className="mr-2" /> Google
            </Button>
            <Button color="light" onClick={() => handleSocialLogin('facebook')}>
              <FaFacebook className="mr-2" /> Facebook
            </Button>
            <Button color="light" onClick={() => handleSocialLogin('apple')}>
              <FaApple className="mr-2" /> Apple
            </Button>
            <Button color="light" onClick={() => handleSocialLogin('twitter')}>
              <FaTwitter className="mr-2" /> Twitter
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthenticationScreen;