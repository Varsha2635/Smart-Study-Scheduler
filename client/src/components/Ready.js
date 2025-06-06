import React from 'react'
import { CheckCircle } from 'lucide-react'

export default function Ready() {
  return (
    <section className='py-20 bg-blue-600'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
            <div className='max-w-4xl mx-auto'>
                  <div className='text-center mb-10'>
                        <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                              Ready to Transform Your Study Habits?
                        </h2>
                        <p className='text-lg  text-blue-100 mb-8'>
                            Join thousands of students who are already studying smarter, not harder.  
                        </p>
                  </div>
                  <div className='bg-white p-8 rounded-xl shadow-xl'>
                        <h3 className='text-xl font-bold text-gray-900 mb-6 text-center'>
                              Everything you need to succeed
                        </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 first-letter:gap-4'>
                        {[
                             "Personalized study schedules",
                              "Smart time management tools",
                              "Progress tracking & analytics",
                              "Course & assignment organization",
                              "Study reminder notifications",
                              "Focus timer & productivity tools",
                              "Cloud sync across all devices",
                              "Unlimited study templates" 
                        ].map((feature, index)=>(
                              <div key={index} className='flex items-center'>
                                    <CheckCircle className='h-5 w-5 text-green-500 mr-2 flex-shrink-0'/>
                                    <span className='text-gray-700'>
                                          {feature}
                                    </span>
                              </div>
                        ))}
                  </div>
                  <div className='mt-8 text-center'>
                        <button className='bg-blue-600 text-white px-8 py-3 rounded-lg
                        font-medium hover:bg-blue-700 transition-colors shadow-md
                        w-full md:w-auto'>
                              Get started Now
                        </button>
                  </div>
                  </div>
            </div>
      </div>
    </section>
  )
}

