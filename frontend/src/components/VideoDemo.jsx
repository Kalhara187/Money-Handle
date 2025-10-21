import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              See Money Handle in Action
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Watch how our intuitive platform helps you track expenses, manage budgets,
              and achieve your financial goals with ease.
            </p>

            {/* Key Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700">Smart expense categorization with AI</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700">Real-time budget tracking and alerts</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700">Comprehensive financial reports and insights</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700">Secure data encryption and privacy</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={openModal}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center group"
            >
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo Video
            </button>
          </div>

          {/* Right Content - Video Thumbnail */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl overflow-hidden shadow-2xl">
              {/* Video Thumbnail Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-semibold">Money Handle Demo</p>
                  <p className="text-sm opacity-80">2:34 minutes</p>
                </div>
              </div>

              {/* Play Button Overlay */}
              <button
                onClick={openModal}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="h-8 w-8 text-primary-600 ml-1" />
                </div>
              </button>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4">
              <div className="text-2xl font-bold text-primary-600">50K+</div>
              <div className="text-sm text-gray-600">Happy Users</div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4">
              <div className="text-2xl font-bold text-green-600">4.9/5</div>
              <div className="text-sm text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>

            {/* Video Content */}
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-60" />
                <p className="text-xl font-semibold mb-2">Demo Video Coming Soon</p>
                <p className="text-gray-300">We're working on an amazing demo video for you!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoDemo;
