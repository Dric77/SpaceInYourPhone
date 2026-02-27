import apiClient, { setToken } from "@/utils/apiClient";
import { useState } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (values: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post(
        "/api/users/Authentication/Login",
        values,
      );
      if (response.data?.token) {
        await setToken(response.data.token);
        return { success: true, data: response.data };
      }
      return { success: false, error: "No token received" };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (values: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post(
        "/api/users/Authentication/Register",
        values,
      );
      return { success: true, data: response.data };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    loading,
    error,
  };
};
