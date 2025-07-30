import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  Route,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Fuel,
  Star,
  Phone
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import KYCAlert from '../KYCAlert';
import AIOnboardingChecklist from '../AIOnboardingChecklist';

const VehicleDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('deliveries');

  const stats = [
    { label: 'Today\'s Deliveries', value: '8', icon: Package, color: 'bg-[#5DAE49]', change: '+2' },
    { label: 'Pending Pickups', value: '3', icon: AlertTriangle, color: 'bg-[#FFC947]', change: '+1' },
    { label: 'Distance Covered', value: '127km', icon: Route, color: 'bg-[#0D1B2A]', change: '+23km' },
    { label: 'Earnings Today', value: '₹1,240', icon: Star, color: 'bg-green-600', change: '+₹340' }
  ];

  const activeDeliveries = [
    {
      id: 'DEL001',
      retailer: 'Kumar Store',
      address: 'Main Market, Ranchi',
      items: 'Rice 25kg x2, Oil 1L x5',
      distance: '2.3 km',
      eta: '15 mins',
      status: 'in_transit',
      phone: '9876543210'
    },
    {
      id: 'DEL002',
      retailer: 'Sharma Shop',
      address: 'Bus Stand Road, Ranchi',
      items: 'Flour 10kg x3',
      distance: '4.1 km',
      eta: '25 mins',
      status: 'pending',
      phone: '9876543211'
    }
  ];

  const returnPickups = [
    {
      id: 'RET001',
      retailer: 'Gupta Mart',
      address: 'Station Road, Ranchi',
      reason: 'Damaged packaging',
      scheduledTime: '2:00 PM',
      status: 'pending_pickup'
    },
    {
      id: 'RET002',
      retailer: 'Singh Store',
      address: 'College Road, Ranchi',
      reason: 'Wrong item delivered',
      scheduledTime: '3:30 PM',
      status: 'pending_pickup'
    }
  ];

  const completedDeliveries = [
    { id: 'DEL098', retailer: 'Verma Store', time: '11:30 AM', rating: 5 },
    { id: 'DEL097', retailer: 'Yadav Shop', time: '10:15 AM', rating: 4 },
    { id: 'DEL096', retailer: 'Mishra Mart', time: '9:45 AM', rating: 5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending_pickup': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
                <Truck className="h-4 w-4 mr-1" />
                Vehicle: {user?.activeRole.data?.vehicleNumber || 'JH01AB1234'}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-[#5DAE49] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                <Navigation className="h-4 w-4" />
                <span>Start Route</span>
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Fuel className="h-4 w-4" />
                <span>Log Fuel</span>
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

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('deliveries')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'deliveries'
                ? 'bg-white text-[#0D1B2A] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active Deliveries
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'returns'
                ? 'bg-white text-[#0D1B2A] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Return Pickups
            {returnPickups.length > 0 && (
              <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                {returnPickups.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'completed'
                ? 'bg-white text-[#0D1B2A] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Completed
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'deliveries' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-6">Active Deliveries</h3>
                <div className="space-y-4">
                  {activeDeliveries.map((delivery) => (
                    <div key={delivery.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-[#0D1B2A] mb-1">{delivery.retailer}</h4>
                          <p className="text-gray-600 flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {delivery.address}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                          {delivery.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Items:</strong> {delivery.items}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center text-gray-600">
                            <Route className="h-4 w-4 mr-1" />
                            {delivery.distance}
                          </span>
                          <span className="flex items-center text-blue-600">
                            <Clock className="h-4 w-4 mr-1" />
                            ETA: {delivery.eta}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button className="flex-1 bg-[#5DAE49] text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                          <Navigation className="h-4 w-4" />
                          <span>Navigate</span>
                        </button>
                        <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                          Mark Complete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'returns' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-6 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                  Return Pickups Scheduled
                </h3>
                <div className="space-y-4">
                  {returnPickups.map((pickup) => (
                    <div key={pickup.id} className="border border-orange-200 rounded-xl p-6 bg-orange-50">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-[#0D1B2A] mb-1">{pickup.retailer}</h4>
                          <p className="text-gray-600 flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {pickup.address}
                          </p>
                        </div>
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          PICKUP REQUIRED
                        </span>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Reason:</strong> {pickup.reason}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Scheduled: {pickup.scheduledTime}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                          Start Pickup
                        </button>
                        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'completed' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-6">Today's Completed Deliveries</h3>
                <div className="space-y-3">
                  {completedDeliveries.map((delivery) => (
                    <div key={delivery.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-medium text-[#0D1B2A]">{delivery.retailer}</h4>
                          <p className="text-sm text-gray-600">{delivery.id} • {delivery.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(delivery.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Route Optimization */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-4 flex items-center">
                <Route className="h-5 w-5 mr-2 text-[#5DAE49]" />
                AI Route Optimizer
              </h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">Optimized Route Ready</p>
                  <p className="text-xs text-green-600">Save 23 mins & 8.2km</p>
                </div>
                <button className="w-full bg-[#5DAE49] text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                  View Route Map
                </button>
              </div>
            </motion.div>

            {/* Vehicle Status */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-4">Vehicle Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fuel Level</span>
                  <span className="font-bold text-green-600">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Service</span>
                  <span className="font-bold text-[#0D1B2A]">15 days ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Insurance</span>
                  <span className="font-bold text-green-600">Valid</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Service</span>
                  <span className="font-bold text-yellow-600">In 2 weeks</span>
                </div>
              </div>
            </motion.div>

            {/* Earnings Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-[#5DAE49] to-[#FFC947] rounded-2xl p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-4">This Week's Earnings</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Deliveries</span>
                  <span>₹4,280</span>
                </div>
                <div className="flex justify-between">
                  <span>Returns</span>
                  <span>₹320</span>
                </div>
                <div className="flex justify-between">
                  <span>Bonus</span>
                  <span>₹150</span>
                </div>
                <hr className="border-white/30" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹4,750</span>
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

export default VehicleDashboard;