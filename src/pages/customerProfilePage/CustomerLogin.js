import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import social2 from "../../images/social2.png"
import star from "../../images/star.png"
import remember from "../../images/remember.png"
import forgot from "../../images/forgot.png"
import require from "../../images/require.png"
import customer from "../../images/customer.png"

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
    <div className="container">
      <h2 className='login-header'>Customer Login</h2>
      <div className="customer-wrapper" >

        <div style={{width:"525px", marginLeft:"15px"}}>
          <div className='social-signin' >
           
              Sign in with social media
         
          </div>
          <div className='social-image'>
            <img src={social2}/>
          </div>
        </div>


        <div className="form-wrapper" >
    <p style={{fontSize:"10px", marginBottom:"26px"}}>Registered Customer</p>
    <p style={{fontSize:"14px",marginBottom:"15px"}}>If you have an account, sign in with your email address.</p>
          <form onSubmit={handleSubmit}  style={{width:"377px"}}>
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
            <img src={customer} className='new-customer'/>
            <Link to="/customer/account/create">
            <button  style={{backgroundColor:"black", color:"#fff",height:'35px', width:"163px", fontSize:"15px"}}>Create an Account</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;