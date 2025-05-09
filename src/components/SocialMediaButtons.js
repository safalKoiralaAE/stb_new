import React, { useState } from 'react';
import { Card, Label, TextInput, Checkbox, Button, Tabs, Spinner } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

const LoginRegistrationScreen = ({ onLogin, onRegister, onSocialLogin, isRegistering = false }) => {
  const [activeTab, setActiveTab] = useState(isRegistering ? 'register' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [contentPreferences, setContentPreferences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) onLogin({ email, password, rememberMe });
    }, 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onRegister) onRegister({ email, password, name, contentPreferences });
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) onSocialLogin(provider);
  };

  const handlePreferenceChange = (preference) => {
    if (contentPreferences.includes(preference)) {
      setContentPreferences(contentPreferences.filter(item => item !== preference));
    } else {
      setContentPreferences([...contentPreferences, preference]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md">
        <Tabs.Group
          style="underline"
          onActiveTabChange={(tab) => setActiveTab(tab === 0 ? 'login' : 'register')}
        >
          <Tabs.Item active={activeTab === 'login'} title="Login">
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner size="sm" className="mr-2" /> : null}
                Log in
              </Button>
              <div className="text-sm text-center text-gray-500">
                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button color="light" onClick={() => handleSocialLogin('google')}>
                  <FaGoogle className="mr-2" />
                  Google
                </Button>
                <Button color="light" onClick={() => handleSocialLogin('facebook')}>
                  <FaFacebook className="mr-2" />
                  Facebook
                </Button>
                <Button color="light" onClick={() => handleSocialLogin('twitter')}>
                  <FaTwitter className="mr-2" />
                  Twitter
                </Button>
              </div>
            </div>
          </Tabs.Item>
          
          <Tabs.Item active={activeTab === 'register'} title="Register">
            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Full Name" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <div>
                <Label value="Content Preferences" />
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {['News', 'Sports', 'Entertainment', 'Technology', 'Science', 'Business'].map((pref) => (
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
              
              <Button type="submit" disabled={isLoading || password !== confirmPassword}>
                {isLoading ? <Spinner size="sm" className="mr-2" /> : null}
                Register
              </Button>
            </form>
          </Tabs.Item>
        </Tabs.Group>
      </Card>
    </div>
  );
};

export default LoginRegistrationScreen;