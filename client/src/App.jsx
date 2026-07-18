import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './components/auth/Layout';
import RegisterUser from './pages/auth/RegisterUser';
import LoginUser from './pages/auth/loginUser';
import ProtectedRoutes from './components/protectedRoute/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Transactions from './pages/Transactions';
import DashboardLayout from './components/dashboardLayout/Layout';

function App() {
  const token = sessionStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route element={<Auth />}>
          <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <LoginUser />} />
          <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <RegisterUser />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;