// utils/auth.ts
import { useRouter } from 'next/navigation';

export const logout = () => {
  // Clear the auth token from cookies
  document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  
  // Clear any other auth-related data
  localStorage.removeItem('auth-token'); // If you're also storing in localStorage
  
  // Redirect to login page
  window.location.href = '/';
};

// Hook for logout functionality
export const useLogout = () => {
  const router = useRouter();
  
  return () => {
    // Clear the auth token from cookies
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    
    // Clear any other auth-related data
    localStorage.removeItem('auth-token');
    
    // Navigate to login page
    router.push('/');
  };
};