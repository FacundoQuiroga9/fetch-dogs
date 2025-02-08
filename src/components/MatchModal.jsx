import { useEffect, useState } from "react";
import "./MatchModal.css";

const MatchModal = ({ favorites, onClose, setMatchedDog }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDog, setSelectedDog] = useState(null);

  useEffect(() => {
    if (favorites.length === 0) return;

    let counter = 0;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % favorites.length);
      counter++;
      if (counter >= 10) {
        clearInterval(interval);
        const randomDog = favorites[Math.floor(Math.random() * favorites.length)];
        setSelectedDog(randomDog);
        setMatchedDog(randomDog);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [favorites, setMatchedDog]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {selectedDog ? (
          <div className="match-result">
            <h2>🐶 Your Match is {selectedDog.name}! 🎉</h2>
            <img src={selectedDog.img} alt={selectedDog.name} className="match-img" />
            <button className="fetch-btn close" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <div className="spinning">
            <h2>Finding your perfect match...</h2>
            <img src={favorites[currentIndex]?.img} alt="Selecting" className="spinning-img" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchModal;
