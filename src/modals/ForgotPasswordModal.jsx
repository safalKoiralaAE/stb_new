import React, { useState } from 'react';
import { Card, Button, Label, TextInput, Checkbox, Tabs, Avatar } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple, FaTwitter } from 'react-icons/fa';

const AuthenticationScreen = ({ onLogin, onRegister, onForgotPassword, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin({ email, password, rememberMe });
    }
  };
  
  const handleRegister = (e) => {
    e.preventDefault();
    if (onRegister) {
      onRegister({ name, email, password, agreeTerms });
    }
  };
  
  const handleSocialLogin = (provider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <Card>
          <div className="flex justify-center mb-4">
            <Avatar 
              size="xl"
              img="https://flowbite.com/docs/images/logo.svg" 
              alt="App Logo"
              rounded
            />
          </div>
          <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
            {activeTab === 'login' ? 'Sign In' : 'Create Account'}
          </h5>
          
          <Tabs 
            style="underline"
            onActiveTabChange={tab => setActiveTab(tab)}
          >
            <Tabs.Item title="Login" active={activeTab === 'login'}>
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
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
                <div className="text-center">
                  <span 
                    className="text-sm text-blue-600 hover:underline cursor-pointer"
                    onClick={() => onForgotPassword && onForgotPassword()}
                  >
                    Forgot Password?
                  </span>
                </div>
              </form>
            </Tabs.Item>
            
            <Tabs.Item title="Register" active={activeTab === 'register'}>
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
                    id="agree" 
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                  />
                  <Label htmlFor="agree">
                    I agree to the <span className="text-blue-600 hover:underline cursor-pointer">terms and conditions</span>
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  Create account
                </Button>
              </form>
            </Tabs.Item>
          </Tabs>
          
          <div className="mt-4">
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-gray-500 text-sm">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
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
    </div>
  );
};

export default AuthenticationScreen;