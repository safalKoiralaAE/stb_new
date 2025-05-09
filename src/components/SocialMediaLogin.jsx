import React, { useState } from 'react';
import { Button, Card, Checkbox, Label, TextInput, Tabs, Toast } from 'flowbite-react';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';

const AuthenticationScreen = ({ onLogin, onRegister, onForgotPassword }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      if (onLogin) {
        onLogin({ email, password, rememberMe });
      }
    } else {
      setToastMessage('Please enter both email and password');
      setShowToast(true);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (email && password && name && confirmPassword) {
      if (password !== confirmPassword) {
        setToastMessage('Passwords do not match');
        setShowToast(true);
        return;
      }
      if (onRegister) {
        onRegister({ name, email, password });
      }
    } else {
      setToastMessage('Please fill in all fields');
      setShowToast(true);
    }
  };

  const handleSocialLogin = (provider) => {
    if (onLogin) {
      onLogin({ provider });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome</h2>
        
        <Tabs.Group 
          style="underline" 
          onActiveTabChange={(tab) => setActiveTab(tab)}
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
              <Button type="submit" className="mt-2">Sign in</Button>
              <div className="text-sm text-center">
                <Button 
                  color="light" 
                  size="xs" 
                  onClick={() => onForgotPassword && onForgotPassword()}
                >
                  Forgot Password?
                </Button>
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
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confirm-password" value="Confirm Password" />
                </div>
                <TextInput
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="mt-2">Create Account</Button>
            </form>
          </Tabs.Item>
        </Tabs.Group>
        
        <div className="mt-4">
          <div className="flex items-center justify-center mb-4">
            <hr className="w-full" />
            <span className="px-3 text-gray-500 bg-white">or continue with</span>
            <hr className="w-full" />
          </div>
          
          <div className="flex gap-2 justify-center">
            <Button color="light" onClick={() => handleSocialLogin('google')}>
              <FaGoogle className="mr-2" /> Google
            </Button>
            <Button color="light" onClick={() => handleSocialLogin('apple')}>
              <FaApple className="mr-2" /> Apple
            </Button>
            <Button color="light" onClick={() => handleSocialLogin('facebook')}>
              <FaFacebook className="mr-2" /> Facebook
            </Button>
          </div>
        </div>
      </Card>
      
      {showToast && (
        <Toast className="fixed bottom-4 right-4" onDismiss={() => setShowToast(false)}>
          <div className="ml-3 text-sm font-normal">{toastMessage}</div>
          <Toast.Toggle />
        </Toast>
      )}
    </div>
  );
};

export default AuthenticationScreen;