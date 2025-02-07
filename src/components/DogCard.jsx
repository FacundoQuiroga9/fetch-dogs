import "./DogCard.css";

const DogCard = ({ dog }) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4"> {/* Usa Bootstrap grid */}
      <div className="dog-card">
        {/* Imagen del perro */}
        <img src={dog.img} alt={dog.name} className="dog-img" />

        {/* Nombre del perro con diseño semicircular */}
        <div className="dog-name">{dog.name}</div>

        {/* Información oculta que se muestra al hacer hover */}
        <div className="dog-info">
          <p><strong>Breed:</strong> {dog.breed}</p>
          <p><strong>Age:</strong> {dog.age} years</p>
          <p><strong>Zipcode:</strong> {dog.zip_code}</p>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
