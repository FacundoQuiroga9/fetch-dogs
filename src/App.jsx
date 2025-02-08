import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites"; 
import Navbar from "./components/Navbar";

import { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
