import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  Eye, 
  EyeOff, 
  Truck, 
  Store, 
  Package, 
  Shield,
  Mic,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SecurityFeatures from '../components/SecurityFeatures';
import FirebaseStatus from '../components/FirebaseStatus';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, sendOTP, isLoading, error, isAuthenticated } = useAuth();
  
  const [selectedRole, setSelectedRole] = useState('');
  const [loginMethod, setLoginMethod] = useState('phone');
  const [language, setLanguage] = useState('english');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [isListening, setIsListening] = useState(false);
  
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    otp: ''
  });

  const roles = [
    { value: 'retailer', label: 'Retailer', icon: Store, color: 'bg-[#5DAE49]' },
    { value: 'wholesaler', label: 'Wholesaler', icon: Package, color: 'bg-[#FFC947]' },
    { value: 'vehicle_owner', label: 'Vehicle Owner', icon: Truck, color: 'bg-[#5DAE49]' },
    { value: 'admin', label: 'Admin', icon: Shield, color: 'bg-[#0D1B2A]' }
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिंदी' },
    { value: 'bengali', label: 'বাংলা' },
    { value: 'tamil', label: 'தமிழ்' }
  ];

  const translations = {
    english: {
      welcome: 'Welcome to MarketChain',
      tagline: 'Aasani se order, bharoshe se delivery',
      selectRole: 'Select Your Role',
      phoneNumber: 'Phone Number',
      enterPhone: 'Enter your phone number',
      sendOTP: 'Send OTP',
      enterOTP: 'Enter OTP',
      otpSent: 'OTP sent to your phone',
      login: 'Login',
      continue: 'Continue',
      or: 'or',
      email: 'Email',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      newUser: "Don't have an account?",
      signUp: 'Sign up',
      voiceInput: 'Use voice input',
      phoneTooltip: 'Enter your 10-digit mobile number',
      otpTooltip: 'Enter the 6-digit code sent to your phone'
    },
    hindi: {
      welcome: 'MarketChain में आपका स्वागत है',
      tagline: 'आसानी से ऑर्डर, भरोसे से डिलीवरी',
      selectRole: 'अपनी भूमिका चुनें',
      phoneNumber: 'फोन नंबर',
      enterPhone: 'अपना फोन नंबर डालें',
      sendOTP: 'OTP भेजें',
      enterOTP: 'OTP डालें',
      otpSent: 'आपके फोन पर OTP भेजा गया',
      login: 'लॉगिन',
      continue: 'जारी रखें',
      or: 'या',
      email: 'ईमेल',
      password: 'पासवर्ड',
      rememberMe: 'मुझे याद रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      newUser: 'खाता नहीं है?',
      signUp: 'साइन अप करें',
      voiceInput: 'आवाज़ का उपयोग करें',
      phoneTooltip: 'अपना 10 अंकों का मोबाइल नंबर डालें',
      otpTooltip: 'अपने फोन पर भेजा गया 6 अंकों का कोड डालें'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect based on role
      const roleRoutes = {
        retailer: '/retailer-dashboard',
        wholesaler: '/wholesaler-dashboard',
        vehicle_owner: '/vehicle-dashboard',
        admin: '/dashboard'
      };
      navigate(roleRoutes[selectedRole as keyof typeof roleRoutes] || '/dashboard');
    }
  }, [isAuthenticated, selectedRole, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOTP = async () => {
    if (!formData.phone || formData.phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    
    try {
      await sendOTP(formData.phone);
      setOtpSent(true);
    } catch {
      alert('Failed to send OTP. Please try again.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginMethod === 'phone') {
      if (!otpSent) {
        await handleSendOTP();
        return;
      }
      
      if (!formData.otp || formData.otp.length !== 6) {
        alert('Please enter a valid 6-digit OTP');
        return;
      }
      
      if (otpAttempts >= 3) {
        alert('Too many failed attempts. Please try again later.');
        return;
      }
      
      try {
        await login(formData.phone, formData.otp, selectedRole);
      } catch {
        setOtpAttempts(prev => prev + 1);
      }
    } else {
      // Email/password login for admin
      if (!formData.email || !formData.password) {
        alert('Please enter both email and password');
        return;
      }
      
      try {
        await login(formData.email, formData.password, selectedRole);
      } catch {
        // Handle error
      }
    }
  };

  const simulateVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setFormData({ ...formData, phone: '9876543210' });
      setIsListening(false);
    }, 2000);
  };

  const handleOTPAttempt = (attempts: number) => {
    setOtpAttempts(attempts);
  };

  const selectedRoleData = roles.find(role => role.value === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Language Selector */}
        <div className="flex justify-end mb-6">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#5DAE49] focus:border-transparent"
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-[#5DAE49] to-[#FFC947] p-3 rounded-xl">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0D1B2A]">MarketChain</h1>
                <p className="text-sm text-gray-600">{t.tagline}</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-[#0D1B2A] mb-2">{t.welcome}</h2>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t.selectRole}
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DAE49] focus:border-transparent mb-4"
              required
            >
              <option value="">Select your role</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            
            {/* Role Cards for Visual Reference */}
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => (
                <div
                  key={role.value}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                    selectedRole === role.value
                      ? `${role.color} text-white border-transparent`
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#5DAE49]'
                  }`}
                >
                  <role.icon className="h-5 w-5 mx-auto mb-1" />
                  <div className="text-xs font-medium">{role.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Login Method Toggle */}
          {selectedRole === 'admin' && (
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  loginMethod === 'phone'
                    ? 'bg-white text-[#0D1B2A] shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                <Phone className="h-4 w-4 inline mr-2" />
                Phone
              </button>
              <button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  loginMethod === 'email'
                    ? 'bg-white text-[#0D1B2A] shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                <Mail className="h-4 w-4 inline mr-2" />
                Email
              </button>
            </div>
          )}

          {/* Firebase Status */}
          <FirebaseStatus />

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {loginMethod === 'phone' ? (
              <>
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.phoneNumber}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DAE49] focus:border-transparent pr-12"
                      placeholder={t.enterPhone}
                      maxLength={10}
                      disabled={otpSent}
                    />
                    <button
                      type="button"
                      onClick={simulateVoiceInput}
                      className={`absolute right-3 top-3 p-1 rounded-full transition-colors ${
                        isListening 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'text-gray-400 hover:text-[#5DAE49]'
                      }`}
                      title={t.voiceInput}
                    >
                      <Mic className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{t.phoneTooltip}</p>
                </div>

                {/* OTP Field */}
                {otpSent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.enterOTP}
                    </label>
                    <input
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DAE49] focus:border-transparent"
                      placeholder="000000"
                      maxLength={6}
                    />
                    <p className="text-xs text-green-600 mt-1">{t.otpSent}</p>
                    <p className="text-xs text-gray-500">{t.otpTooltip}</p>
                  </motion.div>
                )}
              </>
            ) : (
              <>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DAE49] focus:border-transparent"
                    placeholder="admin@marketchain.in"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.password}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DAE49] focus:border-transparent pr-12"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-[#5DAE49] focus:ring-[#5DAE49]" />
                    <span className="ml-2 text-sm text-gray-600">{t.rememberMe}</span>
                  </label>
                  <button type="button" className="text-sm text-[#5DAE49] hover:underline">
                    {t.forgotPassword}
                  </button>
                </div>
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Security Features */}
            <SecurityFeatures onOTPAttempt={handleOTPAttempt} />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !selectedRole}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                selectedRoleData?.color || 'bg-[#5DAE49]'
              } hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                !selectedRole ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{otpSent ? t.login : (loginMethod === 'phone' ? t.sendOTP : t.login)}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {t.newUser}{' '}
              <button 
                onClick={() => navigate(`/join-${selectedRole}`)}
                className="text-[#5DAE49] hover:underline font-medium"
              >
                {t.signUp}
              </button>
            </p>
          </div>
          
          {/* reCAPTCHA container for Firebase */}
          <div id="recaptcha-container"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;