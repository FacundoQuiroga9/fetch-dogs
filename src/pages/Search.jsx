import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DogCard from "../components/DogCard";

import "./Search.css";

const Search = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [sortBy, setSortBy] = useState("breed:asc");
  const [dogs, setDogs] = useState([]);
  const [totalDogs, setTotalDogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

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

  useEffect(() => {
    fetchDogs(1, "", "", "", "", "breed:asc");
  }, []);

  const fetchDogs = async (page, breedFilter, zipCodeFilter, ageMinFilter, ageMaxFilter, sortFilter) => {
    const offset = (page - 1) * pageSize;
    let apiUrl = `https://frontend-take-home-service.fetch.com/dogs/search?size=${pageSize}&from=${offset}&sort=${sortFilter}`;

    if (breedFilter) apiUrl += `&breeds=${breedFilter}`;
    if (zipCodeFilter) apiUrl += `&zipCodes=${zipCodeFilter}`;
    if (ageMinFilter) apiUrl += `&ageMin=${ageMinFilter}`;
    if (ageMaxFilter) apiUrl += `&ageMax=${ageMaxFilter}`;

    try {
      const res = await fetch(apiUrl, { credentials: "include" });

      if (res.ok) {
        const data = await res.json();
        setTotalDogs(data.total);

        if (data.resultIds.length > 0) {
          const dogDetailsRes = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data.resultIds),
            credentials: "include",
          });

          if (dogDetailsRes.ok) {
            const dogsData = await dogDetailsRes.json();
            setDogs(dogsData);
          }
        } else {
          setDogs([]);
        }
      }
    } catch (error) {
      console.error("Error retrieving breeds:", error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchDogs(1, selectedBreed, zipCode, ageMin, ageMax, sortBy);
  };

  const handleNextPage = () => {
    if (currentPage * pageSize < totalDogs) {
      setCurrentPage((prev) => prev + 1);
      fetchDogs(currentPage + 1, selectedBreed, zipCode, ageMin, ageMax, sortBy);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      fetchDogs(currentPage - 1, selectedBreed, zipCode, ageMin, ageMax, sortBy);
    }
  };

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (dog) => {
    if (favorites.some((fav) => fav.id === dog.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== dog.id)); // Quitar de favoritos
    } else {
      setFavorites([...favorites, dog]); // Agregar a favoritos
    }
  };


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Search Dogs</h2>

      <div className="row mb-3 filters-row">
        <div className="col">
          <label className="form-label">Select breed:</label>
          <select className="form-select" value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
            <option value="">All breeds</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label className="form-label">Zip code:</label>
          <input
            type="text"
            className="form-control"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Example: 10001"
          />
        </div>
        <div className="col">
          <label className="form-label">Min age:</label>
          <input
            type="number"
            className="form-control"
            value={ageMin}
            onChange={(e) => setAgeMin(e.target.value)}
            placeholder="Minimum age"
          />
        </div>
        <div className="col">
          <label className="form-label">Max age:</label>
          <input
            type="number"
            className="form-control"
            value={ageMax}
            onChange={(e) => setAgeMax(e.target.value)}
            placeholder="Maximum age"
          />
        </div>
        <div className="col">
          <label className="form-label">Sort by:</label>
          <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="breed:asc">Breed (A-Z)</option>
            <option value="breed:desc">Breed (Z-A)</option>
            <option value="name:asc">Name (A-Z)</option>
            <option value="name:desc">Name (Z-A)</option>
            <option value="age:asc">Age (Low to high)</option>
            <option value="age:desc">Age (High to low)</option>
          </select>
        </div>
          <button className="fetch-btn" onClick={handleSearch}>
            Search
          </button>
      </div>

      <div className="row">
        {dogs.length > 0 ? (
          dogs.map((dog) => <DogCard key={dog.id} dog={dog} toggleFavorite={toggleFavorite} isFavorite={favorites.some((fav) => fav.id === dog.id)} />)
        ) : (
          <p className="text-center">No results found</p>
        )}
      </div>


      <div className="d-flex justify-content-between mt-1 mb-5">
        <button className="fetch-btn" onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="align-self-center">Page {currentPage}</span>
        <button className="fetch-btn" onClick={handleNextPage} disabled={currentPage * pageSize >= totalDogs}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Search;
