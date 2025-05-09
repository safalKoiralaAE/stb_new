import React, { useState } from 'react';
import { Card, Button, Label, TextInput, Checkbox, Tabs, Alert } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple, FaTwitter } from 'react-icons/fa';

const AuthenticationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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
    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    if (onRegister) {
      onRegister({ name, email, password });
    }
  };

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome</h1>
        
        <Tabs aria-label="Authentication tabs" style="underline" onActiveTabChange={setActiveTab}>
          <Tabs.Item active={activeTab === 'login'} title="Login">
            {error && <Alert color="failure" className="mb-4">{error}</Alert>}
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="name@company.com"
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
                <Checkbox id="remember" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button type="submit">Login</Button>
              <p className="text-sm text-gray-500 text-center">
                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
              </p>
            </form>
          </Tabs.Item>
          
          <Tabs.Item active={activeTab === 'register'} title="Register">
            {error && <Alert color="failure" className="mb-4">{error}</Alert>}
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
                  placeholder="name@company.com"
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
              <div className="flex items-center gap-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
                </Label>
              </div>
              <Button type="submit">Register</Button>
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
              <FaGoogle className="mr-2" />
              Google
            </Button>
            <Button color="light" onClick={() => handleSocialLogin('facebook')}>
              <FaFacebook className="mr-2" />
              Facebook
            </Button>
            <Button color="light" onClick={() => handleSocialLogin('apple')}>
              <FaApple className="mr-2" />
              Apple
            </Button>
            <Button color="light" onClick={() => handleSocialLogin('twitter')}>
              <FaTwitter className="mr-2" />
              Twitter
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthenticationScreen;