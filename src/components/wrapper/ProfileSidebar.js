import React from 'react';
import './ProfileSidebar.css'; // Create a corresponding CSS file for styling
import { FaTimes } from 'react-icons/fa';

const ProfileSidebar = ({ onClose, firstname, lastname, onLogout }) => {
  // You can add the content for the profile sidebar here
  return (
    <div className="profile-sidebar">
        <div style={{display:"flex" , gap:"50%"}}>
      <h3>User Profile</h3>
      <button onClick={onClose}><FaTimes/></button>
      </div>
      welcome {firstname}{lastname}
      
      <div>
      <button className='logout' onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileSidebar;