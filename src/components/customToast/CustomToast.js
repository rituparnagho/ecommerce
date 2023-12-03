import React, { useState, useEffect } from 'react';
import './CustomToast.css';

const CustomToast = ({ message, type, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <div className={`custom-toast ${type} ${visible ? 'visible' : 'hidden'}`}>
      {message}
    </div>
  );
};

export default CustomToast;
