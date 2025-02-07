import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        router.replace("/admin");
      } else {
        setIsVerified(true);
      }
    }
  }, [router]);

  if (isVerified === null) {
    return <div className="h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
