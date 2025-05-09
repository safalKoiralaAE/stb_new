import React, { useState } from 'react';
import { Card, Label, TextInput, Button, Tabs, Checkbox } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login with:', { email, password, rememberMe });
    // Implement actual login logic here
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Register with:', { name, email, password });
    // Implement actual registration logic here
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome</h2>
        
        <Tabs 
          style="underline"
          onActiveTabChange={(tab) => setActiveTab(tab)}
        >
          <Tabs.Item active={activeTab === 'login'} title="Login">
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="login-email" value="Email" />
                </div>
                <TextInput
                  id="login-email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="login-password" value="Password" />
                </div>
                <TextInput
                  id="login-password"
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
              <Button type="submit" className="mt-2">Sign in</Button>
              
              <div className="text-sm text-center mt-2">
                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
              </div>
              
              <div className="flex items-center justify-center mt-4">
                <hr className="w-full border-gray-300" />
                <span className="px-2 text-gray-500 bg-white">or</span>
                <hr className="w-full border-gray-300" />
              </div>
              
              <div className="flex flex-col gap-2 mt-4">
                <Button color="light" onClick={() => handleSocialLogin('google')}>
                  <FaGoogle className="mr-2" /> Continue with Google
                </Button>
                <Button color="light" onClick={() => handleSocialLogin('facebook')}>
                  <FaFacebook className="mr-2" /> Continue with Facebook
                </Button>
                <Button color="light" onClick={() => handleSocialLogin('apple')}>
                  <FaApple className="mr-2" /> Continue with Apple
                </Button>
              </div>
            </form>
          </Tabs.Item>
          
          <Tabs.Item active={activeTab === 'register'} title="Register">
            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="register-name" value="Full Name" />
                </div>
                <TextInput
                  id="register-name"
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
              <div className="flex items-center gap-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
                </Label>
              </div>
              <Button type="submit" className="mt-2">Create account</Button>
              
              <div className="flex items-center justify-center mt-4">
                <hr className="w-full border-gray-300" />
                <span className="px-2 text-gray-500 bg-white">or</span>
                <hr className="w-full border-gray-300" />
              </div>
              
              <div className="flex flex-col gap-2 mt-4">
                <Button color="light" onClick={() => handleSocialLogin('google')}>
                  <FaGoogle className="mr-2" /> Sign up with Google
                </Button>
                <Button color="light" onClick={() => handleSocialLogin('facebook')}>
                  <FaFacebook className="mr-2" /> Sign up with Facebook
                </Button>
                <Button color="light" onClick={() => handleSocialLogin('apple')}>
                  <FaApple className="mr-2" /> Sign up with Apple
                </Button>
              </div>
            </form>
          </Tabs.Item>
        </Tabs>
      </Card>
    </div>
  );
};

export default MainScreen;