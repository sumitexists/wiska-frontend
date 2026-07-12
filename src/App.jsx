import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromChildren,
  Route,
} from "react-router-dom";
import { userLoader } from "./loaders/userLoader";
import VerifiedRootLayout from "./VerfiedRootLayout";
import VerifiedProfilePage from "./pages/VerifiedProfilePage";
import { knownContactService } from "./services/knownContactService";
import { getMessages } from "./services/messageService";
import ChatRoom from "./features/private/components/ui/ChatRoom";
import AnonymousModePage from "./pages/AnonymousModePage";
import PostsList from "./features/anonymous/components/ui/PostsList";
import CommunityList from "./features/anonymous/components/ui/CommunityList";
import Post from "./features/anonymous/components/ui/Post";
import Community from "./features/anonymous/components/ui/Community";
import Profile from "./features/anonymous/components/ui/Profile";
import {
  fetchAnonymousUser,
  fetchCommunity,
  fetchCommunityDetails,
  fetchPostDetails,
  fetchPosts,
  fetchAnonymousUserPostsAndCommunities,
} from "./loaders/anonymousLoader";
import ManageFriends from "./features/private/components/ui/ManageFriends";
import AddFriend from "./features/private/components/ui/AddFriend";
import { fetchPendingFriendRequests } from "./loaders/knownContactsLoader";
import PendingFriendRequest from "./features/private/components/ui/PendingFriendRequest";
import FriendsList from "./features/private/components/ui/FriendsList";
import AnonymousRootLayout from "./AnonymousRootLayout";
import CreatePostForm from "./features/anonymous//components/ui/CreatePostForm";
import CreateCommunityForm from "./features/anonymous/components/ui/CreateCommunityForm";
function App() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        //Verified Routes

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<VerifiedRootLayout />} loader={userLoader}>
          <Route path="" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/verified-profile"
            element={<VerifiedProfilePage />}
            loader={knownContactService}
          >
            <Route
              path=":contactId"
              element={<ChatRoom />}
              loader={getMessages}
            />
          </Route>
          <Route
            path="/verified-profile/manage-friends"
            element={<ManageFriends />}
          >
            <Route path="" element={<AddFriend />} />
            <Route
              path="pending-requests"
              element={<PendingFriendRequest />}
              loader={fetchPendingFriendRequests}
            />
            <Route
              path="friends-list"
              element={<FriendsList />}
              loader={knownContactService}
            />
          </Route>
        </Route>
        //Anonymous Routes
        <Route path="/anonymous-mode" element={<AnonymousRootLayout />} loader={fetchAnonymousUser}>
          <Route path="" element={<AnonymousModePage />}>
            <Route path="" element={<PostsList />} loader={fetchPosts} />
            <Route
              path="communities"
              element={<CommunityList />}
              loader={fetchCommunity}
            />
            <Route
              path="post/:postId"
              element={<Post />}
              loader={fetchPostDetails}
            />
            <Route
              path="community/:communityId"
              element={<Community />}
              loader={fetchCommunityDetails}
            />
            <Route
              path="profile/:userId"
              element={<Profile />}
              loader={fetchAnonymousUserPostsAndCommunities}
            />
              <Route
              path="/anonymous-mode/create-post"
              element={<CreatePostForm />}
              />
               <Route
              path="/anonymous-mode/create-community"
              element={<CreateCommunityForm />}
              />
          </Route>
        </Route>
      </>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default App;
