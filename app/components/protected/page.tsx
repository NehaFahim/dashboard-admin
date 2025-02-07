"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean | null>(null); // Use null to prevent flashing issues

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        router.replace("/admin"); // Use replace() to avoid infinite redirects
      } else {
        setIsVerified(true);
      }
    }
  }, [router]);

  if (isVerified === null) {
    return <div className="h-screen flex items-center justify-center text-xl">Loading...</div>; // Show a loading state
  }

  return <>{children}</>;
}
