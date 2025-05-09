import React, { useState } from 'react';
import { Card, Label, TextInput, Button, Tabs, Checkbox, Alert } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const LoginRegistration = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    acceptTerms: false,
    contentPreferences: []
  });
  const [error, setError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError('Please enter both email and password');
      return;
    }
    setError('');
    onLogin && onLogin(loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerData.name || !registerData.email || !registerData.password) {
      setError('Please fill in all required fields');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!registerData.acceptTerms) {
      setError('You must accept the terms and conditions');
      return;
    }
    setError('');
    onRegister && onRegister(registerData);
  };

  const handleSocialLogin = (provider) => {
    onSocialLogin && onSocialLogin(provider);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs.Group
        aria-label="Authentication tabs"
        style="underline"
        onActiveTabChange={(tab) => setActiveTab(tab)}
      >
        <Tabs.Item title="Login" active={activeTab === 'login'}>
          {error && <Alert color="failure">{error}</Alert>}
          <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="login-email" value="Email" />
              </div>
              <TextInput
                id="login-email"
                type="email"
                placeholder="name@example.com"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
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
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="remember" 
                checked={loginData.rememberMe}
                onChange={() => setLoginData({...loginData, rememberMe: !loginData.rememberMe})}
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Log in</Button>
          </form>
          
          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
            <p className="mx-4 mb-0 text-center font-semibold">OR</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button color="white" onClick={() => handleSocialLogin('google')}>
              <FaGoogle className="mr-2" />
              Continue with Google
            </Button>
            <Button color="white" onClick={() => handleSocialLogin('facebook')}>
              <FaFacebook className="mr-2" />
              Continue with Facebook
            </Button>
            <Button color="white" onClick={() => handleSocialLogin('apple')}>
              <FaApple className="mr-2" />
              Continue with Apple
            </Button>
          </div>
        </Tabs.Item>
        
        <Tabs.Item title="Register" active={activeTab === 'register'}>
          {error && <Alert color="failure">{error}</Alert>}
          <form className="flex flex-col gap-4" onSubmit={handleRegisterSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Full Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="John Doe"
                value={registerData.name}
                onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
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
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
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
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
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
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="accept-terms" 
                checked={registerData.acceptTerms}
                onChange={() => setRegisterData({...registerData, acceptTerms: !registerData.acceptTerms})}
                required
              />
              <Label htmlFor="accept-terms">
                I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
              </Label>
            </div>
            <div>
              <Label value="Content Preferences (Optional)" />
              <p className="text-sm text-gray-500 mb-2">Help us personalize your experience</p>
              <div className="flex flex-wrap gap-2">
                {['News', 'Sports', 'Entertainment', 'Technology', 'Business'].map((pref) => (
                  <Button 
                    key={pref}
                    color={registerData.contentPreferences.includes(pref) ? 'blue' : 'light'}
                    size="xs"
                    onClick={() => {
                      const updatedPrefs = registerData.contentPreferences.includes(pref)
                        ? registerData.contentPreferences.filter(p => p !== pref)
                        : [...registerData.contentPreferences, pref];
                      setRegisterData({...registerData, contentPreferences: updatedPrefs});
                    }}
                  >
                    {pref}
                  </Button>
                ))}
              </div>
            </div>
            <Button type="submit">Create account</Button>
          </form>
        </Tabs.Item>
      </Tabs.Group>
    </Card>
  );
};

export default LoginRegistration;