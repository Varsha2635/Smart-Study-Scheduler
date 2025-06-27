import React ,{useState} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import GettingStarted from "./components/GettingStarted";
import Testimonials from"./components/Testimonials";
import Ready from "./components/Ready";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tasks from"./pages/Tasks";
import { Schedule } from './pages/Schedule';

import PrivateRoute from "./components/PrivateRoute";
import Focus from "./pages/Focus";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  return (
      <Router>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </PrivateRoute>
        } />

        <Route path="/tasks" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <Tasks />
            </PrivateRoute>
        } />

        <Route path="/schedule" element={<PrivateRoute isLoggedIn={isLoggedIn}>
              <Schedule />
            </PrivateRoute>} />

        <Route path="/focus"
        element={<PrivateRoute isLoggedIn={isLoggedIn}>
              <Focus />
            </PrivateRoute>}/>
        
        <Route path="/profile"
        element={<PrivateRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </PrivateRoute>}/>

        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Header isLoggedIn={isLoggedIn}/>
            <Hero />
            <Features />
            <GettingStarted />
            <Testimonials />
            {/* <CallToAction /> */}
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
    
  );
}

export default App;
