import React, { useState } from 'react';
import { Button, Card, TextInput, Label, Checkbox, Tabs, Alert } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple, FaTwitter } from 'react-icons/fa';

const LoginRegistrationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [contentPreferences, setContentPreferences] = useState([]);
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
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

  const handlePreferenceToggle = (preference) => {
    if (contentPreferences.includes(preference)) {
      setContentPreferences(contentPreferences.filter(p => p !== preference));
    } else {
      setContentPreferences([...contentPreferences, preference]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">Welcome to Our Platform</h1>
        
        {error && <Alert color="failure" className="mb-4">{error}</Alert>}
        
        <Tabs aria-label="Authentication tabs" style="underline" onActiveTabChange={setActiveTab}>
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
              <Button type="submit" className="mt-2">Log in</Button>
            </form>
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
                <Label value="Content Preferences" />
                <div className="flex flex-wrap gap-2 mt-2">
                  {['News', 'Sports', 'Technology', 'Entertainment', 'Science'].map((pref) => (
                    <div key={pref} className="flex items-center">
                      <Checkbox 
                        id={`pref-${pref}`}
                        checked={contentPreferences.includes(pref)}
                        onChange={() => handlePreferenceToggle(pref)}
                      />
                      <Label htmlFor={`pref-${pref}`} className="ml-2">{pref}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button type="submit" className="mt-2">Create account</Button>
            </form>
          </Tabs.Item>
        </Tabs>
        
        <div className="mt-4">
          <p className="text-center text-sm text-gray-500 mb-3">Or continue with</p>
          <div className="flex justify-center gap-2">
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
      </Card>
    </div>
  );
};

export default LoginRegistrationScreen;