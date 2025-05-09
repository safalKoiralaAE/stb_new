import React, { useState } from 'react';
import { Tabs, TextInput, Label, Button, Card, Checkbox } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const AuthTabs = ({ onLogin, onRegister }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '', terms: false });

  const handleLoginChange = (e) => {
    const { name, value, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: name === 'remember' ? checked : value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, checked } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: name === 'terms' ? checked : value
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
    if (onLogin) onLogin({ provider });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs aria-label="Authentication tabs" style="underline" onActiveTabChange={setActiveTab}>
        <Tabs.Tab title="Login">
          <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                icon={FaEnvelope}
                value={loginData.email}
                onChange={handleLoginChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                name="password"
                type="password"
                required
                icon={FaLock}
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                name="remember"
                checked={loginData.remember}
                onChange={handleLoginChange}
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit" className="mt-2">Log in</Button>

            <div className="flex flex-col gap-3 mt-3">
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
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
            </div>
          </form>
        </Tabs.Tab>

        <Tabs.Tab title="Register">
          <form className="flex flex-col gap-4" onSubmit={handleRegisterSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your name" />
              </div>
              <TextInput
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                icon={FaUser}
                value={registerData.name}
                onChange={handleRegisterChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="register-email" value="Your email" />
              </div>
              <TextInput
                id="register-email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                icon={FaEnvelope}
                value={registerData.email}
                onChange={handleRegisterChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="register-password" value="Password" />
              </div>
              <TextInput
                id="register-password"
                name="password"
                type="password"
                required
                icon={FaLock}
                value={registerData.password}
                onChange={handleRegisterChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="confirm-password" value="Confirm password" />
              </div>
              <TextInput
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                icon={FaLock}
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                name="terms"
                checked={registerData.terms}
                onChange={handleRegisterChange}
              />
              <Label htmlFor="terms">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>
              </Label>
            </div>
            <Button type="submit" className="mt-2">Register</Button>
          </form>
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};

export default AuthTabs;