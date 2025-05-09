import React, { useState } from 'react';
import { Card, Button, Label, TextInput, Checkbox, Tabs, Spinner, Alert } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

const LoginRegistrationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    contentPreferences: []
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) {
        onLogin(loginForm);
      }
    }, 1000);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onRegister) {
        onRegister(registerForm);
      }
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  const updateLoginForm = (field, value) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
  };

  const updateRegisterForm = (field, value) => {
    setRegisterForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome</h2>
        
        <Tabs aria-label="Login or Register tabs" style="underline" onActiveTabChange={setActiveTab}>
          <Tabs.Item active={activeTab === 'login'} title="Login">
            {error && <Alert color="failure" className="mb-4">{error}</Alert>}
            
            <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={loginForm.email}
                  onChange={(e) => updateLoginForm('email', e.target.value)}
                />
              </div>
              
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => updateLoginForm('password', e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={loginForm.rememberMe}
                  onChange={(e) => updateLoginForm('rememberMe', e.target.checked)}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <><Spinner size="sm" className="mr-2" /> Loading...</> : 'Log in'}
              </Button>
              
              <div className="text-sm text-center">
                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
              </div>
            </form>
            
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
              <p className="mx-4 mb-0 text-center text-sm">Or continue with</p>
            </div>
            
            <div className="flex gap-2">
              <Button color="light" className="w-full" onClick={() => handleSocialLogin('google')}>
                <FaGoogle className="mr-2" /> Google
              </Button>
              <Button color="light" className="w-full" onClick={() => handleSocialLogin('facebook')}>
                <FaFacebook className="mr-2" /> Facebook
              </Button>
              <Button color="light" className="w-full" onClick={() => handleSocialLogin('twitter')}>
                <FaTwitter className="mr-2" /> Twitter
              </Button>
            </div>
          </Tabs.Item>
          
          <Tabs.Item active={activeTab === 'register'} title="Register">
            {error && <Alert color="failure" className="mb-4">{error}</Alert>}
            
            <form className="flex flex-col gap-4" onSubmit={handleRegisterSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Full Name" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={registerForm.name}
                  onChange={(e) => updateRegisterForm('name', e.target.value)}
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
                  required
                  value={registerForm.email}
                  onChange={(e) => updateRegisterForm('email', e.target.value)}
                />
              </div>
              
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="register-password" value="Password" />
                </div>
                <TextInput
                  id="register-password"
                  type="password"
                  required
                  value={registerForm.password}
                  onChange={(e) => updateRegisterForm('password', e.target.value)}
                />
              </div>
              
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confirm-password" value="Confirm Password" />
                </div>
                <TextInput
                  id="confirm-password"
                  type="password"
                  required
                  value={registerForm.confirmPassword}
                  onChange={(e) => updateRegisterForm('confirmPassword', e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox
                  id="agree"
                  required
                  checked={registerForm.agreeToTerms}
                  onChange={(e) => updateRegisterForm('agreeToTerms', e.target.checked)}
                />
                <Label htmlFor="agree" className="flex">
                  I agree to the <a href="#" className="text-blue-600 hover:underline ml-1">terms and conditions</a>
                </Label>
              </div>
              
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <><Spinner size="sm" className="mr-2" /> Creating account...</> : 'Register'}
              </Button>
            </form>
          </Tabs.Item>
        </Tabs>
      </Card>
    </div>
  );
};

export default LoginRegistrationScreen;