import React from 'react';
import { Users, TrendingUp, Star, Award } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "Active Users",
      description: "Trust our platform"
    },
    {
      icon: TrendingUp,
      number: "$2.5M+",
      label: "Money Managed",
      description: "Through our platform"
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "User Rating",
      description: "Based on 1,200+ reviews"
    },
    {
      icon: Award,
      number: "99.9%",
      label: "Uptime",
      description: "Reliable service"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by Thousands of Users Worldwide
          </h2>
          <p className="text-xl text-primary-100">
            Join our growing community of financially empowered individuals
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.number}
              </div>
              <div className="text-lg font-medium text-primary-100 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-primary-200">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;