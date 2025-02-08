import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import DogCard from "../components/DogCard";
import MatchModal from "../components/MatchModal";
import "./Favorites.css"

const Favorites = () => {
  const { favorites } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [matchedDog, setMatchedDog] = useState(null);

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

      {matchedDog && (
              <div className="matched-section">
                <h3 className="text-center">✨ Your Perfect Match ✨</h3>
                <DogCard dog={matchedDog} />
              </div>
      )}

      <div className="row">
        {favorites.length > 0 ? (
          favorites.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
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
