import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupUser } from '../../services/api';  

export default function SignupForm({setIsLoggedIn}) {
      const navigate = useNavigate();
      const [formData, setFormData] = useState({
            name:'',
            email:'',
            password:'',
            confirmPassword:'',
      });
      const [error, setError] = useState('');


      // const handleSUbmit = (e) => {
      //       e.preventDefault();
      //       if(formData.password!== formData.confirmPassword){
      //             setError('Passwords do not match');
      //       }
      //       setIsLoggedIn(true);
      //       navigate('/dashboard')
      // }

      const handleSignup = async (e) =>{
            e.preventDefault();
            try{
                  const res = await signupUser(formData.name, formData.email, formData.password);
                  console.log("Signup Success:", res.data);
                  alert("Account created successfully!");
                  setIsLoggedIn(true);
                  navigate('/dashboard');
            }
            catch(err){
                  console.error("Signup Failed:", err.response?.data?.message || err.message);
                  alert("Signup failed. Try again.");
            }
      }

  return (
    <form onSubmit={handleSignup} className='space-y-6'>
      <div>
            <label htmlFor="name" 
            className="block text-sm font-medium text-gray-700">
                  Full Name
            </label>
            <input
                type='name'
                id='name'
                required
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 
                shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                value={formData.name}
                onChange={(e) => setFormData({...formData,
                  name:e.target.value})}
            />
      </div>
      <div>
            <label htmlFor="email" 
            className="block text-sm font-medium text-gray-700">
                  Email address
            </label>
            <input
                type='email'
                id='email'
                required
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 
                shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                value={formData.email}
                onChange={(e) => setFormData({...formData,
                  email:e.target.value})}
            />
      </div>
      <div>
            <label htmlFor="password" 
            className="block text-sm font-medium text-gray-700">
                  Password
            </label>
            <input
                type='password'
                id='password'
                required
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 
                shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                value={formData.password}
                onChange={(e) => setFormData({...formData,
                  password:e.target.value})}
            />
      </div>
      <div>
            <label  htmlFor="confirmPassword" 
            className="block text-sm font-medium text-gray-700">
                  Confirm Password
            </label>
            <input
                type='password'
                id='confirmPassword'
                required
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 
                shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData,
                  confirmPassword:e.target.value})}
            />
      </div>
      {error && (
            <div className='text-red-600 text-sm'>
                  {error}
            </div>
      )}

      <button type='submit'
      className="w-full flex justify-center py-2 px-4 border border-transparent 
      rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600
      hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Create account
      </button>

      <div className='text-center text-sm'>
            <span className='text-gray-600'>
                  Already have an account?
            </span>{' '}
            <Link to="/login" className='font-medium text-blue-600 hover:text-blue-500'>
            Sign in 
            </Link>
      </div>

    </form>
  )
}
