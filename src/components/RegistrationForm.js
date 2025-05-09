import React, { useState } from 'react';
import { Card, Tabs, TextInput, Label, Button, Checkbox, Alert } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaTwitter, FaApple } from 'react-icons/fa';

const LoginRegistrationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [contentPreferences, setContentPreferences] = useState([]);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    setError('');
    if (onLogin) onLogin({ email, password, rememberMe });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    if (onRegister) onRegister({ name, email, password, contentPreferences });
  };

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) onSocialLogin(provider);
  };

  const handlePreferenceChange = (preference) => {
    setContentPreferences(prev => {
      if (prev.includes(preference)) {
        return prev.filter(p => p !== preference);
      } else {
        return [...prev, preference];
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <Tabs.Group
          aria-label="Authentication tabs"
          style="underline"
          onActiveTabChange={(tab) => setActiveTab(tab)}
        >
          <Tabs.Item title="Login" active={activeTab === 'login'}>
            {error && <Alert color="failure">{error}</Alert>}
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button type="submit" color="blue">
                Log in
              </Button>
            </form>
            
            <div className="mt-4">
              <p className="text-center text-sm text-gray-500 mb-3">Or continue with</p>
              <div className="flex justify-center gap-4">
                <Button color="light" onClick={() => handleSocialLogin('google')}>
                  <FaGoogle className="mr-2" /> Google
                </Button>
                <Button color="light" onClick={() => handleSocialLogin('facebook')}>
                  <FaFacebook className="mr-2" /> Facebook
                </Button>
                <Button color="light" onClick={() => handleSocialLogin('apple')}>
                  <FaApple className="mr-2" /> Apple
                </Button>
              </div>
            </div>
          </Tabs.Item>
          
          <Tabs.Item title="Register" active={activeTab === 'register'}>
            {error && <Alert color="failure">{error}</Alert>}
            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Full Name" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label value="Content Preferences" className="mb-2 block" />
                <div className="flex flex-wrap gap-2">
                  {['News', 'Sports', 'Entertainment', 'Technology', 'Health'].map(pref => (
                    <div key={pref} className="flex items-center">
                      <Checkbox 
                        id={`pref-${pref}`}
                        checked={contentPreferences.includes(pref)}
                        onChange={() => handlePreferenceChange(pref)}
                      />
                      <Label htmlFor={`pref-${pref}`} className="ml-2">{pref}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button type="submit" color="blue">
                Register
              </Button>
            </form>
            
            <div className="mt-4">
              <p className="text-center text-sm text-gray-500 mb-3">Or register with</p>
              <div className="flex justify-center gap-4">
                <Button color="light" onClick={() => handleSocialLogin('google')}>
                  <FaGoogle className="mr-2" /> Google
                </Button>
                <Button color="light" onClick={() => handleSocialLogin('facebook')}>
                  <FaFacebook className="mr-2" /> Facebook
                </Button>
                <Button color="light" onClick={() => handleSocialLogin('twitter')}>
                  <FaTwitter className="mr-2" /> Twitter
                </Button>
              </div>
            </div>
          </Tabs.Item>
        </Tabs.Group>
      </Card>
    </div>
  );
};

export default LoginRegistrationScreen;