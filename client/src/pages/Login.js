import React from 'react'
import AuthLayout from '../components/auth/AuthLayout'
import LoginForm from '../components/auth/LoginForm'

export default function Login({setIsLoggedIn}) {
  return (
    <AuthLayout
      title={"WELCOME BACK !! "}
      subtitle={"Sign in to your account to continue"}>
      <LoginForm setIsLoggedIn={setIsLoggedIn}/>
    </AuthLayout>
  )
}
