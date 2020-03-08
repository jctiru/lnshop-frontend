import React from "react";
import { Link } from "react-router-dom";

const ProfileLinks = () => {
  return (
    <div className="card">
      <h4 className="card-header">Profile Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/profile">
            Home
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/profile/update-profile">
            Update Profile
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/profile/orders">
            View Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileLinks;
