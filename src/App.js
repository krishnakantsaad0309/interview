import React from 'react';
import './App.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Stepperform from "./pages/Stepperform";
import Product from "./pages/sales/Listproduct";
import Addproduct from "./pages/sales/Addproduct";
import NotFound from "./pages/NotFound";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <>
      <div className="App">
        <ToastContainer position="top-right" autoClose={3000} />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/List" element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <List />
              </ProtectedRoute>
            } />

            <Route path="/Product" element={
              <ProtectedRoute allowedRoles={["User"]}>
                <Product />
              </ProtectedRoute>
            } />

            <Route path="/Stepperform" element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Stepperform />
              </ProtectedRoute>
            } />

            <Route path="/Add-product" element={
              <ProtectedRoute allowedRoles={["User"]}>
                <Addproduct />
              </ProtectedRoute>
            } />

            {/* Fallback route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
