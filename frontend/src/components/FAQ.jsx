import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqs = [
    {
      question: "Is Money Handle really free to use?",
      answer: "Yes! Money Handle offers a generous free tier that includes all essential features like expense tracking, basic budgeting, and financial reports. You can upgrade to our premium plan for advanced features like AI insights, investment tracking, and priority support."
    },
    {
      question: "How secure is my financial data?",
      answer: "Your security is our top priority. We use bank-level 256-bit SSL encryption, multi-factor authentication, and comply with SOC 2 Type II standards. Your data is encrypted both in transit and at rest, and we never share your personal information with third parties."
    },
    {
      question: "Can I import data from other finance apps?",
      answer: "Absolutely! We support importing data from popular finance apps and banks. You can easily migrate your existing financial data using our secure import tools. We support CSV, QFX, and direct bank connections for seamless data transfer."
    },
    {
      question: "Does Money Handle work on mobile devices?",
      answer: "Yes! Money Handle is fully responsive and works perfectly on all devices. We offer native mobile apps for iOS and Android, plus our web app works seamlessly on any mobile browser. Your data syncs automatically across all your devices."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide comprehensive support including 24/7 live chat, detailed documentation, video tutorials, and a community forum. Premium users get priority support and direct access to our customer success team."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Of course! You can cancel your subscription at any time with no penalties. If you're not completely satisfied, we offer a 30-day money-back guarantee. Your data remains accessible even after cancellation."
    },
    {
      question: "How does the AI financial assistant work?",
      answer: "Our AI assistant analyzes your spending patterns, income trends, and financial goals to provide personalized insights and recommendations. It can help you identify savings opportunities, optimize your budget, and even suggest investment strategies based on your risk tolerance."
    },
    {
      question: "Do you offer business or family accounts?",
      answer: "Yes! We offer business accounts for small businesses and entrepreneurs, as well as family plans that allow multiple users to share and manage household finances. Contact our sales team for custom enterprise solutions."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Money Handle
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openItems.has(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </button>

              {openItems.has(index) && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Still have questions?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Our support team is here to help you get started and make the most of Money Handle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Contact Support
              </button>
              <button className="bg-primary-700 hover:bg-primary-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
