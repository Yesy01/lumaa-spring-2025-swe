import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

const App: React.FC = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={token ? <Tasks /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={token ? <Navigate to="/tasks" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
