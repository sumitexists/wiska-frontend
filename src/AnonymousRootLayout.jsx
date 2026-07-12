import { Outlet, useLoaderData } from "react-router-dom";
import { AnonymousProvider } from "./context/auth/AnonymousContext";

function AnonymousRootLayout() {
  const anonymousData = useLoaderData();

  const initialUser = anonymousData;

  return (
    <AnonymousProvider initialAnonymousUser={initialUser}>
      <Outlet />
    </AnonymousProvider>
  );
}

export default AnonymousRootLayout;
