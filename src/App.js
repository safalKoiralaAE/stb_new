// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import Layout from './components/layout'; // Import the Layout component

function App() {
  return (
    <div className="App">
      <main className="app-content">
        <Router>
          <Layout> {/* Wrap the Routes with Layout */}
            <Routes>
              {routes.map(({ path, element }, index) => (
                <Route key={index} path={path} element={element} />
              ))}
            </Routes>
          </Layout>
        </Router>
      </main>
    </div>
  );
}

export default App;
