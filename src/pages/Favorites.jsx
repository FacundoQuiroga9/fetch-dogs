import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DogCard from "../components/DogCard";

const Favorites = () => {
  const { favorites } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h2 className="text-center">My Favorite Dogs</h2>
      <p className="text-center">Here you will see your saved favorite dogs.</p>

      <div className="row">
        {favorites.length > 0 ? (
          favorites.map((dog) => <DogCard key={dog.id} dog={dog} />)
        ) : (
          <p className="text-center">No favorite dogs added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
