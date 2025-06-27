import React from 'react'
import { Calendar,Clock,BookOpen, Book } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function () {
      const navigate = useNavigate();
      const handleSignupClick = () =>{
      navigate('/signup')
      }
  return (
    <section className='pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden'>
      <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col lg:flex-row items-center'>
                  {/* Left Side Content */}
                  <div className='w-full lg:w-1/2 mb-12 lg:mb-0'>
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4'>
                            Study Smarter{", "}
                             <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                               Not Harder
                              </span>
                        </h1>
                        <p className='text-xl text-gray-600 mb-8 max-w-lg'>
                        A personal study planner that thinks ahead - so you don’t have to
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                              <button className="bg-blue-600 text-white px-8 py-3 
                                 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-blue-700 transform hover:-translate-y-0.5">
                                 Get Started
                              </button>
                              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 
                              rounded-full hover:bg-blue-50 transition-all 
                              transform hover:-translate-y-0.5">
                              Lean More
                              </button>
                        </div>
                        <div className='mt-12 grid grid-cols-3 gap-4'>
                              <div className='text-center'>
                              <p className='text-3xl font-bold text-blue-600'>
                                   85% 
                              </p>
                              <p className='text-sm text-gray-600'> Better Time Management</p>
                              </div>
                              <div className='text-center'>
                              <p className='text-3xl font-bold text-blue-600'>
                                   2x 
                              </p>
                              <p className='text-sm text-gray-600'>Study Efficiency</p>
                              </div>
                              <div className='text-center'>
                              <p className='text-3xl font-bold text-blue-600'>
                                   24/7 
                              </p>
                              <p className='text-sm text-gray-600'>Schedule Access</p>
                              </div>
                        </div>
                  </div>

                   {/* Study Schedule */}
                    <div className='w-full lg:w-1/2 relative mt-9'>
                        <div className='relative bg-white rounded-2xl shadow-xl p-6
                         max-w-md mx-auto'>
                              <div className='absolute -top-5 -right-5 bg-blue-600 text-white p-3 rounded-fuk
                               shadow-lg'>
                                    <Calendar className='h-6 w-6'/>
                              </div>
                              <h3 className='font-bold text-lg mb-4'>Your Personal Study Schedule</h3>

                              {/* Schedule Items */}
                              {[
                                    { time: '9:00 AM - 10:30 AM', subject: 'Mathematics' , icon :<BookOpen className='h-6 w-6 text-blue-600'/> },
                                    { time: '11:00 AM - 12:30 AM', subject: 'Electronics' , icon :<BookOpen className='h-6 w-6 text-green-400'/> },
                                    { time: '2:00 AM - 4:00 AM', subject: 'Computer Science' , icon :<BookOpen className='h-6 w-6 text-yellow-400'/> }
                              ].map((item, index)=>(
                                    <div
                                    key={index} 
                                    className="flex items-center p-3 mb-3 rounded-lg hover:bg-blue-50 transition-colors">
                                          <div className='mr-3'>{item.icon}</div>
                                          <div>
                                                <p className='text-sm text-gray-500'>{item.time}</p>
                                                <p className='font-medium'>{item.subject}</p>
                                          </div>
                                          <div className='ml-auto'>
                                                <Clock className='h-4 w-4 text-gray-400'/>
                                          </div>
                                    </div>
                              ))}

                              <button
                              onClick={handleSignupClick} 
                              className='w-full mt-4 bg-gray-100 text-gray-700 rounded-lg
                              py-2 text-sm hover:bg-gray-200 transition-colors '> View Full Schedule</button>
                        </div>
                  </div>

            </div>
      </div>

    </section>
  )
}
