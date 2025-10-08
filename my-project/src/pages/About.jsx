import React from 'react';
import { Users, Target, Award, Heart, Globe, Zap } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former Goldman Sachs analyst with 10+ years in fintech',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      bio: 'Ex-Google engineer specializing in financial security',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Emily Davis',
      role: 'Head of Product',
      bio: 'Design thinking expert from Apple and Mint',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'David Wilson',
      role: 'Head of Security',
      bio: 'Cybersecurity specialist from JPMorgan Chase',
      image: '/api/placeholder/150/150'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Every feature we build starts with understanding our users\' real needs and pain points.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We constantly push boundaries to bring cutting-edge financial technology to everyone.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Financial tools should be available to everyone, regardless of their background or income.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in security, design, and user experience.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '$2.5B+', label: 'Transactions Tracked' },
    { number: '99.9%', label: 'Uptime' },
    { number: '4.9/5', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Money Handle</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              We're on a mission to democratize financial wellness and empower everyone 
              to take control of their financial future with intelligent, secure, and user-friendly tools.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-6">
                Founded in 2020, Money Handle was born from a simple observation: personal finance 
                tools were either too complex for everyday users or too basic for serious financial planning.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                We set out to bridge this gap by creating an intuitive platform that grows with our users, 
                from college students tracking their first budget to families planning for retirement.
              </p>
              <div className="flex items-center space-x-4">
                <Target className="h-8 w-8 text-primary-600" />
                <span className="text-lg font-semibold text-gray-900">
                  Making financial wellness accessible to everyone
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary-600 mb-1">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do, from product development to customer support.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our diverse team brings together expertise from fintech, security, design, and engineering 
              to create the best possible experience for our users.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">Key milestones in our mission to transform personal finance</p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-24 text-right pr-8">
                <span className="text-lg font-semibold text-primary-600">2020</span>
              </div>
              <div className="flex-shrink-0 w-4 h-4 bg-primary-600 rounded-full"></div>
              <div className="ml-8">
                <h3 className="text-lg font-semibold text-gray-900">Company Founded</h3>
                <p className="text-gray-600">Started with a vision to make financial wellness accessible to everyone</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0 w-24 text-right pr-8">
                <span className="text-lg font-semibold text-primary-600">2021</span>
              </div>
              <div className="flex-shrink-0 w-4 h-4 bg-primary-600 rounded-full"></div>
              <div className="ml-8">
                <h3 className="text-lg font-semibold text-gray-900">Beta Launch</h3>
                <p className="text-gray-600">Released our first beta version to 1,000 early adopters</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0 w-24 text-right pr-8">
                <span className="text-lg font-semibold text-primary-600">2022</span>
              </div>
              <div className="flex-shrink-0 w-4 h-4 bg-primary-600 rounded-full"></div>
              <div className="ml-8">
                <h3 className="text-lg font-semibold text-gray-900">Public Launch</h3>
                <p className="text-gray-600">Officially launched to the public with advanced security features</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0 w-24 text-right pr-8">
                <span className="text-lg font-semibold text-primary-600">2023</span>
              </div>
              <div className="flex-shrink-0 w-4 h-4 bg-primary-600 rounded-full"></div>
              <div className="ml-8">
                <h3 className="text-lg font-semibold text-gray-900">AI Integration</h3>
                <p className="text-gray-600">Introduced AI-powered insights and personalized recommendations</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0 w-24 text-right pr-8">
                <span className="text-lg font-semibold text-primary-600">2024</span>
              </div>
              <div className="flex-shrink-0 w-4 h-4 bg-primary-600 rounded-full"></div>
              <div className="ml-8">
                <h3 className="text-lg font-semibold text-gray-900">50K Users</h3>
                <p className="text-gray-600">Reached 50,000+ active users and $2.5B+ in tracked transactions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Be part of the financial wellness revolution. Start your journey with Money Handle today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/get-started"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;