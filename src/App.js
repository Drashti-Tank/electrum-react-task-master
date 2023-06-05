import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EditUser from './components/EditUser';

const App = () => {
  return (

    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/edituser/:id" element={<EditUser />} />
      </Routes>
    </div>

  );
};

export default App;
