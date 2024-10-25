// Sidebar.jsx
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Add styles here

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>
        Automated <br />
        Smart Energy <br />
        Meter <br />
      </h2>
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/billing">Billing</Link>
        </li>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
