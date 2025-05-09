import React, { useState } from 'react';
import { Button, Label, TextInput, Checkbox, Card } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const LoginForm = ({ onLogin, onRegister, loading = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin({ email, password, rememberMe });
    }
  };

  const handleSocialLogin = (provider) => {
    if (onLogin) {
      onLogin({ provider });
    }
  };

  return (
    <Card className="max-w-sm mx-auto">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <Button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
        
        <div className="text-sm text-center mt-2">
          <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
        </div>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            color="light"
            className="w-full"
            onClick={() => handleSocialLogin('google')}
          >
            <FaGoogle className="mr-2" /> Google
          </Button>
          <Button
            color="light"
            className="w-full"
            onClick={() => handleSocialLogin('facebook')}
          >
            <FaFacebook className="mr-2" /> Facebook
          </Button>
          <Button
            color="light"
            className="w-full"
            onClick={() => handleSocialLogin('apple')}
          >
            <FaApple className="mr-2" /> Apple
          </Button>
        </div>
        
        <div className="text-sm text-center mt-2">
          Don't have an account?{' '}
          <a
            href="#"
            className="text-blue-600 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              if (onRegister) onRegister();
            }}
          >
            Register
          </a>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;