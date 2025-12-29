import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ChemistDashboard from "./pages/ChemistDashboard";
import CustomerSupport from "./pages/CustomerSupport";
import { AuthProvider, useAuth } from "./context/AuthContext";

/* 🔒 Protected Route Component */
function ProtectedRoute({ children, role }) {
  const { userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Dashboard */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Chemist Dashboard */}
            <Route
              path="/chemist"
              element={
                <ProtectedRoute role="chemist">
                  <ChemistDashboard />
                </ProtectedRoute>
              }
            />

            {/* Customer Support (Admin + Chemist) */}
            <Route
              path="/support"
              element={
                <ProtectedRoute>
                  <CustomerSupport />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
