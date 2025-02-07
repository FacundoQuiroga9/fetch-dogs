import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [favorites, setFavorites] = useState([]); // Lista global de favoritos

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
        console.error("Authentication verification error", error);
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
        alert("Authentication error");
      }
    } catch (error) {
      console.error("Authentication request error", error);
    }
  };

  const logout = async (navigate) => {
    await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
    setFavorites([]); // Limpiar favoritos al cerrar sesión
    navigate("/");
  };

  // Función para añadir o quitar favoritos
  const toggleFavorite = (dog) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === dog.id);

      if (isAlreadyFavorite) {
        return prevFavorites.filter((fav) => fav.id !== dog.id);
      } else {
        return [...prevFavorites, dog];
      }
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, favorites, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};
