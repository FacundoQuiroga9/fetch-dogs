import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./DogCard.css";

const DogCard = ({ dog }) => {
  const { favorites, toggleFavorite } = useContext(AuthContext);

  // Verificar si el perro ya está en la lista de favoritos
  const isFavorite = favorites.some((fav) => fav.id === dog.id);

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div className="dog-card">
        <img src={dog.img} alt={dog.name} className="dog-img" />

        <div className="dog-name">{dog.name}</div>

        <div className="dog-info">
          <p><strong>Breed:</strong> {dog.breed}</p>
          <p><strong>Age:</strong> {dog.age} years</p>
          <p><strong>Zipcode:</strong> {dog.zip_code}</p>

          {/* Botón de favorito */}
          <button
            className={`favorite-btn ${isFavorite ? "favorite" : ""}`}
            onClick={() => toggleFavorite(dog)}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
