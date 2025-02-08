import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || null
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [matchedDog, setMatchedDog] = useState(
    JSON.parse(localStorage.getItem("matchedDog")) || null
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
          credentials: "include",
        });
        if (response.ok) {
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", JSON.stringify(true));
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("isAuthenticated");
        }
      } catch (error) {
        console.error("Authentication verification error", error);
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
      }
    };

    if (isAuthenticated === null) {
      checkAuth();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("matchedDog", JSON.stringify(matchedDog));
  }, [matchedDog]);

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
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
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
    setFavorites([]);
    setMatchedDog(null);

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("favorites");
    localStorage.removeItem("matchedDog");

    navigate("/");
  };

  const toggleFavorite = (dog) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === dog.id);
      let updatedFavorites;

      if (isAlreadyFavorite) {
        updatedFavorites = prevFavorites.filter((fav) => fav.id !== dog.id);
        if (matchedDog?.id === dog.id) {
          setMatchedDog(null);
          localStorage.removeItem("matchedDog");
        }
      } else {
        updatedFavorites = [...prevFavorites, dog];
      }

      return updatedFavorites;
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, favorites, toggleFavorite, matchedDog, setMatchedDog }}>
      {children}
    </AuthContext.Provider>
  );
};
