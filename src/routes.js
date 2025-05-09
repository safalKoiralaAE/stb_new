// src/routes.js
import React from 'react';
// Import your page components
import AuthenticationScreen from './screens/AuthenticationScreen/AuthenticationScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import MainScreen from './screens/MainScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen/VideoPlayerScreen';

const routes = [
  { path: '/', element: <HomeScreen /> },
  { path: '/auth', element: <AuthenticationScreen /> },
  { path: '/main', element: <MainScreen /> },
  { path: '/player', element: <VideoPlayerScreen /> }
];

export default routes;