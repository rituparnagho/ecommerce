import React, { useState } from 'react';
import './Customer.css';
import createCustomer from "../../images/createCustomer.png"
import signSocial from "../../images/signSocial.png"
import star from "../../images/star.png"
import remem from "../../images/remem.png"

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    date:'',
    email: '',
    password: '',
    confirmPassword: '',
    isSubscribed: false,
    gender: '',
  });

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
    mutation{
        createCustomer(
          input: {
            firstname: "${formData.firstName}"
            lastname: "${formData.lastName}"
            date_of_birth:"${formData.date}"
            email: "${formData.email}"
            password: "${formData.password}"
            is_subscribed: true
          }
        ){
          customer{
            firstname
            lastname
            email
            is_subscribed
            gender
            date_of_birth
          }
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
    
      console.log('GraphQL response:', data);
    } catch (error) {
      console.error('GraphQL error:', error);
    }
  };

  return (
    <div className='container'>
      <div className='customer-wrapper'>
        <div className='form-wrapper'>
          <img src={createCustomer}/>
          {/* <h2 style={{ marginBottom: '14px' }}>Create An Account</h2> */}
          <form onSubmit={handleSubmit}>
            {/* <p style={{ fontSize: '22px' }}>Personal Information</p> */}
            <div className='name-row'>
              <div>
                <div style={{display:"flex"}}>
                <label htmlFor='firstName'>First Name</label>
        
                <img src={star} style={{height:"19px"}}/>
                </div>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor='middleName'>Middle Name</label>
                <input
                  type='text'
                  id='middleName'
                  name='middleName'
                  value={formData.middleName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
              <div style={{display:"flex"}}>
                <label htmlFor='lastName'>Last Name</label><img src={star} style={{height:"19px"}}/>
                </div>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div style={{marginBottom:"10px"}}>
              <input type="checkbox" name="is_subscribed" title="Sign Up for Newsletter" value="1" id="is_subscribed" style={{width:"13px", marginRight:"10px"}}/>
              <span style={{fontSize:"14px"}}>Sign Up for Newsletter</span>
            </div>
            <div><label for="date">Date Of Birth</label>
            <input type="date" id="date" name="date" value={formData.date}
                onChange={handleInputChange}
                required/>

            </div>
            <div>
              <label htmlFor='gender'>Gender</label>
              <select
                id='gender'
                name='gender'
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value=''>Select</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Rather not say'>Rather not say</option>
              </select>
            </div>
            <div>
                <label htmlFor='mobileNumber'>Mobile Number</label>
                <input
                  type='text'
                  id='mobileNumber'
                  name='mobileNumber'
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{marginBottom:"20px"}}>
              <input type="checkbox" name="is_subscribed" title="Sign Up for Newsletter" value="1" id="is_subscribed" style={{width:"13px", marginRight:"10px"}}/>
              <span style={{fontSize:"14px"}}>Allow remote shopping assistance </span>
            </div>
            <p style={{ fontSize: '22px', marginBottom: '15px', marginTop: '10px', borderBottom: '1px solid #c6c6c6',padding: "0 0 10px" }}>
              SignIn Information
            </p>
            <div style={{marginBottom:"10px"}}>
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
              <label htmlFor="password">Confirm Password</label><img src={star} style={{height:"19px"}}/>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <img src={remem}/>
            </div>
            <div>
              <button type='submit' style={{backgroundColor:"#00527b", color:"#fff",height:'35px', width:"163px", fontSize:"16px"}}>Create an Account</button>
            </div>
          </form>
        </div>

        <div style={{marginTop:"50px"}}>
         <img src={signSocial}/>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;