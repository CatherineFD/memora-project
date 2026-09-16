import { Navigate } from 'react-router-dom';
import { authStorage } from '@memora/auth-storage';

interface GuestRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const GuestRoute = ({ children, redirectTo = '/user' }: GuestRouteProps) => {
  const isAuthenticated = authStorage.isAuthenticated();
  
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
};

export default GuestRoute;