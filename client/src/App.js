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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
      <Router>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/tasks" element={<Tasks />} />
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
