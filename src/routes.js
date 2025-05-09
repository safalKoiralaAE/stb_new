// src/routes.js
import React from 'react';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginRegistrationScreen from './screens/Login/RegistrationScreen/Login/RegistrationScreen';
import MainScreen from './screens/MainScreen';

const routes = [
  { path: '/', element: <HomeScreen /> },
  { path: '/login', element: <LoginRegistrationScreen /> },
  { path: '/main', element: <MainScreen /> }
];

export default routes;