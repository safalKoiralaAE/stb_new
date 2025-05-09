import React, { useState } from 'react';
import { Button, Card, Checkbox, Label, TextInput, Tabs, ToggleSwitch } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaTwitter, FaApple } from 'react-icons/fa';

const LoginRegistrationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    agreeToTerms: false,
    receiveNewsletters: false
  });

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin(loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (onRegister) onRegister(registerData);
  };

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) onSocialLogin(provider);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md">
        <Tabs.Group
          style="underline"
          onActiveTabChange={(tab) => setActiveTab(tab)}
        >
          <Tabs.Item title="Login" active={activeTab === 'login'}>
            <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="rememberMe" 
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={handleLoginChange}
                />
                <Label htmlFor="rememberMe">Remember me</Label>
              </div>
              <Button type="submit">Log in</Button>
              <div className="text-sm text-right">
                <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
              </div>
            </form>

            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
              <p className="mx-4 mb-0 text-center text-sm">Or login with</p>
            </div>

            <div className="flex justify-center space-x-4">
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
            </div>
          </Tabs.Item>

          <Tabs.Item title="Register" active={activeTab === 'register'}>
            <form className="flex flex-col gap-4" onSubmit={handleRegisterSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Full Name" />
                </div>
                <TextInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="registerEmail" value="Email" />
                </div>
                <TextInput
                  id="registerEmail"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="registerPassword" value="Password" />
                </div>
                <TextInput
                  id="registerPassword"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confirmPassword" value="Confirm Password" />
                </div>
                <TextInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="agreeToTerms" 
                  name="agreeToTerms"
                  checked={registerData.agreeToTerms}
                  onChange={handleRegisterChange}
                  required
                />
                <Label htmlFor="agreeToTerms">I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a></Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="receiveNewsletters" 
                  name="receiveNewsletters"
                  checked={registerData.receiveNewsletters}
                  onChange={handleRegisterChange}
                />
                <Label htmlFor="receiveNewsletters">I want to receive personalized recommendations</Label>
              </div>
              <Button type="submit">Register</Button>
            </form>

            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
              <p className="mx-4 mb-0 text-center text-sm">Or register with</p>
            </div>

            <div className="flex justify-center space-x-4">
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
            </div>
          </Tabs.Item>
        </Tabs.Group>
      </Card>
    </div>
  );
};

export default LoginRegistrationScreen;