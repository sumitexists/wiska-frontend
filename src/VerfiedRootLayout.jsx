import { Outlet, useLoaderData } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthContext";

function VerifiedRootLayout() {
  const userData = useLoaderData();

  const initialUser = userData?.user ?? null;
  const initialToken = userData?.token ?? "";

  return (
    <AuthProvider initialUser={initialUser} initialToken={initialToken}>
      <Outlet />
    </AuthProvider>
  );
}

export default VerifiedRootLayout;
