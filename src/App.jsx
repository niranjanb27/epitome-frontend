import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ChemistDashboard from "./pages/ChemistDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";

/* 🔒 Protected Route Component */
function ProtectedRoute({ children, role }) {
  const { userRole } = useAuth();

  if (!userRole) {
    return <Navigate to="/" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* App Wrapper */}
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Login />} />

            {/* Admin Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Chemist Route */}
            <Route
              path="/chemist"
              element={
                <ProtectedRoute role="chemist">
                  <ChemistDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
