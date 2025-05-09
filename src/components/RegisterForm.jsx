import React, { useState } from 'react';
import { Button, Label, TextInput, Checkbox, Card } from 'flowbite-react';
import { HiMail, HiLockClosed, HiUser } from 'react-icons/hi';

const RegisterForm = ({ onRegister, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Call the registration handler passed down as prop
      if (onRegister) {
        onRegister(formData);
      }
    }
  };

  return (
    <Card className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
          </div>
          <TextInput
            id="name"
            name="name"
            type="text"
            icon={HiUser}
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            color={errors.name ? 'failure' : undefined}
            helperText={errors.name}
            required
          />
        </div>
        
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            name="email"
            type="email"
            icon={HiMail}
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            color={errors.email ? 'failure' : undefined}
            helperText={errors.email}
            required
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
            icon={HiLockClosed}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            color={errors.password ? 'failure' : undefined}
            helperText={errors.password}
            required
          />
        </div>
        
        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirmPassword" value="Confirm password" />
          </div>
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            icon={HiLockClosed}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            color={errors.confirmPassword ? 'failure' : undefined}
            helperText={errors.confirmPassword}
            required
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Checkbox
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
          />
          <Label htmlFor="acceptTerms" className={errors.acceptTerms ? 'text-red-500' : ''}>
            I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
          </Label>
        </div>
        
        <Button type="submit" className="w-full">Register</Button>
        
        <div className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <button 
            type="button" 
            onClick={switchToLogin} 
            className="text-blue-600 hover:underline"
          >
            Log in
          </button>
        </div>
      </form>
    </Card>
  );
};

export default RegisterForm;