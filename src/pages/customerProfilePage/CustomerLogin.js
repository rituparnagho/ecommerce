import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import social2 from "../../images/social2.png"
import star from "../../images/star.png"
import remember from "../../images/remember.png"
import forgot from "../../images/forgot.png"
import require from "../../images/require.png"
import customer from "../../images/customer.png"
import { TiSocialFacebook } from "react-icons/ti";
import { PiInstagramLogo } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // const [tokendata, setTokendata] = useState({})

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const graphqlEndpoint = '/graphql';

    const mutation = `
      mutation {
        generateCustomerToken(
          email: "${formData.email}"
          password: "${formData.password}"
        ) {
          token
        }
      }
    `;

    try {
      const response = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
      });

      const data = await response.json();
    
      if (data.errors) {
        console.error('GraphQL error:', data.errors);
      } else {
        const token = data.data.generateCustomerToken.token;
  
        // Save the token to localStorage
        localStorage.setItem('customerToken', token);}
      console.log('GraphQL response:', data);
    } catch (error) {
      console.error('GraphQL error:', error);
    }
  };




  return (
    <div className="container-customer">
      <h2 className='login-header'>Customer Login</h2>
      <div className="customer-wrapper" >

        <div className='customer-wrapper-social'>
          <div className='social-signin' >
           
              Sign in with social media
         
          </div>
          <div className='social-image'>
            {/* <img src={social2}/> */}
            <div className='facebook-container'>
              <div className='facebook-icon-container'><TiSocialFacebook size={20}/></div>
              <div className='facebook-input-container'>Sign in with Facebook </div>
            </div>

            <div className='insta-container'>
              <div className='insta-icon-container'><PiInstagramLogo size={20}/></div>
              <div className='insta-input-container'>Sign in with Instagram </div>
            </div>

            <div className='google-container'>
              <div className='google-icon-container'><FcGoogle size={20}/></div>
              <div className='google-input-container'>Sign in with Google</div>
            </div>

          </div>
        </div>


        <div className="form-wrapper" >
    <p style={{fontSize:"10px", marginBottom:"26px"}}>Registered Customer</p>
    <p style={{fontSize:"14px",marginBottom:"15px"}}>If you have an account, sign in with your email address.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label><img src={star} style={{height:"19px"}}/>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label><img src={star} style={{height:"19px"}}/>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div> 
              <img src={remember}/>
            </div>
            <div style={{display:"flex"}}>
              <div>
              <button type="submit">Sign In</button>
              </div>
              <div>
              <img src={forgot}/>
              </div>
            </div>
            <div>
              <img src={require}/>
            </div>
          </form>
        </div>


        <div className='create-button-section'>
            {/* <h3 style={{fontSize:"25px", fontWeight:400, marginLeft:"30px"}}>New Customers</h3>
            <p style={{ marginLeft:"30px"}}>Creating an account has many benefits: check out faster, keep more than one address, track orders and more.</p> */}
            <div className='new-customer'>
              <h4  style={{fontSize:"23px" , fontWeight:500}}>New Customers</h4>
              <p  style={{fontSize:"14px",marginTop:"29px",fontWeight:100}}>Creating an account has many benefits: check out faster, keep more than one address, track orders and more.</p>
              </div>
            <Link to="/customer/account/create">
            <button  style={{backgroundColor:"black", color:"#fff",height:'35px', width:"163px", fontSize:"15px"}}>Create an Account</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;