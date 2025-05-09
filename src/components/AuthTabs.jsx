import React, { useState } from 'react';
import { Button, Card, Checkbox, Label, TextInput, Tabs, Avatar } from 'flowbite-react';
import { FaFacebook, FaGoogle, FaApple, FaTwitter } from 'react-icons/fa';

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
        <div className="flex justify-center mb-4">
          <Avatar size="lg" rounded />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Welcome</h2>
        
        <Tabs>
          <Tabs.Item active={activeTab === 'login'} title="Login" onClick={() => setActiveTab('login')}>
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
              <Button type="submit" className="mt-2">Log in</Button>
              <p className="text-sm text-center text-gray-500">
                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
              </p>
            </form>
          </Tabs.Item>
          
          <Tabs.Item active={activeTab === 'register'} title="Register" onClick={() => setActiveTab('register')}>
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
              <Button type="submit" className="mt-2">Register</Button>
            </form>
          </Tabs.Item>
        </Tabs>
        
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 mb-0 text-center font-medium text-gray-500">or continue with</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button color="gray" onClick={() => handleSocialLogin('google')}>
            <FaGoogle className="mr-2" />
            Google
          </Button>
          <Button color="gray" onClick={() => handleSocialLogin('facebook')}>
            <FaFacebook className="mr-2" />
            Facebook
          </Button>
          <Button color="gray" onClick={() => handleSocialLogin('apple')}>
            <FaApple className="mr-2" />
            Apple
          </Button>
          <Button color="gray" onClick={() => handleSocialLogin('twitter')}>
            <FaTwitter className="mr-2" />
            Twitter
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AuthenticationScreen;
