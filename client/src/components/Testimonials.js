import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  rating: number;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, role, rating, image }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Smart Study Scheduler helped me organize my chaotic study schedule. My grades improved significantly in just one semester!",
      name: "Emily Johnson",
      role: "Biology Major",
      rating: 5,
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      quote: "As a working student, this app has been a lifesaver. I can now balance my job and studies effectively.",
      name: "Michael Chen",
      role: "Computer Science Student",
      rating: 5,
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      quote: "The analytics feature helps me understand my study patterns. I've become much more efficient with my time.",
      name: "Sophia Rodriguez",
      role: "Psychology Student",
      rating: 4,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-indigo-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-indigo-600">Users Say</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Thousands of students are already transforming their study habits with Smart Study Scheduler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;