// src/routes.js
import React from 'react';
import AuthenticationScreen from './screens/AuthenticationScreen/AuthenticationScreen';
import MainScreen from './screens/MainScreen';

const routes = [
  { path: '/', element: <AuthenticationScreen /> },
  { path: '/main', element: <MainScreen /> },
];

export default routes;