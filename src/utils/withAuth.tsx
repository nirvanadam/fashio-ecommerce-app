import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/auth/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  // ✅ Tambahkan displayName
  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return AuthComponent;
};

export default withAuth;
