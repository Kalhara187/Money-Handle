import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "Money Handle transformed how I manage my business finances. The AI insights helped me identify savings opportunities I never knew existed.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Freelance Developer",
      content: "Finally, a finance app that understands freelancers! The income tracking and tax categorization features are game-changers.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      content: "I've tried many finance apps, but Money Handle's user experience and smart alerts keep me on track with my financial goals.",
      rating: 5,
      avatar: "ER"
    },
    {
      name: "David Thompson",
      role: "Retired Teacher",
      content: "Simple, intuitive, and powerful. Money Handle helps me manage my retirement savings and monthly expenses effortlessly.",
      rating: 5,
      avatar: "DT"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied users who have transformed their financial lives with Money Handle.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 relative">
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary-100" />

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-gray-600 mb-6">
              Start your free trial today and see why thousands of users trust Money Handle with their finances.
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
