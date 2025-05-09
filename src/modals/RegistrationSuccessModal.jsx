import React, { useState } from 'react';
import { Button, Card, Checkbox, Label, TextInput, Tabs, DarkThemeToggle } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple, FaTwitter } from 'react-icons/fa';

const AuthenticationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome</h2>
          <DarkThemeToggle />
        </div>
        
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
              <Button type="submit">Log in</Button>
              <div className="text-sm text-right">
                <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                  Forgot Password?
                </a>
              </div>
            </form>
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
                <Checkbox
                  id="agree"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  required
                />
                <Label htmlFor="agree">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                    terms and conditions
                  </a>
                </Label>
              </div>
              <Button type="submit">Register</Button>
            </form>
          </Tabs.Item>
        </Tabs.Group>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button color="white" outline onClick={() => handleSocialLogin('google')}>
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button color="white" outline onClick={() => handleSocialLogin('facebook')}>
              <FaFacebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button color="white" outline onClick={() => handleSocialLogin('apple')}>
              <FaApple className="mr-2 h-4 w-4" />
              Apple
            </Button>
            <Button color="white" outline onClick={() => handleSocialLogin('twitter')}>
              <FaTwitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthenticationScreen;
