import { useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/logo.png";

function GetStarted() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="left">
        <div className="logo-container">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="logo-text">OnAir</div>
      </div>
      <div className="right">
        <div className="content">
          <h1>Get Started</h1>
          <button className="btn logInBtn" onClick={() => navigate("/login")}>
            Log In
          </button>
          <button className="btn createAccountBtn">Create an Account</button>
          <div className="links">
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
