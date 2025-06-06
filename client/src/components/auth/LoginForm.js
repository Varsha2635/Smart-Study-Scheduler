import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/api';  

export default function LoginForm({setIsLoggedIn}) {
      const navigate= useNavigate();
      const [formData, setFormData] = useState({
            email:'',
            password:'',
      })
      const handleLogin = async (e) =>{
            e.preventDefault();
            try{
                  const res = await loginUser(formData.email, formData.password);
                  console.log("Login Success:",res.data);

                  //if login is successful
                  setIsLoggedIn(true);
                  navigate('/dashboard');
            }
            catch(err){
                  console.error("Login Failed:", err.response?.data?.message || err.message);
                  alert("Login failed. Please check your credentials.");
                  
            }
      };

      // const handleSUbmit = (e) =>{
      //       e.preventDefault();
      //       //Todo: Implement actual authentication
      //       // on success
      //       setIsLoggedIn(true);
      //       navigate('/dashboard');
      // }
  return (
      <form onSubmit={handleLogin} className='space-y-6'>
            <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                  </label>
                  <input 
                     type='email'
                     id='email'
                     className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 
                     shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 '
                     value={formData.email}
                     onChange={(e) => setFormData({...formData,email:e.target.value})}/>
            </div>
            <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        password
                  </label>
                  <input 
                     type='password'
                     id='password'
                     className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 
                     shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 '
                     value={formData.password}
                     onChange={(e) => setFormData({...formData,password:e.target.value})}/>
            </div>

            <div className='flex items-center justify-between'>
                  <div className='text-sm'>
                        <Link to="/forgot-password" 
                        className="font-medium text-blue-600 hover:text-blue-500"> 
                              Forgot Your password?
                        </Link>
                  </div>
            </div>

            <button type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent 
            rounded-lg shadow-sm text-sm font-medium text-white
             bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                  Sign in 
            </button>

            <div className='text-center text-sm'>
                  <span className='text-gray-600'>
                        Don't have an account?
                  </span>
                  <Link to="/signup" 
                  className='font-medium text-blue-600 hover:text-blue-500'>
                        Sign up
                  </Link>
            </div>
      </form>
  )
}
