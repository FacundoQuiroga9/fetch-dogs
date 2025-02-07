import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setBreeds(data))
      .catch((error) => console.error("Error obteniendo razas:", error));
  }, []);

  const handleSearch = () => {
    fetch(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${selectedBreed}&size=10`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setDogs(data.resultIds))
      .catch((error) => console.error("Error en la búsqueda de perros:", error));
  };

  return (
    <div className="container">
      <h2>Buscar Perros</h2>
      <select onChange={(e) => setSelectedBreed(e.target.value)}>
        <option value="">Todas las Razas</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>
      <button onClick={handleSearch}>Buscar</button>
      <div>
        {dogs.length > 0 ? (
          <ul>
            {dogs.map((dogId) => (
              <li key={dogId}>{dogId}</li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
};

export default Search;
