"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user' | 'creator';
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}) => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push(redirectTo);
        return;
      }

      // Check role-based access
      if (requiredRole) {
        const userRole = getUserRole(session.user);
        const hasAccess = checkRoleAccess(userRole, requiredRole);
        if (!hasAccess) {
          router.push('/unauthorized');
          return;
        }
      }
    }
  }, [session, isPending, requiredRole, router, redirectTo]);

  // Show loading while checking authentication
  if (isPending) {
    return <LoadingSpinner />;
  }

  // Don't render children if not authenticated
  if (!session) {
    return null;
  }

  // Don't render children if role check fails
  if (requiredRole && !checkRoleAccess(getUserRole(session.user), requiredRole)) {
    return null;
  }

  return <>{children}</>;
};

// Helper function to get user role from session
const getUserRole = (user: any): string => {
  // Check if user is admin based on email
  if (user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return 'admin';
  }
  
  // Check if user is creator
  if (user.role === 'CREATOR' || user.isCreator) {
    return 'creator';
  }
  
  return 'user';
};

// Helper function to check role-based access
const checkRoleAccess = (userRole: string, requiredRole: string): boolean => {
  const roleHierarchy = {
    admin: 3,
    creator: 2,
    user: 1
  };

  const userRoleLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
  const requiredRoleLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

  return userRoleLevel >= requiredRoleLevel;
};

export default ProtectedRoute;
