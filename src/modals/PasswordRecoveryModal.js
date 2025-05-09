import React, { useState } from 'react';
import { Button, Card, Label, TextInput, Tabs, Checkbox, Spinner } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple, FaTwitter } from 'react-icons/fa';

const LoginRegistrationScreen = ({ onLogin, onRegister, onSocialLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Registration form state
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [contentPreferences, setContentPreferences] = useState([]);
  
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) onLogin({ email: loginEmail, password: loginPassword, rememberMe });
    }, 1000);
  };
  
  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onRegister) onRegister({ name, email: regEmail, password: regPassword, contentPreferences });
    }, 1000);
  };
  
  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onSocialLogin) onSocialLogin(provider);
    }, 1000);
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <Tabs.Group
          style="underline"
          onActiveTabChange={(tab) => setActiveTab(tab)}
        >
          <Tabs.Item title="Login" active={activeTab === 'login'}>
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
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
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
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <><Spinner size="sm" /> Loading...</> : 'Log in'}
              </Button>
              <div className="text-sm text-center">
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
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
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="reg-email" value="Email" />
                </div>
                <TextInput
                  id="reg-email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="reg-password" value="Password" />
                </div>
                <TextInput
                  id="reg-password"
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confirm-password" value="Confirm Password" />
                </div>
                <TextInput
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="accept"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  required
                />
                <Label htmlFor="accept">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    terms and conditions
                  </a>
                </Label>
              </div>
              <div>
                <Label value="Content Preferences (Optional)" />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['News', 'Sports', 'Entertainment', 'Technology', 'Science', 'Health'].map((pref) => (
                    <div key={pref} className="flex items-center gap-2">
                      <Checkbox
                        id={`pref-${pref}`}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setContentPreferences([...contentPreferences, pref]);
                          } else {
                            setContentPreferences(contentPreferences.filter(p => p !== pref));
                          }
                        }}
                      />
                      <Label htmlFor={`pref-${pref}`}>{pref}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <Button type="submit" disabled={isLoading || !acceptTerms}>
                {isLoading ? <><Spinner size="sm" /> Creating Account...</> : 'Create Account'}
              </Button>
            </form>
          </Tabs.Item>
        </Tabs.Group>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button color="light" onClick={() => handleSocialLogin('google')}>
              <FaGoogle className="mr-2" /> Google
            </Button>
            <Button color="light" onClick={() => handleSocialLogin('facebook')}>
              <FaFacebook className="mr-2" /> Facebook
            </Button>
            <Button color="light" onClick={() => handleSocialLogin('apple')}>
              <FaApple className="mr-2" /> Apple
            </Button>
            <Button color="light" onClick={() => handleSocialLogin('twitter')}>
              <FaTwitter className="mr-2" /> Twitter
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginRegistrationScreen;