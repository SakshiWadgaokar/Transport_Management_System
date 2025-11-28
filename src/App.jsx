import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './features/auth/LoginPage';
import DashboardPage from './features/dashboard/DashboardPage';
import DriversPage from './features/resources/DriversPage';
import VehiclesPage from './features/resources/VehiclesPage';
import BookingPage from './features/booking/BookingPage';
import TrackingPage from './features/tracking/TrackingPage';
import { getCurrentUser } from './services/authService';

const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="drivers" element={<DriversPage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
