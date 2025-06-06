import React from 'react'
import { Calendar, UserPlus, BookOpen, Trophy } from 'lucide-react';


//step component
const Step =({number, title, description, icon }) =>{
      return(
            <div className='flex flex-col items-center text-center md:flex-row md:text-left md:items-start'>
                  <div className='flex-shrink-0 mb-5 md:mb-0 md:mr-6'>
                        <div className='relative'>
                              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
                                    {icon}
                              </div>
                              <div className='absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold'>
                                    {number}
                              </div>
                        </div>
                  </div>
                  <div>
                        <h3 className='text-xl font-semibold mb-2 text-gray-900'>
                              {title}
                        </h3>
                        <p className='text-gray-600'>
                              {description}
                        </p>
                  </div>
            </div>
      );
};

export default function HowItWorks() {
      const steps=[
            {
                  number:1,
                  title:"Create Your Account",
                  description:"Sign up and create your student profile by adding your courses, study preferences, and academic goals to enable a personalized learning experience.",
                  icon: <UserPlus className='h-6 w-6 text-blue-600'/>
            },
            {
                  number:2,
                  title:"Build Your SChedule",
                  description:"Our AI analyzes your inputs to create a personalized study schedule optimized for your learning style.",
                  icon: <Calendar className='h-6 w-6 text-blue-600'/>
            },
            {
                  number:3,
                  title:"Study Smarter",
                  description:"Stick to your personalized schedule, monitor your progress, and make adjustments to stay on track and achieve optimal results.",
                  icon: <BookOpen  className='h-6 w-6 text-blue-600'/>
            },
            {
                  number:4,
                  title:"Achieve Your Goals",
                  description:"Improve your academic performance by building effective study habits and mastering time management.",
                  icon: <Trophy  className='h-6 w-6 text-blue-600'/>
            }
            
            
      ]
  return (
      <section id='getting-started' className='py-20 bg-white'>
            <div className='container mx-auto px-4 md:px-6 lg:px-8'>
                  <div className='text-center mb-16'>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                              Getting {" "}
                              <span className='text-blue-600'>
                                    Started
                              </span>
                        </h2>
                        <p className='text-lg text-gray-700 max-w-2xl mx-auto'>
                            A simple 4-step process to transform your studying habits and improve your academic performance.  
                        </p>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto'>
                        {steps.map((step)=>(
                              <Step 
                                   key={step.number}
                                   number={step.number}
                                   title={step.title}
                                   description={step.description}
                                   icon={step.icon}
                              />
                        ))}
                  </div>
            </div>
      </section>
  )
}
