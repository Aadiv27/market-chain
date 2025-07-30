import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, realtimeDb } from '../config/firebase';
import { userRealtimeService } from '../services/realtimeDbService';
import { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (phone: string, otp: string, role: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: string) => void;
  updateKYCStatus: (status: 'pending' | 'verified' | 'rejected') => void;
  sendOTP: (phone: string) => Promise<void>;
  setLanguage: (language: string) => void;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SWITCH_ROLE'; payload: string }
  | { type: 'UPDATE_KYC'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: string };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START': {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    }
    case 'LOGIN_ERROR': {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    }
    case 'SWITCH_ROLE': {
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          activeRole: state.user.roles.find(r => r.type === action.payload) || state.user.activeRole
        } : null
      };
    }
    case 'UPDATE_KYC': {
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          kycStatus: action.payload as 'pending' | 'verified' | 'rejected'
        } : null
      };
    }
    case 'SET_LANGUAGE': {
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          language: action.payload as 'english' | 'hindi' | 'bengali' | 'tamil'
        } : null
      };
    }
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  // Initialize Firebase Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
          } else {
            // Create new user document
            const newUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              phone: firebaseUser.phoneNumber || '',
              roles: [{
                type: 'retailer',
                verified: false,
                data: {
                  shopName: 'New Shop',
                  landmark: 'Location'
                }
              }],
              activeRole: {
                type: 'retailer',
                verified: false
              },
              kycStatus: 'pending',
              region: 'Ranchi, Jharkhand',
              language: 'english',
              createdAt: new Date().toISOString(),
              lastLogin: new Date().toISOString(),
              loginHistory: []
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
            dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          dispatch({ type: 'LOGIN_ERROR', payload: 'Failed to load user data' });
        }
      } else {
        // User is signed out
        dispatch({ type: 'LOGOUT' });
      }
    });

    return () => unsubscribe();
  }, []);

  // Load user from localStorage on initial load (fallback)
  useEffect(() => {
    const storedUser = localStorage.getItem('marketchain_user');
    if (storedUser && !state.isAuthenticated) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch {
        localStorage.removeItem('marketchain_user');
      }
    }
  }, [state.isAuthenticated]);

  const sendOTP = async (phone: string): Promise<void> => {
    try {
      // Check if Firebase is properly configured
      if (!auth) {
        console.warn('Firebase auth not available, using mock OTP');
        await new Promise(resolve => setTimeout(resolve, 1000));
        return;
      }

      // Initialize reCAPTCHA with better error handling
      if (!window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': () => {
              console.log('reCAPTCHA solved');
            },
            'expired-callback': () => {
              console.log('reCAPTCHA expired');
            }
          });
        } catch (error) {
          console.error('Failed to initialize reCAPTCHA:', error);
          // Fallback to mock OTP
          await new Promise(resolve => setTimeout(resolve, 1000));
          return;
        }
      }

      try {
        const confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
        window.confirmationResult = confirmationResult;
        console.log('OTP sent successfully via Firebase');
      } catch (firebaseError) {
        console.error('Firebase OTP error:', firebaseError);
        // Fallback to mock OTP
        console.log('Falling back to mock OTP');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      // Always fallback to mock for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const login = async (phone: string, otp: string, role: string): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
            if (window.confirmationResult) {
        try {
          // Firebase authentication
          const result = await window.confirmationResult.confirm(otp);
          const firebaseUser = result.user;
          
          // Create or update user in Firestore
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            // Update existing user
            const userData = userDoc.data() as User;
            const updatedUser = {
              ...userData,
              lastLogin: new Date().toISOString(),
              activeRole: {
                type: role as 'retailer' | 'wholesaler' | 'vehicle_owner',
                verified: true
              }
            };
                       await updateDoc(userRef, updatedUser);
           // Also update in Realtime Database
           await userRealtimeService.updateUser(firebaseUser.uid, updatedUser);
           dispatch({ type: 'LOGIN_SUCCESS', payload: updatedUser });
          } else {
            // Create new user
            const newUser: User = {
              id: firebaseUser.uid,
              name: role === 'retailer' ? 'राम कुमार' : role === 'vehicle_owner' ? 'Suresh Singh' : 'Priya Enterprises',
              phone,
              roles: [{
                type: role as 'retailer' | 'wholesaler' | 'vehicle_owner',
                verified: true,
                data: role === 'retailer' ? {
                  shopName: 'Kumar General Store',
                  landmark: 'Near Bus Stand'
                } : role === 'vehicle_owner' ? {
                  licenseNumber: 'JH0120230001234',
                  vehicleType: 'mini_truck',
                  vehicleNumber: 'JH01AB1234',
                  capacity: 1000,
                  rcNumber: 'RC123456',
                  insuranceNumber: 'INS789012'
                } : {
                  businessName: 'Priya Enterprises',
                  gstin: 'GST123456789',
                  businessAddress: 'Main Market, Ranchi'
                }
              }],
              activeRole: {
                type: role as 'retailer' | 'wholesaler' | 'vehicle_owner',
                verified: true
              },
              kycStatus: Math.random() > 0.3 ? 'verified' : 'pending',
              region: 'Ranchi, Jharkhand',
              language: 'english',
              createdAt: new Date().toISOString(),
              lastLogin: new Date().toISOString(),
              loginHistory: []
            };
                       await setDoc(userRef, newUser);
           // Also save to Realtime Database
           await userRealtimeService.saveUser(firebaseUser.uid, newUser);
           dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
          }
        } catch (firebaseError) {
          console.error('Firebase authentication error:', firebaseError);
          // Fallback to mock authentication
          console.log('Falling back to mock authentication');
          throw new Error('Firebase authentication failed. Please try again.');
        }
      } else {
        // Fallback to mock authentication
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (otp !== '123456') {
          throw new Error('Invalid OTP. Use 123456 for demo.');
        }

        const mockUser: User = {
          id: `user_${Date.now()}`,
          name: role === 'retailer' ? 'राम कुमार' : role === 'vehicle_owner' ? 'Suresh Singh' : 'Priya Enterprises',
          phone,
          roles: [{
            type: role as 'retailer' | 'wholesaler' | 'vehicle_owner',
            verified: true,
            data: role === 'retailer' ? {
              shopName: 'Kumar General Store',
              landmark: 'Near Bus Stand'
            } : role === 'vehicle_owner' ? {
              licenseNumber: 'JH0120230001234',
              vehicleType: 'mini_truck',
              vehicleNumber: 'JH01AB1234',
              capacity: 1000,
              rcNumber: 'RC123456',
              insuranceNumber: 'INS789012'
            } : {
              businessName: 'Priya Enterprises',
              gstin: 'GST123456789',
              businessAddress: 'Main Market, Ranchi'
            }
          }],
          activeRole: {
            type: role as 'retailer' | 'wholesaler' | 'vehicle_owner',
            verified: true
          },
          kycStatus: Math.random() > 0.3 ? 'verified' : 'pending',
          region: 'Ranchi, Jharkhand',
          language: 'english',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          loginHistory: []
        };

        localStorage.setItem('marketchain_user', JSON.stringify(mockUser));
        dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error instanceof Error ? error.message : 'Login failed. Please try again.' });
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Firebase logout error:', error);
    }
    localStorage.removeItem('marketchain_user');
    dispatch({ type: 'LOGOUT' });
  };

  const switchRole = (role: string) => {
    dispatch({ type: 'SWITCH_ROLE', payload: role });
    if (state.user) {
      const updatedUser = {
        ...state.user,
        activeRole: state.user.roles.find(r => r.type === role) || state.user.activeRole
      };
      localStorage.setItem('marketchain_user', JSON.stringify(updatedUser));
    }
  };

  const updateKYCStatus = (status: 'pending' | 'verified' | 'rejected') => {
    dispatch({ type: 'UPDATE_KYC', payload: status });
  };

  const setLanguage = (language: string) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      switchRole,
      updateKYCStatus,
      sendOTP,
      setLanguage
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};