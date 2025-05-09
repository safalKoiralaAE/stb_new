// src/routes.js
import React from 'react';

// Import page components
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AuthenticationScreen from './screens/AuthenticationScreen/AuthenticationScreen';
import ProfileManagementScreen from './screens/ProfileManagementScreen/ProfileManagementScreen';
import MainScreen from './screens/MainScreen';

const routes = [
  { path: '/', element: <HomeScreen /> },
  { path: '/auth', element: <AuthenticationScreen /> },
  { path: '/profiles', element: <ProfileManagementScreen /> },
  { path: '/main', element: <MainScreen /> }
];

export default routes;