import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Favorites = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h2 className="text-center">My Favorite Dogs</h2>
      <p className="text-center">Here you will see your saved favorite dogs.</p>
    </div>
  );
};

export default Favorites;
