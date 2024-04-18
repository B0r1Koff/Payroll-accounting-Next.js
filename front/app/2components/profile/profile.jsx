import React from 'react';
import styles from './profile.css'; 
import { useEffect, useRef } from 'react';

const Profile = ({ isOpen, onClose }) => {

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, onClose]);
  
  return (
    <div ref={dropdownRef} className={`${"profileDropdown"} ${isOpen ? "open" : ""}`}>
        <h1>Profile</h1>
    </div>
  );
};

export default Profile;