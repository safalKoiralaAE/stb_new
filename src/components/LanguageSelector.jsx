import React, { useState } from 'react';
import { Card, Label, TextInput, Button, Tabs, Checkbox } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

const AuthenticationScreen = ({ onLogin, onRegister, onForgotPassword, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin({ email, password, rememberMe });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (onRegister) {
      onRegister({ name, email, password, agreeToTerms });
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
        <h2 className="text-2xl font-bold text-center mb-4">Welcome</h2>
        
        <Tabs.Group
          style="underline"
          onActiveTabChange={(tab) => setActiveTab(tab === 0 ? 'login' : 'register')}
        >
          <Tabs.Item active title="Login">
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button 
                  color="light"
                  size="xs"
                  onClick={() => onForgotPassword && onForgotPassword()}
                >
                  Forgot Password?
                </Button>
              </div>
              <Button type="submit" className="w-full">Sign in</Button>
            </form>

            <div className="mt-4">
              <p className="text-center text-sm text-gray-500 my-3">Or continue with</p>
              <div className="flex justify-center space-x-4">
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
          
          <Tabs.Item title="Register">
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
                <Checkbox 
                  id="terms" 
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  required
                />
                <Label htmlFor="terms">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
                </Label>
              </div>
              <Button type="submit" className="w-full">Create account</Button>
            </form>

            <div className="mt-4">
              <p className="text-center text-sm text-gray-500 my-3">Or register with</p>
              <div className="flex justify-center space-x-4">
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

export default AuthenticationScreen;