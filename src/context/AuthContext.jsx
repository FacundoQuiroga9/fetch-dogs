import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Cambiado a null para indicar estado de carga

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
          credentials: "include",
        });
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error al verificar la autenticación:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (name, email, navigate) => {
    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(true);
        navigate("/search");
      } else {
        alert("Error en la autenticación");
      }
    } catch (error) {
      console.error("Error en la solicitud de autenticación:", error);
    }
  };

  const logout = async (navigate) => {
    await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
