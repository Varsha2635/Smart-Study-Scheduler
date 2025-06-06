import React from 'react'
import AuthLayout from '../components/auth/AuthLayout'
import SignupForm from '../components/auth/SignupForm'

// const handleSignup = async () => {
//   try {
//     const response = await axios.post("http://localhost:4000/api/v1/signup", {
//       name,
//       email,
//       password,
//     });
//     console.log(response.data); // success message
//     alert("Signup successful!");
//   } catch (err) {
//     console.error(err.response.data.message);
//     alert(err.response.data.message);
//   }
// };


export default function Login({setIsLoggedIn}) {
  return (
    <AuthLayout
      title={"CREATE AN ACCOUNT"}
      subtitle={"Start building better study habits for long-term success"}>
      <SignupForm setIsLoggedIn={setIsLoggedIn}/>
    </AuthLayout>
  )
}

