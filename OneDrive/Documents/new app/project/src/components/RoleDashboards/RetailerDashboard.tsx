import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Package, 
  Star, 
  MapPin,
  Clock,
  Truck,
  Bot
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import KYCAlert from '../KYCAlert';
import AISearchComponent from '../AISearchComponent';
import AIOnboardingChecklist from '../AIOnboardingChecklist';

const RetailerDashboard = () => {
  const { user } = useAuth();
  const [cartItems] = useState(3);

  const quickActions = [
    { icon: Bot, label: 'Ask AI for Products', color: 'bg-[#5DAE49]' },
    { icon: Package, label: 'My Orders', color: 'bg-[#FFC947]' },
    { icon: Truck, label: 'Track Delivery', color: 'bg-[#0D1B2A]' }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Basmati Rice',
      wholesaler: 'Gupta Enterprises',
      price: '₹85/kg',
      rating: 4.8,
      minOrder: '25kg',
      delivery: '2-3 days',
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'Mustard Oil (Kachi Ghani)',
      wholesaler: 'Singh Oil Mills',
      price: '₹180/L',
      rating: 4.6,
      minOrder: '10L',
      delivery: '1-2 days',
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'Wheat Flour (Chakki Fresh)',
      wholesaler: 'Sharma Mills',
      price: '₹42/kg',
      rating: 4.7,
      minOrder: '50kg',
      delivery: '1 day',
      image: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const recentOrders = [
    { id: 'ORD001', item: 'Rice 25kg', status: 'Delivered', date: '2 days ago' },
    { id: 'ORD002', item: 'Oil 10L', status: 'In Transit', date: '1 day ago' },
    { id: 'ORD003', item: 'Flour 50kg', status: 'Processing', date: 'Today' }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KYC Alert */}
        <KYCAlert />
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0D1B2A]">
                Welcome, {user?.name}
              </h1>
              <p className="text-gray-600 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {user?.region}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-[#0D1B2A]" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#5DAE49] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-[#0D1B2A] mb-4 flex items-center">
            <Bot className="h-6 w-6 mr-2 text-[#5DAE49]" />
            AI-Powered Product Search
          </h2>
          <AISearchComponent 
            placeholder="Try: 'Show me cheapest 10kg flour' or speak in Hindi"
            onSearchResult={(result) => {
              console.log('AI Search Result:', result);
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-4">Quick Actions</h3>
              <div className="grid grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`${action.color} text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <action.icon className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">{action.label}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Featured Products */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-6">Featured Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#0D1B2A] mb-1">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{product.wholesaler}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className="h-4 w-4 text-[#FFC947] fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-bold text-[#5DAE49]">{product.price}</div>
                            <div className="text-xs text-gray-500">Min: {product.minOrder}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {product.delivery}
                            </div>
                            <button className="mt-1 bg-[#5DAE49] text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-[#0D1B2A]">{order.item}</div>
                      <div className="text-sm text-gray-600">{order.id}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        order.status === 'Delivered' ? 'text-green-600' :
                        order.status === 'In Transit' ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>
                        {order.status}
                      </div>
                      <div className="text-xs text-gray-500">{order.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* KYC Status */}
            {user?.kycStatus === 'pending' && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <h3 className="font-bold text-yellow-800">KYC Pending</h3>
                </div>
                <p className="text-yellow-700 text-sm mb-4">
                  Complete your KYC verification to unlock all features and increase your order limits.
                </p>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition-colors">
                  Complete KYC
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* AI Onboarding Checklist */}
      <AIOnboardingChecklist />
    </div>
  );
};

export default RetailerDashboard;