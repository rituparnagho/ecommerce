import React, { useState } from 'react';
import './Customer.css';
import createCustomer from "../../images/createCustomer.png"
import signSocial from "../../images/signSocial.png"
import star from "../../images/star.png"
import remem from "../../images/remem.png"
import { TiSocialFacebook } from 'react-icons/ti';
import { PiInstagramLogo } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const CreateCustomer = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    date:'',
    mobileNumber:'',
    email: '',
    password: '',
    confirmPassword: "",
    isSubscribed: false,
    gender: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const validationErrors = { ...errors };

    if (name === "firstName") {
      const namePattern = /^[a-zA-Z\s]+$/;
      if (value.length < 3) {
        validationErrors.name = "firstName must be at least 3 characters";
      } else if (!namePattern.test(value)) {
        validationErrors.firstName =
          "firstName should only contain alphabetic characters";
      } else {
        delete validationErrors.firstName;
      }
    } else if (name === "lastName") {
      const namePattern = /^[a-zA-Z\s]+$/;
      if (value.length < 3) {
        validationErrors.name = "lastName must be at least 3 characters";
      } else if (!namePattern.test(value)) {
        validationErrors.lastName =
          "lastName should only contain alphabetic characters";
      } else {
        delete validationErrors.lastName;
      }
    }
    else if (name === "mobileNumber") {
      const phoneRegex = /^\d{10}$/;
      const numberRegex = /^[0-9]+$/;
      const phoneNoRegex = /^[6-9]\d{9}$/;

      if (!numberRegex.test(value)) {
        validationErrors.mobileNumber =
          "mobile number should only contain numerical characters";
      } else if (!phoneNoRegex.test(value)) {
        validationErrors.mobileNumber = "mobile number is not valid";
      } else if (!phoneRegex.test(value)) {
        validationErrors.mobileNumber = "mobile number should contain exactly 10 digit";
      } else {
        delete validationErrors.mobileNumber;
      }
    }
    else if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(value)) {
        validationErrors.email = "Email is not valid";
      } 
        else {
          delete validationErrors.email;
        }
    } else if (name === "password") {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if (value.length < 6) {
        validationErrors.password = "Password must be at least 6 characters";
      } else if (!passwordRegex.test(value)) {
        validationErrors.password = "Password should be 6 character long,password should contain at least one uppercase letter, one lowercase letter, and one number, and one special character";
      } else {
        delete validationErrors.password;
      }
    } else if (name === "confirmPassword") {
      if (value !== formData.password) {
        validationErrors.confirmPassword = "Password doesn't not match";
      } else {
        delete validationErrors.confirmPassword;
      }
    }
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors(validationErrors);
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


      if (data) {
        navigate('/customer/account/login');
      }
    } catch (error) {
      console.error('GraphQL error:', error);
    }
  };

  return (
    <div className='container-customer'>
      <div className='customer-wrapper-signup'>
        <div className='form-wrapper-signup'>
          <h2  style={{ marginBottom: '14px' }}>Create An Account</h2>
          <form onSubmit={handleSubmit}>
            <p className='signup-para'>Personal Information</p>
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
                <div>
                {errors.name && <span style={{color:"red"}}>{errors.name}</span>}
                </div>
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
                <div>
                {errors.middleName && <span style={{color:"red"}}>{errors.middleName}</span>}
                </div>
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
                 <div>
                {errors.lastName && <span style={{color:"red"}}>{errors.lastName}</span>}
                </div>
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
                 {/* <div>
                {errors.name && <span style={{color:"red"}}>{errors.name}</span>}
                </div> */}

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
              {/* <div>
                {errors.name && <span style={{color:"red"}}>{errors.name}</span>}
                </div> */}
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
                 <div>
                {errors.mobileNumber && <span style={{color:"red"}}>{errors.mobileNumber}</span>}
                </div>
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
               <div>
               {errors.email && <span style={{color:"red"}}>{errors.email}</span>}
                </div>
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
               <div>
               {errors.password && (
              <span style={{color:"red"}}>{errors.password}</span>
            )}
                </div>
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
               <div>
               {errors.confirmPassword && (
              <span style={{color:"red"}}>{errors.confirmPassword}</span>
            )}
                </div>
            </div>
            {/* <div>
              <img src={remem}/>
            </div> */}
            <div>
              <button type='submit' style={{backgroundColor:"#00527b", color:"#fff",height:'35px', width:"163px", fontSize:"16px"}}>Create an Account</button>
            </div>
          </form>
        </div>

        <div className='customer-wrapper-social'>
          <div className='social-signup' >
           
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
      </div>
    </div>
  );
};

export default CreateCustomer;