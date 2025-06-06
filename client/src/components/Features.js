import React from 'react';
import { Brain, Clock, Calendar, LineChart, Users, Star, PenTool, Globe } from 'lucide-react';

const FeatureCard = ({icon, title, description}) =>(
      <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg 
      transition-all duration-300 transform hover:-translate-y-1'>
            <div className="rounded-full bg-blue-100 p-3 w-fit mb-4">
                  {icon}
            </div>
            <h3 className='text-xl font-semibold mb-2'>{title}</h3>
            <p className="text-gray-600">{description}</p>
      </div>
);
export default function Features() {
      const features =[
            {
                  icon: <Brain className='h-6 w-6 text-blue-600'/>,
                  title: "Personalized Learning",
                  description: "AI-powered scheduling that adapts to your learning style and optimizes your study sessions."
            },
            {
                  icon: <Clock className='h-6 w-6 text-blue-600'/>,
                  title: "Time Optimization",
                  description: "Study when you're most productive with schedules built around your peak performance hours."
            },
            {
                  icon: <LineChart className='h-6 w-6 text-blue-600'/>,
                  title: "Progress Tracking",
                  description: "Visual analytics to track your progress and identify areas that need more attention."
            },
            {
                  icon: <Calendar className='h-6 w-6 text-blue-600'/>,
                  title: "Smart Calendar",
                  description: "Visual analytics to track your progress and identify areas that need more attention."
            },
            {
                  icon: <Calendar className='h-6 w-6 text-blue-600'/>,
                  title: "Progress Tracking",
                  description: "Visual analytics to track your progress and identify areas that need more attention."
            },
            {
                  icon: <Calendar className='h-6 w-6 text-blue-600'/>,
                  title: "Progress Tracking",
                  description: "Visual analytics to track your progress and identify areas that need more attention."
            },
      ]
  return (
      <section id="features" className='py-20 bg-gray-50'>
            <div className='container mx-auto px-4 md:px-6'>
                  <div className='text-center mb-16'>
                        <h2 className='text-3xl md:text-4xl  font-bold mb-4 '>
                              Features Designed for{" "} 
                              <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                                    Student Success
                              </span>
                        </h2>
                        <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                              Let us handle your study plan - so you can focus on learning, not scheduling.
                        </p>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {features.map((feature,index)=>(
                              <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                              />
                        ))}
                  </div>
                  <div className='mt-16 text-center'>
                        <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
                              Team up with us and improve your grades using our smart study scheduler!
                        </p>
                        <button className='bg-blue-600 text-white px-8 py-3 rounded-full 
                        shadow-md hover:shadow-lg transition-all
                        hover:bg-blue-700 transform hover:-translate-y-0.5'>
                              Create your Schedule Now 
                        </button>
                  </div>
            </div>
      </section>
  )
}
