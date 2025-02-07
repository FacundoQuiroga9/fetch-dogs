import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css"

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ Se usa aquí, dentro de un componente dentro de <Router>
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(name, email, navigate); // ✅ Se pasa `navigate` como argumento
  };

  return (
    <div className="container mt-5">
      <div className="row w-50 login-container">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <input className="form-control" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col">
              <input className="form-control" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="col d-flex justify-content-center">
            <button className="fetch-btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Login;
