import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Truck, 
  Package, 
  AlertTriangle, 
  CheckCircle,
  Download
} from 'lucide-react';
import { mockAnalytics, mockAlerts } from '../data/mockData';
import KYCAlert from '../components/KYCAlert';

const DashboardPage = () => {

  const [selectedRegion, setSelectedRegion] = useState('all');
  const [timePeriod, setTimePeriod] = useState('7d');

  const analytics = mockAnalytics;
  const alerts = mockAlerts;

  const analyticsCards = [
    {
      title: "Daily Orders",
      value: analytics.dailyOrders,
      icon: Package,
      color: "bg-[#5DAE49]",
      change: "+12%"
    },
    {
      title: "Active Vehicles",
      value: analytics.activeVehicles,
      icon: Truck,
      color: "bg-[#FFC947]",
      change: "+5%"
    },
    {
      title: "Delivery Success Rate",
      value: `${analytics.deliverySuccessRate}%`,
      icon: CheckCircle,
      color: "bg-[#5DAE49]",
      change: "+2.1%"
    },
    {
      title: "Active Users",
      value: "2,143",
      icon: Users,
      color: "bg-[#0D1B2A]",
      change: "+8%"
    }
  ];

  const exportReport = () => {
    // Simulate CSV export
    alert('Report exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* KYC Alert */}
        <KYCAlert />
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0D1B2A] mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Monitor and manage MarketChain operations</p>
            </div>
            
            {/* Filters */}
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#5DAE49] focus:border-transparent"
              >
                <option value="all">All Regions</option>
                <option value="jharkhand">Jharkhand</option>
                <option value="bihar">Bihar</option>
                <option value="odisha">Odisha</option>
              </select>
              
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#5DAE49] focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              
              <button
                onClick={exportReport}
                className="flex items-center space-x-2 bg-[#5DAE49] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analyticsCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-semibold">
                  {card.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#0D1B2A] mb-1">
                {card.value}
              </h3>
              <p className="text-gray-600 text-sm">{card.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Alerts Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#0D1B2A] mb-6 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-[#FFC947]" />
                Active Alerts
              </h2>
              
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.type === 'error' ? 'border-red-500 bg-red-50' :
                      alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                      'border-blue-500 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800">
                        {alert.message}
                      </p>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        alert.type === 'error' ? 'bg-red-500 text-white' :
                        alert.type === 'warning' ? 'bg-yellow-500 text-white' :
                        'bg-blue-500 text-white'
                      }`}>
                        {alert.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Top Searched Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">
                Top Searched but Unavailable Items
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analytics.topSearchedItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-800">{item}</span>
                    <span className="text-sm text-gray-600">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center p-4 bg-[#5DAE49] text-white rounded-lg hover:bg-green-600 transition-colors">
                  <Users className="h-6 w-6 mb-2" />
                  <span className="text-sm">Manage Users</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-[#FFC947] text-white rounded-lg hover:bg-yellow-600 transition-colors">
                  <Truck className="h-6 w-6 mb-2" />
                  <span className="text-sm">Assign Vehicles</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-[#0D1B2A] text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <Package className="h-6 w-6 mb-2" />
                  <span className="text-sm">Process Returns</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  <AlertTriangle className="h-6 w-6 mb-2" />
                  <span className="text-sm">Resolve Issues</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { time: "2 mins ago", action: "New order #1247 assigned to vehicle V-089", status: "success" },
                  { time: "5 mins ago", action: "Return pickup scheduled for order #1243", status: "info" },
                  { time: "12 mins ago", action: "Delivery failed for order #1241 - Wrong address", status: "error" },
                  { time: "18 mins ago", action: "KYC verification completed for retailer R-456", status: "success" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'error' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;