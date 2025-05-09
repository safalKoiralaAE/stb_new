import React, { useState } from 'react';
import { Card, Tabs, TextInput, Button, Checkbox, Label, Alert } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaTwitter, FaApple } from 'react-icons/fa';

const LoginRegistrationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [contentPreferences, setContentPreferences] = useState([]);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    if (onLogin) {
      onLogin({ email, password, rememberMe });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    if (onRegister) {
      onRegister({ email, password, name, contentPreferences });
    }
  };

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  const handlePreferenceChange = (preference) => {
    if (contentPreferences.includes(preference)) {
      setContentPreferences(contentPreferences.filter(item => item !== preference));
    } else {
      setContentPreferences([...contentPreferences, preference]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-600">Sign in or create an account to continue</p>
        </div>

        {error && <Alert color="failure" className="mb-4">{error}</Alert>}

        <Tabs.Group
          style="underline"
          onActiveTabChange={(tab) => setActiveTab(tab)}
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button type="submit" className="mt-2">Sign in</Button>
            </form>

            <div className="mt-4">
              <p className="text-sm text-center text-gray-500 mb-3">Or sign in with</p>
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Content Preferences" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {['News', 'Technology', 'Sports', 'Entertainment', 'Business'].map((pref) => (
                    <div key={pref} className="flex items-center gap-2">
                      <Checkbox
                        id={`pref-${pref}`}
                        checked={contentPreferences.includes(pref)}
                        onChange={() => handlePreferenceChange(pref)}
                      />
                      <Label htmlFor={`pref-${pref}`}>{pref}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <Button type="submit" className="mt-2">Create account</Button>
            </form>
          </Tabs.Item>
        </Tabs.Group>
      </Card>
    </div>
  );
};

export default LoginRegistrationScreen;
