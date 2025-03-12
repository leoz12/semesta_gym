import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
import PersonalTrainer from './pages/PersonalTrainer';
import Transactions from './pages/Transactions';
import Courses from './pages/Courses';
import { useAuth } from './contexts/AuthContext';
import DataAnggota from './pages/DataAnggota';
import Home from './pages/Home';
import Map from './pages/Map';
import About from './pages/About';
import Register from './pages/Register';
import RegisterAnggota from './pages/RegisterAnggota';
import RegisterTrainer from './pages/RegisterTrainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><PersonalTrainer /></PrivateRoute>} />
        <Route path="/personal-trainer" element={<PrivateRoute><PersonalTrainer /></PrivateRoute>} />
        <Route path="/members" element={<PrivateRoute><DataAnggota /></PrivateRoute>} />
        <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
        <Route path="/" element={<Home/>} />
        <Route path="/map" element={<Map/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/register-anggota" element={<RegisterAnggota/>} />
        <Route path="/register-trainer" element={<RegisterTrainer/>} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default App;