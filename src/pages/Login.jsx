import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
