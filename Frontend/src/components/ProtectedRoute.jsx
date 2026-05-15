import { Navigate } from "react-router";
import { useAuth } from "../hook/useAuth";

function ProtectedRoute({ children }) {
  const { authUser, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-300">
        Loading...
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
