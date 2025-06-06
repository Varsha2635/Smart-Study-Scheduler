import React,{useState, useEffect} from 'react'
import { Menu, X, BookOpen, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({isLoggedIn}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  const handleLoginClick  = () =>{
      if(isLoggedIn){
            navigate('/dashboard');
      }
      else{
            navigate('/login');
      }
  }

  const handleSignupClick = () =>{
      navigate('/signup')
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);   
  return (
    <header
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}>
            <div className="container mx-auto px-4 md:px-6">
                  <div className="flex items-center justify-between">
                        <div className='flex items-center pl-2 '>
                              <BookOpen className='h-8 w-8 text-blue-600 mr-2'/>
                              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    SmartStudy
                              </span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Features
                              </a>
                              <a href="#getting-started" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Getting Started
                              </a>
                              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Testimonials
                              </a>
                              <button onClick={handleLoginClick}
                              className='bg-transparent border border-blue-600 text-blue-600 
                              px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors'>
                                    Log In
                              </button>
                              <button onClick={handleSignupClick}
                              className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors 
                              shadow-md hover:shadow-lg transform hover:-translate-y-0.5'>
                                    Sign Up
                              </button>
                        </nav>

                        {/* mobile new button */}
                        <button   //this button is only visble on small screen hidden on medium and large screens
                        className='md:hidden text-gray-700'
                        onClick={()=> setIsOpen(!isOpen)}
                        aria-label='Toggle menu'
                        >
                              {isOpen? <X className='h-6 w-6'/> :<Menu className='h-6 w-6'/>}
                        </button>

                  </div>

                  {/* Mobile Navigation  */}
                  {isOpen && (
                        <nav className='md:hidden mt-4 pb-4 space-y-4 flex flex-col'>
                              <a href='#features'
                              className='text-gray-700 hover:text-blue-600 transition-colors'
                              onClick={()=>setIsOpen(false)}>
                                    Features
                              </a>
                              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors"
                               onClick={()=>setIsOpen(false)}>
                                    How It Works
                              </a>
                              <a href="#testimonials" 
                              className="text-gray-700 hover:text-blue-600 transition-colors"
                               onClick={()=>setIsOpen(false)}>
                                    Testimonials
                              </a>
                              <button  onClick={handleLoginClick}
                              className='bg-transparent border border-blue-600 text-blue-600 
                              px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors'>
                                  Log In
                              </button>
                              <button onClick={handleSignupClick}
                              className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 
                              transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5'>
                                    Sign Up
                              </button>

                        </nav>
                  )}


            </div>
      </header>
  )
}

