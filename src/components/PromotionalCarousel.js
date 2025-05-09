import React, { useState } from 'react';
import { Card, Button, Label, TextInput, Tabs, Checkbox, Alert } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple, FaTwitter } from 'react-icons/fa';

const LoginRegistrationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    contentPreferences: []
  });
  const [error, setError] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
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
      setError('Please fill in all fields');
      return;
    }
    setError('');
    if (onLogin) onLogin(loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      setError('Please fill in all required fields');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!registerData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    setError('');
    if (onRegister) onRegister(registerData);
  };

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) onSocialLogin(provider);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
          <p className="text-gray-600">Sign in or create an account</p>
        </div>

        {error && (
          <Alert color="failure" className="mb-4">
            {error}
          </Alert>
        )}

        <Tabs.Group
          style="underline"
          onActiveTabChange={(tab) => setActiveTab(tab === 0 ? 'login' : 'register')}
        >
          <Tabs.Item title="Login" active={activeTab === 'login'}>
            <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="login-email" value="Email" />
                </div>
                <TextInput
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="login-password" value="Password" />
                </div>
                <TextInput
                  id="login-password"
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Checkbox id="remember" label="Remember me" />
                <a
                  href="#"
                  className="text-sm text-blue-700 hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot Password?
                </a>
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </Tabs.Item>

          <Tabs.Item title="Register" active={activeTab === 'register'}>
            <form className="flex flex-col gap-4" onSubmit={handleRegisterSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Full Name" />
                </div>
                <TextInput
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="register-email" value="Email" />
                </div>
                <TextInput
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="register-password" value="Password" />
                </div>
                <TextInput
                  id="register-password"
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confirm-password" value="Confirm Password" />
                </div>
                <TextInput
                  id="confirm-password"
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="agree" 
                  name="agreeToTerms"
                  checked={registerData.agreeToTerms}
                  onChange={handleRegisterChange}
                />
                <Label htmlFor="agree" className="flex">
                  I agree to the{' '}
                  <a
                    href="#"
                    className="text-blue-700 hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    terms and conditions
                  </a>
                </Label>
              </div>
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </form>
          </Tabs.Item>
        </Tabs.Group>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              color="light"
              onClick={() => handleSocialLogin('google')}
            >
              <FaGoogle className="mr-2" /> Google
            </Button>
            <Button
              color="light"
              onClick={() => handleSocialLogin('facebook')}
            >
              <FaFacebook className="mr-2" /> Facebook
            </Button>
            <Button
              color="light"
              onClick={() => handleSocialLogin('apple')}
            >
              <FaApple className="mr-2" /> Apple
            </Button>
            <Button
              color="light"
              onClick={() => handleSocialLogin('twitter')}
            >
              <FaTwitter className="mr-2" /> Twitter
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginRegistrationScreen;
