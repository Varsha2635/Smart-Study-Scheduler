import React from 'react'
import { BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// interface AuthLayoutProps{
//       children:React.ReactNode;
//       title: string;
//       subtitle: String;
// }

export default function AuthLayout({children,title,subtitle}) {
      const navigate = useNavigate();

      const goToHome = () =>{
            navigate('/')
      };
  return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                  <div className='text-center mb-8'>
                        <button 
                        onClick={goToHome}
                        className="inline-flex items-center 
                        gap-2 text-2xl font-bold text-blue-600">
                              <BookOpen className='h-8 w-8'/>
                              <span>Smart Study</span>
                        </button>
                        <h1 className='text-2xl font-bold text-gray-900 mt-6 mb-2'>
                              {title}
                        </h1>
                        <p className='text-gray-600'>
                              {subtitle}
                        </p>
                  </div>
                  <div className='bg-white rounded-xl shadow-xl p-8'>
                        {children}
                  </div>
            </div>
      </div>
  )
}
