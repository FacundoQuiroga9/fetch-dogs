import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import DogCard from "../components/DogCard";
import MatchModal from "../components/MatchModal";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, matchedDog, setMatchedDog } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  // Ordenar la lista para que el matched dog siempre aparezca primero si existe
  const sortedFavorites = matchedDog
    ? [matchedDog, ...favorites.filter((dog) => dog.id !== matchedDog.id)]
    : favorites;

  return (
    <div className="container mt-5">
      <h2 className="text-center">My Favorite Dogs</h2>
      <p className="text-center">Here you will see your saved favorite dogs.</p>

      {favorites.length > 0 && (
        <div className="text-center mb-4">
          <button className="fetch-btn" onClick={() => setShowModal(true)}>
            Find My Match 🐶
          </button>
        </div>
      )}

      <div className="row">
        {sortedFavorites.length > 0 ? (
          sortedFavorites.map((dog) => (
            <DogCard key={dog.id} dog={dog} isMatched={matchedDog?.id === dog.id} />
          ))
        ) : (
          <p className="text-center">No favorite dogs added yet.</p>
        )}
      </div>

      {showModal && (
        <MatchModal
          favorites={favorites}
          onClose={() => setShowModal(false)}
          setMatchedDog={setMatchedDog}
        />
      )}
    </div>
  );
};

export default Favorites;
