import React, {useState} from "react";
import {axiosWithAuth} from '../utils/AxiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
      username: '',
      password: ''
  });

  const handleChange = e => {
      setCredentials({
          ...credentials,
          [e.target.name]: e.target.value
      });
  };

  const handleSubmit = e => {
      e.preventDefault();
      axiosWithAuth().post('/login', credentials)
      .then(res => {
          console.log(res);
          localStorage.setItem('token', res.data.payload);
          props.history.push('/bubble');
      })
      .catch(err => console.log(err))
  };


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div className='formDiv'>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

            <div className='labelinput'>
            <label htmlFor='username'>Username:</label>
                <input
                    type="text" 
                    name="username"
                    id="username"
                    placeholder="Username" 
                    value={credentials.username} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div className='labelinput'>
            <label htmlFor='password'>Password:</label>
                <input
                    type="password" 
                    name="password"
                    id="password"
                    placeholder="Password" 
                    value={credentials.password} 
                    onChange={handleChange} 
                    required 
                />    
            </div>
    
                <button type='submit'>Log In</button>
            
        </form>
        </div>
    </>
  );
};

export default Login;