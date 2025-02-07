import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [sortBy, setSortBy] = useState("breed:asc"); // Default: Ordenar por raza ascendente
  const [dogs, setDogs] = useState([]);
  const [totalDogs, setTotalDogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Obtener lista de razas disponibles
  useEffect(() => {
    fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setBreeds(data))
      .catch((error) => console.error("Error obteniendo razas:", error));
  }, []);

  // Fetch automático de todos los perros al cargar la página
  useEffect(() => {
    fetchDogs(1, "", "", "", "", "breed:asc"); // Sin filtros al inicio
  }, []);

  const fetchDogs = async (page, breedFilter, zipCodeFilter, ageMinFilter, ageMaxFilter, sortFilter) => {
    const offset = (page - 1) * pageSize;
    let apiUrl = `https://frontend-take-home-service.fetch.com/dogs/search?size=${pageSize}&from=${offset}&sort=${sortFilter}`;

    // Agregar filtros dinámicamente
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
      console.error("Error en la búsqueda de perros:", error);
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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Buscar Perros</h2>

      {/* Filtros */}
      <div className="mb-3">
        <label className="form-label">Selecciona una Raza:</label>
        <select className="form-select" value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
          <option value="">Todas las Razas</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>

        <label className="form-label mt-3">Código Postal:</label>
        <input
          type="text"
          className="form-control"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Ejemplo: 10001"
        />

        <label className="form-label mt-3">Edad mínima:</label>
        <input
          type="number"
          className="form-control"
          value={ageMin}
          onChange={(e) => setAgeMin(e.target.value)}
          placeholder="Edad mínima"
        />

        <label className="form-label mt-3">Edad máxima:</label>
        <input
          type="number"
          className="form-control"
          value={ageMax}
          onChange={(e) => setAgeMax(e.target.value)}
          placeholder="Edad máxima"
        />

        <label className="form-label mt-3">Ordenar por:</label>
        <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="breed:asc">Raza (A-Z)</option>
          <option value="breed:desc">Raza (Z-A)</option>
          <option value="name:asc">Nombre (A-Z)</option>
          <option value="name:desc">Nombre (Z-A)</option>
          <option value="age:asc">Edad (Menor a Mayor)</option>
          <option value="age:desc">Edad (Mayor a Menor)</option>
        </select>

        <button className="btn btn-primary mt-3" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {/* Resultados */}
      <div className="row">
        {dogs.length > 0 ? (
          dogs.map((dog) => (
            <div key={dog.id} className="col-md-4 mb-4">
              <div className="card h-100 d-flex flex-column">
                <img
                  src={dog.img}
                  className="card-img-top"
                  alt={dog.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{dog.name}</h5>
                    <p className="card-text"><strong>Edad:</strong> {dog.age} años</p>
                    <p className="card-text"><strong>Raza:</strong> {dog.breed}</p>
                    <p className="card-text"><strong>Código Postal:</strong> {dog.zip_code}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No se encontraron resultados</p>
        )}
      </div>

      {/* Paginación */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span className="align-self-center">Página {currentPage}</span>
        <button className="btn btn-secondary" onClick={handleNextPage} disabled={currentPage * pageSize >= totalDogs}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Search;
