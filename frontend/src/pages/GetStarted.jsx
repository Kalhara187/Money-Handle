import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, DollarSign, TrendingUp, Shield, Clock, Users, Star } from 'lucide-react';

const GetStarted = () => {
  const [selectedPlan, setSelectedPlan] = useState('personal');

  const handlePlanSelect = (planKey, planName) => {
    // Store selected plan in localStorage for the sign-up process
    localStorage.setItem('selectedPlan', JSON.stringify({
      key: planKey,
      name: planName,
      price: plans[planKey].price
    }));
    
    // Navigate to sign-in page with plan context
    window.location.href = '/signin?plan=' + planKey;
  };

  const plans = {
    personal: {
      name: 'Personal',
      price: 'Free',
      description: 'Perfect for individuals starting their financial journey',
      features: [
        'Track up to 3 bank accounts',
        'Basic expense categorization',
        'Monthly spending reports',
        'Budget tracking',
        'Mobile app access',
        'Email support'
      ],
      buttonText: 'Start Free',
      popular: false
    },
    premium: {
      name: 'Premium',
      price: '$9.99/month',
      description: 'Advanced features for serious money managers',
      features: [
        'Unlimited bank accounts',
        'Advanced analytics & insights',
        'Custom categories & tags',
        'Goal setting & tracking',
        'Investment portfolio tracking',
        'Bill reminders & alerts',
        'Export data to CSV/PDF',
        'Priority support'
      ],
      buttonText: 'Start Premium Trial',
      popular: true
    },
    family: {
      name: 'Family',
      price: '$19.99/month',
      description: 'Comprehensive solution for families and couples',
      features: [
        'Everything in Premium',
        'Up to 6 family members',
        'Shared family budgets',
        'Individual & joint accounts',
        'Kids spending tracking',
        'Family financial goals',
        'Multiple user permissions',
        'Family spending insights',
        'Dedicated account manager'
      ],
      buttonText: 'Start Family Plan',
      popular: false
    }
  };

  const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      description: 'Sign up with your email and create a secure password',
      icon: Users
    },
    {
      number: '02',
      title: 'Connect Your Banks',
      description: 'Securely link your bank accounts and credit cards',
      icon: Shield
    },
    {
      number: '03',
      title: 'Set Your Goals',
      description: 'Define your financial goals and budgets',
      icon: TrendingUp
    },
    {
      number: '04',
      title: 'Start Tracking',
      description: 'Monitor your spending and achieve your goals',
      icon: CheckCircle
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      content: 'Money Handle has completely transformed how I manage my finances. The insights are incredible!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Software Engineer',
      content: 'Finally, a finance app that actually makes sense. Clean interface and powerful features.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Teacher',
      content: 'I\'ve tried many budgeting apps, but this one is by far the best. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-8">
            <DollarSign className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Ready to Take Control of Your
            <span className="gradient-text"> Finances?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their financial lives with Money Handle. 
            Start your journey to financial freedom today.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              Setup in under 5 minutes
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-purple-500 mr-2" />
              Bank-level security
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started with Money Handle is simple. Follow these four easy steps to begin your financial transformation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the plan that best fits your needs. You can always upgrade or downgrade later.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-primary-500 transform scale-105' 
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-primary-600 mb-2">{plan.price}</div>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePlanSelect(key, plan.name)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-gray-600">Join thousands of satisfied users who have transformed their finances</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join Money Handle today and take the first step towards financial freedom. 
            No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signin"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
            >
              Start Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200">
              Schedule Demo
            </button>
          </div>
          <p className="text-primary-200 text-sm mt-4">
            Already have an account? <Link to="/signin" className="text-white underline hover:no-underline">Sign in here</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default GetStarted;