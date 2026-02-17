import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Trainers from './pages/Trainers';
import MembershipPlans from './pages/MembershipPlans';
import Attendance from './pages/Attendance';
import Payments from './pages/Payments';
import Classes from './pages/Classes';
import Settings from './pages/Settings';

/* ── Dashboard shell (sidebar + header + nested routes) ── */
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-dark-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Routes>
            {/* Default: /dashboard → Dashboard page */}
            <Route index element={<Dashboard />} />
            <Route path="members"    element={<Members />} />
            <Route path="trainers"   element={<Trainers />} />
            <Route path="plans"      element={<MembershipPlans />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="payments"   element={<Payments />} />
            <Route path="classes"    element={<Classes />} />
            <Route path="settings"   element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

/* ── Root router ── */
function App() {
  return (
    <Routes>
      {/* Public: Login lives at / */}
      <Route path="/" element={<Login />} />

      {/* Protected: everything under /dashboard/* */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />

      {/* Catch-all: redirect unknown paths to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
