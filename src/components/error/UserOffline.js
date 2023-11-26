import React from "react";
import "./UserOffline.css";
import offline from "../../images/offline.png";

const UserOffline = () => {
  return (
    <div className="offline-container">
      <h1 className="user-offline-heading">🔴 Offline!</h1>
      <img src={offline} alt="Offline" className="offline-img"/>
      <p className="user-offline-message">
        Sorry, it seems that you are currently offline.
      </p>
    </div>
  );
};

export default UserOffline;
