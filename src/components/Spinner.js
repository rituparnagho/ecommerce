import React from 'react';
import { RingLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="spinner-container" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <RingLoader color={'black'} loading={true} size={100} />
    </div>
  );
};

export default Spinner;