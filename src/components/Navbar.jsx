import "./Navbar.css"
import logo from "../assets/logo.png"

const Navbar = ()=>{
  return(
    <div className="navbar container">
      <img src={logo} alt="fetch logo" className="fetch-logo"/>
      <button className="fetch-btn">Logout</button>
    </div>
  )
}


export default Navbar
