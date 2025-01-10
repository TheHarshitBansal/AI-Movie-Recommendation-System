import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { BlinkBlur } from "react-loading-indicators";
import HomePage from "./pages/HomePage.jsx";
const SignUp = lazy(() => import("./pages/auth/SignUp.jsx"));
const SignIn = lazy(() => import("./pages/auth/SignIn.jsx"));
const Browse = lazy(() => import("./pages/Browse.jsx"));
const MovieDetails = lazy(() => import("./pages/MovieDetails.jsx"));
const ShowDetails = lazy(() => import("./pages/ShowDetails.jsx"));
import RequireAuth from "./components/auth/RequireAuth.jsx";
import NotAuth from "./components/auth/NotAuth.jsx";
import PersonPage from "./pages/PersonPage.jsx";
import ForgetPassword from "./pages/auth/ForgetPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/auth/Profile.jsx";
import EditProfile from "./pages/auth/EditProfile.jsx";
import useOnlineStatus from "./hooks/useOnlineStatus.js";
import Loader from "./components/Loader.jsx";
import ChangePassword from "./pages/auth/ChangePassword.jsx";

const App = () => {
  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return (
      <div className="w-screen h-screen flex">
        <Loader text={"Checking for Internet..."} />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <BlinkBlur
            color="#FF0000"
            size="medium"
            text="Loading !"
            textColor="#141414"
          />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<NotAuth />}>
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/forget-password" element={<ForgetPassword />} />
          <Route path="/auth/reset/:resetId" element={<ResetPassword />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/profile/change-password" element={<ChangePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit-profile" element={<EditProfile />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/browse/movie/:movieId" element={<MovieDetails />} />
          <Route path="/browse/show/:showId" element={<ShowDetails />} />
          <Route path="/person/:personId" element={<PersonPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
