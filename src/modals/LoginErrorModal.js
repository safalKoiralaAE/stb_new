import React, { useState } from 'react';
import { Button, Card, Checkbox, Label, TextInput, Tabs } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

const LoginRegistrationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '', agreeToTerms: false });

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === 'checkbox' ? checked : value
    });
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
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <Tabs
          style="underline"
          onActiveTabChange={(tab) => setActiveTab(tab)}
        >
          <Tabs.Item active={activeTab === 'login'} title="Login">
            <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="login-email" value="Email" />
                </div>
                <TextInput
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="login-password" value="Password" />
                </div>
                <TextInput
                  id="login-password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={handleLoginChange}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button type="submit">Sign in</Button>
              
              <div className="my-4 text-center">
                <p className="text-sm text-gray-500 mb-3">Or continue with</p>
                <div className="flex justify-center space-x-4">
                  <Button color="light" onClick={() => handleSocialLogin('google')}>
                    <FaGoogle className="mr-2" />
                    Google
                  </Button>
                  <Button color="light" onClick={() => handleSocialLogin('facebook')}>
                    <FaFacebook className="mr-2" />
                    Facebook
                  </Button>
                  <Button color="light" onClick={() => handleSocialLogin('twitter')}>
                    <FaTwitter className="mr-2" />
                    Twitter
                  </Button>
                </div>
              </div>
            </form>
          </Tabs.Item>
          
          <Tabs.Item active={activeTab === 'register'} title="Register">
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
                  <Label htmlFor="register-email" value="Email" />
                </div>
                <TextInput
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
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
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confirm-password" value="Confirm Password" />
                </div>
                <TextInput
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="agree"
                  name="agreeToTerms"
                  checked={registerData.agreeToTerms}
                  onChange={handleRegisterChange}
                  required
                />
                <Label htmlFor="agree">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
                </Label>
              </div>
              <Button type="submit">Create account</Button>
              
              <div className="my-4 text-center">
                <p className="text-sm text-gray-500 mb-3">Or register with</p>
                <div className="flex justify-center space-x-4">
                  <Button color="light" onClick={() => handleSocialLogin('google')}>
                    <FaGoogle className="mr-2" />
                    Google
                  </Button>
                  <Button color="light" onClick={() => handleSocialLogin('facebook')}>
                    <FaFacebook className="mr-2" />
                    Facebook
                  </Button>
                  <Button color="light" onClick={() => handleSocialLogin('twitter')}>
                    <FaTwitter className="mr-2" />
                    Twitter
                  </Button>
                </div>
              </div>
            </form>
          </Tabs.Item>
        </Tabs>
      </Card>
    </div>
  );
};

export default LoginRegistrationScreen;