import React from 'react';
import "./Spinner.css"
// import { RingLoader } from 'react-spinners';

const Spinner = () => {
  return (
    // <div className="container" style={{display:"flex", justifyContent:"center", alignItems:"center" , height:"500px"}}>
    //   <RingLoader color={'black'} loading={true} size={100} />
    // </div>

    <div className="page">
        <div className="container-spinner">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
            {/* <div className="h3">loading</div> */}
        </div>
</div>
  );
};

export default Spinner;
