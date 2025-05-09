import React, { useState } from 'react';
import { Card, Button, Label, TextInput, Checkbox, Tabs } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const AuthenticationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    acceptTerms: false
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
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome</h2>
        
        <Tabs>
          <Tabs.Item active={activeTab === 0} title="Login" onClick={() => setActiveTab(0)}>
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
                  required
                  value={loginData.email}
                  onChange={handleLoginChange}
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
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
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
              <Button type="submit" className="mt-2">Log in</Button>
              <div className="text-sm text-center mt-2">
                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
              </div>
            </form>
          </Tabs.Item>
          
          <Tabs.Item active={activeTab === 1} title="Register" onClick={() => setActiveTab(1)}>
            <form className="flex flex-col gap-4" onSubmit={handleRegisterSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="username" value="Username" />
                </div>
                <TextInput
                  id="username"
                  name="username"
                  type="text"
                  placeholder="johndoe"
                  required
                  value={registerData.username}
                  onChange={handleRegisterChange}
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
                  required
                  value={registerData.email}
                  onChange={handleRegisterChange}
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
                  required
                  value={registerData.password}
                  onChange={handleRegisterChange}
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
                  required
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="acceptTerms" 
                  name="acceptTerms"
                  checked={registerData.acceptTerms}
                  onChange={handleRegisterChange}
                />
                <Label htmlFor="acceptTerms">I accept the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a></Label>
              </div>
              <Button type="submit" className="mt-2">Register</Button>
            </form>
          </Tabs.Item>
        </Tabs>
        
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 mb-0 text-center text-sm">Or continue with</p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button color="light" onClick={() => handleSocialLogin('google')}>
            <FaGoogle className="mr-2" /> Google
          </Button>
          <Button color="light" onClick={() => handleSocialLogin('facebook')}>
            <FaFacebook className="mr-2" /> Facebook
          </Button>
          <Button color="light" onClick={() => handleSocialLogin('apple')}>
            <FaApple className="mr-2" /> Apple
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AuthenticationScreen;