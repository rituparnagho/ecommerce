import React from 'react';
import { RingLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="container" style={{display:"flex", justifyContent:"center", alignItems:"center" , height:"500px"}}>
      <RingLoader color={'black'} loading={true} size={100} />
    </div>
  );
};

export default Spinner;
