import AnonymousHeader from "../features/anonymous/components/layout/AnonymousHeader";
import AnonymousNavBar from "../features/anonymous/components/layout/AnonymousNavBar";
import Posts from "../features/anonymous/components/ui/PostCard";
import { Outlet, useLoaderData } from "react-router-dom";


function AnonymousModePage() {
  const posts = useLoaderData();

  return (
    <>
      <AnonymousHeader />
      <AnonymousNavBar />
      <Outlet />
    </>
  );
}

export default AnonymousModePage;