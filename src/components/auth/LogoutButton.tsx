"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';
import { toast } from 'react-hot-toast';
import { ExitToApp } from '@mui/icons-material';

interface LogoutButtonProps {
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  className = '', 
  showIcon = true,
  children 
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Logout using Better Auth
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Logged out successfully!');
            router.push('/login');
          },
          onError: (ctx) => {
            console.error('Better-auth logout error:', ctx.error);
            toast.error('Logout failed. Please try again.');
          }
        }
      });
      
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`
        flex items-center gap-2 px-4 py-2 
        text-red-600 hover:text-red-800 
        hover:bg-red-50 rounded-lg 
        transition-colors duration-200
        ${className}
      `}
      type="button"
    >
      {showIcon && <ExitToApp className="w-4 h-4" />}
      {children || 'Logout'}
    </button>
  );
};

export default LogoutButton;
