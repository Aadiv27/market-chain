import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  BarChart3,
  Bell,
  Plus,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import KYCAlert from '../KYCAlert';
import AIOnboardingChecklist from '../AIOnboardingChecklist';

const WholesalerDashboard = () => {
  const { user } = useAuth();


  const stats = [
    { label: 'Total Products', value: '247', icon: Package, color: 'bg-[#5DAE49]', change: '+12' },
    { label: 'Pending Orders', value: '18', icon: Users, color: 'bg-[#FFC947]', change: '+3' },
    { label: 'Low Stock Items', value: '5', icon: AlertTriangle, color: 'bg-red-500', change: '-2' },
    { label: 'Monthly Revenue', value: '₹2.4L', icon: TrendingUp, color: 'bg-[#0D1B2A]', change: '+18%' }
  ];

  const lowStockItems = [
    { name: 'Basmati Rice 25kg', current: 12, minimum: 50, demand: 'High' },
    { name: 'Mustard Oil 1L', current: 8, minimum: 30, demand: 'Medium' },
    { name: 'Wheat Flour 10kg', current: 15, minimum: 40, demand: 'High' }
  ];

  const recentOrders = [
    { id: 'ORD001', retailer: 'Kumar Store', items: 'Rice 25kg x2', amount: '₹3,400', status: 'Pending' },
    { id: 'ORD002', retailer: 'Sharma Shop', items: 'Oil 1L x10', amount: '₹1,800', status: 'Confirmed' },
    { id: 'ORD003', retailer: 'Gupta Mart', items: 'Flour 10kg x5', amount: '₹2,100', status: 'Shipped' }
  ];

  const aiSuggestions = [
    { type: 'restock', message: 'Restock Basmati Rice - 15 retailers searched this week', priority: 'high' },
    { type: 'pricing', message: 'Consider 5% price reduction on Mustard Oil to match competitors', priority: 'medium' },
    { type: 'demand', message: 'High demand for Wheat Flour expected next week', priority: 'low' }
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
              <p className="text-gray-600">Manage your wholesale business efficiently</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-[#5DAE49] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-semibold">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#0D1B2A] mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* AI Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-[#5DAE49] to-[#FFC947] rounded-2xl p-6 mb-8 text-white"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Bell className="h-6 w-6 mr-2" />
            AI-Powered Business Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                  suggestion.priority === 'high' ? 'bg-red-500' :
                  suggestion.priority === 'medium' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}>
                  {suggestion.priority.toUpperCase()}
                </div>
                <p className="text-sm opacity-90">{suggestion.message}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Low Stock Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#0D1B2A] flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                  Low Stock Alerts
                </h3>
                <button className="text-[#5DAE49] text-sm font-medium hover:underline">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {lowStockItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <h4 className="font-semibold text-[#0D1B2A]">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Current: {item.current} | Minimum: {item.minimum}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.demand === 'High' ? 'bg-red-500 text-white' :
                        'bg-yellow-500 text-white'
                      }`}>
                        {item.demand} Demand
                      </div>
                      <button className="mt-2 bg-[#5DAE49] text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors">
                        Restock
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#0D1B2A]">Recent Orders</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Search className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Retailer</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Items</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-[#0D1B2A]">{order.id}</td>
                        <td className="py-3 px-4 text-gray-600">{order.retailer}</td>
                        <td className="py-3 px-4 text-gray-600">{order.items}</td>
                        <td className="py-3 px-4 font-semibold text-[#5DAE49]">{order.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-[#5DAE49] text-white p-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>Bulk Upload Products</span>
                </button>
                <button className="w-full bg-[#FFC947] text-[#0D1B2A] p-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>View Analytics</span>
                </button>
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Manage Retailers</span>
                </button>
              </div>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Orders Fulfilled</span>
                  <span className="font-bold text-[#5DAE49]">142</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-bold text-[#FFC947]">4.8 ⭐</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-bold text-[#0D1B2A]">2.3 hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Return Rate</span>
                  <span className="font-bold text-green-600">1.2%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* AI Onboarding Checklist */}
      <AIOnboardingChecklist />
    </div>
  );
};

export default WholesalerDashboard;