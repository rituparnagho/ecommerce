import React from "react";
import "./UserOffline.css";
// import offline from "../../images/offline.png";

const UserOffline = () => {
  return (
    <div className="offline-container">
      <h1 className="user-offline-heading">🔴 Offline!</h1>
      <img src="https://t4.ftcdn.net/jpg/04/35/65/05/360_F_435650529_fdtx8euYTrcxH5NEAWONH2zQYOEWfgrA.webp" alt="Offline" className="offline-img"/>
      <p className="user-offline-message">
        Sorry, it seems that you are currently offline.
      </p>
    </div>
  );
};

export default UserOffline;
