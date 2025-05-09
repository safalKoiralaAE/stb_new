import React, { useState } from 'react';
import { Card, Button, Label, TextInput, Checkbox, Tabs, Spinner } from 'flowbite-react';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';

const AuthenticationScreen = ({ onLogin, onRegister, onForgotPassword }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
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
      if (onRegister) onRegister({ name, email, password });
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) onLogin({ provider });
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome to the Platform</h2>
        
        <Tabs 
          style="pills" 
          className="mb-4"
          onActiveTabChange={(tab) => setActiveTab(tab)}
        >
          <Tabs.Item 
            title="Login"
            active={activeTab === 'login'}
          >
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
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={onForgotPassword}
                >
                  Forgot password?
                </button>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Loading...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </Tabs.Item>
          <Tabs.Item 
            title="Register" 
            active={activeTab === 'register'}
          >
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Loading...
                  </>
                ) : (
                  'Create account'
                )}
              </Button>
            </form>
          </Tabs.Item>
        </Tabs>

        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 mb-0 text-center font-medium text-gray-500">or</p>
        </div>

        <div className="space-y-3">
          <Button 
            color="light" 
            className="w-full" 
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            <FaGoogle className="mr-2" />
            Continue with Google
          </Button>
          <Button 
            color="light" 
            className="w-full" 
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
          >
            <FaFacebook className="mr-2" />
            Continue with Facebook
          </Button>
          <Button 
            color="light" 
            className="w-full" 
            onClick={() => handleSocialLogin('apple')}
            disabled={isLoading}
          >
            <FaApple className="mr-2" />
            Continue with Apple
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AuthenticationScreen;