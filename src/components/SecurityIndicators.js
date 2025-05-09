import React, { useState } from 'react';
import { Button, Card, Label, TextInput, Tabs, Checkbox, Alert } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple, FaTwitter } from 'react-icons/fa';

const LoginRegistrationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '', agreeTerms: false });
  const [error, setError] = useState('');
  
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!registerData.agreeTerms) {
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
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome</h1>
        
        {error && (
          <Alert color="failure" className="mb-4">
            {error}
          </Alert>
        )}
        
        <Tabs.Group
          aria-label="Login or Register tabs"
          style="underline"
          onActiveTabChange={(tab) => setActiveTab(tab === 0 ? 'login' : 'register')}
        >
          <Tabs.Item title="Login">
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
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember-me"
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={handleLoginChange}
                />
                <Label htmlFor="remember-me">Remember me</Label>
              </div>
              <Button type="submit" className="mt-2">
                Log in
              </Button>
              <div className="text-sm text-center">
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </form>
          </Tabs.Item>
          
          <Tabs.Item title="Register">
            <form className="flex flex-col gap-4" onSubmit={handleRegisterSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="register-name" value="Full Name" />
                </div>
                <TextInput
                  id="register-name"
                  type="text"
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
                  <Label htmlFor="register-confirm-password" value="Confirm Password" />
                </div>
                <TextInput
                  id="register-confirm-password"
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="agree-terms"
                  name="agreeTerms"
                  checked={registerData.agreeTerms}
                  onChange={handleRegisterChange}
                />
                <Label htmlFor="agree-terms">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    terms and conditions
                  </a>
                </Label>
              </div>
              <Button type="submit" className="mt-2">
                Register
              </Button>
            </form>
          </Tabs.Item>
        </Tabs.Group>
        
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 mb-0 text-center font-medium">or</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button color="light" onClick={() => handleSocialLogin('google')}>
            <FaGoogle className="mr-2" />
            Continue with Google
          </Button>
          <Button color="light" onClick={() => handleSocialLogin('facebook')}>
            <FaFacebook className="mr-2" />
            Continue with Facebook
          </Button>
          <Button color="light" onClick={() => handleSocialLogin('apple')}>
            <FaApple className="mr-2" />
            Continue with Apple
          </Button>
          <Button color="light" onClick={() => handleSocialLogin('twitter')}>
            <FaTwitter className="mr-2" />
            Continue with Twitter
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginRegistrationScreen;