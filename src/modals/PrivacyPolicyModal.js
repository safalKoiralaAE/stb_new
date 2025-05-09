import React, { useState } from 'react';
import { Card, Button, Label, TextInput, Checkbox, Alert, Tabs } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple, FaTwitter } from 'react-icons/fa';

const LoginRegistrationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', rememberMe: false });
  const [registerForm, setRegisterForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    acceptTerms: false 
  });
  const [error, setError] = useState('');
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!loginForm.email || !loginForm.password) {
      setError('Please fill in all fields');
      return;
    }
    if (onLogin) {
      onLogin(loginForm);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!registerForm.acceptTerms) {
      setError('You must accept the terms and conditions');
      return;
    }
    if (onRegister) {
      onRegister(registerForm);
    }
  };

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome</h2>
        
        {error && (
          <Alert color="failure" className="mb-4">
            {error}
          </Alert>
        )}
        
        <Tabs.Group
          style="underline"
          onActiveTabChange={(tab) => setActiveTab(tab === 0 ? 'login' : 'register')}
        >
          <Tabs.Item active title="Login">
            <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="remember" 
                  checked={loginForm.rememberMe}
                  onChange={(e) => setLoginForm({...loginForm, rememberMe: e.target.checked})}
                />
                <Label htmlFor="remember">Remember me</Label>
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
                  <Label htmlFor="name" value="Full Name" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
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
                  placeholder="name@example.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
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
                  placeholder="••••••••"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
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
                  placeholder="••••••••"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="terms" 
                  checked={registerForm.acceptTerms}
                  onChange={(e) => setRegisterForm({...registerForm, acceptTerms: e.target.checked})}
                />
                <Label htmlFor="terms">
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
            <Button color="white" onClick={() => handleSocialLogin('google')}>
              <FaGoogle className="mr-2" />
              Google
            </Button>
            <Button color="white" onClick={() => handleSocialLogin('facebook')}>
              <FaFacebook className="mr-2" />
              Facebook
            </Button>
            <Button color="white" onClick={() => handleSocialLogin('apple')}>
              <FaApple className="mr-2" />
              Apple
            </Button>
            <Button color="white" onClick={() => handleSocialLogin('twitter')}>
              <FaTwitter className="mr-2" />
              Twitter
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginRegistrationScreen;