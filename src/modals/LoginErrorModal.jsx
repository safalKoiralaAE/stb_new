import React, { useState } from 'react';
import { Card, TextInput, Label, Button, Tabs, Checkbox } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple, FaTwitter } from 'react-icons/fa';

const AuthenticationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin({ email, password, rememberMe });
    }
  };
  
  const handleRegister = (e) => {
    e.preventDefault();
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
          <p className="text-gray-600">Sign in to continue to the platform</p>
        </div>
        
        <Tabs style="underline" onActiveTabChange={setActiveTab}>
          <Tabs.Item title="Login" active={activeTab === 'login'}>
            <form className="space-y-4" onSubmit={handleLogin}>
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
              <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-blue-700 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </Tabs.Item>
          
          <Tabs.Item title="Register" active={activeTab === 'register'}>
            <form className="space-y-4" onSubmit={handleRegister}>
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
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </Tabs.Item>
        </Tabs>
        
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 mb-0 text-center font-medium text-gray-500">or</p>
        </div>
        
        <div className="space-y-2">
          <Button 
            color="light" 
            className="w-full" 
            onClick={() => handleSocialLogin('google')}
          >
            <FaGoogle className="mr-2" /> Continue with Google
          </Button>
          <Button 
            color="light" 
            className="w-full" 
            onClick={() => handleSocialLogin('facebook')}
          >
            <FaFacebook className="mr-2" /> Continue with Facebook
          </Button>
          <Button 
            color="light" 
            className="w-full" 
            onClick={() => handleSocialLogin('apple')}
          >
            <FaApple className="mr-2" /> Continue with Apple
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AuthenticationScreen;
