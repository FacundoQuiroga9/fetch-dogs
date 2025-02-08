import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./DogCard.css";
import heart from "../assets/heart.png";
import heartFilled from "../assets/heart-filled.png";
import star from "../assets/star.png"

const DogCard = ({ dog, isMatched }) => {
  const { favorites, toggleFavorite } = useContext(AuthContext);

  const isFavorite = favorites.some((fav) => fav.id === dog.id);

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div className="dog-card">

        {isMatched && <div className="matched-badge"><img src={star} alt="" /></div>}

        <img src={dog.img} alt={dog.name} className="dog-img" />

        <div className="dog-name">{dog.name}</div>

        <div className="dog-info">
          <p><strong>Breed:</strong> {dog.breed}</p>
          <p><strong>Age:</strong> {dog.age} years</p>
          <p><strong>Zipcode:</strong> {dog.zip_code}</p>

          <button className="favorite-btn" onClick={() => toggleFavorite(dog)}>
            <img src={isFavorite ? heartFilled : heart} alt="favorite" className="heart-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
