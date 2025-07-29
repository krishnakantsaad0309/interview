import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    toast.warn("⚠️ Unauthorized Access! Redirecting...", {
      toastId: "unauthorized-warning",
    });

    const timer = setTimeout(() => {
      if (role === "Admin") navigate("/List");
      else if (role === "User") navigate("/Product");
      else navigate("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-7xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
      <p className="text-gray-600 mt-2 mb-6 text-center">
        Either the page doesn't exist or you don't have access.
      </p>
      <p className="text-sm text-gray-500">Redirecting to your allowed page...</p>
    </div>
  );
}
