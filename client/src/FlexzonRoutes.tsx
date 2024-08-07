import { lazy,Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CreditsGuard, { LoginAskModal } from "./app/middlewares/CreditsGuard";
import Navbar from "./Essentials/Navbar/Navbar";
const MessagingFile = lazy(() => import("./Pages/Messaging/MessagingFile"));
import { FileLoader} from "./Essentials/Loader";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "./app/ReduxHooks";
import useSocketHandler from "./Pages/Messaging/Hooks/Chat/socket/useSocketHandler";
const LandingFile = lazy(() => import("./Pages/Landing page/LandingFile"));
const ProfileFile = lazy(() => import("./Pages/Profile/ProfileFile"));
const BlogFile = lazy(() => import("./Pages/Blog/BlogFile"));

import { SpeedInsights } from "@vercel/speed-insights/react"
const SearchedPageFile = lazy(
  () => import("./Pages/Searched/SearchedPageFile")
);
import { Toaster as ToastShdcn } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react";
import LpSidebarFile from "./Pages/Landing page/sidebar/LpSidebarFile";

const AuthFile = lazy(() => import("./Pages/Auth/AuthFile"));
const WriteFile = lazy(() => import("./Pages/Write/WriteFile"));
const SettingFile = lazy(() => import("./Pages/Setting/SettingFile"));
const NotificationFile = lazy(
  () => import("./Pages/Notification/NotificationFile")
);
const FlexzonRoutes = () => {
    let state = useAppSelector((state) => state.landing);
    let logined =useAppSelector(s=>s.credits.isLogined)
    let {pathname}  = useLocation()
    if(logined){useSocketHandler()}
  return (
    <main>
      {logined === true  ? <Navbar />  : pathname == "/" ? null : <Navbar/>}

    <Toaster />
    <Analytics/>  {/* vercel Analytics */}
    <SpeedInsights/> {/* vercel Speed insights */}
    <ToastShdcn/>
    {state.ValidModal === true && <LoginAskModal />}
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<FileLoader />}>
            <LandingFile />
          </Suspense>
        }
      />
      <Route
        path="/recommendations"
        element={
          <Suspense fallback={<FileLoader />}>
            <LpSidebarFile />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<FileLoader />}>
            <LandingFile />
          </Suspense>
        }
      />
      <Route
        path="/user/:id"
        element={
          <Suspense fallback={<FileLoader />}>
            <ProfileFile />
          </Suspense>
        }
      />
      <Route
        path="/notifications"
        element={
          <Suspense fallback={<FileLoader />}>
            <CreditsGuard>
              <NotificationFile />
            </CreditsGuard>
          </Suspense>
        }
      />
      <Route
        path="/blog/:id"
        element={
          <Suspense fallback={<FileLoader />}>
            <BlogFile />
          </Suspense>
        }
      />
      <Route
        path="/topic/:topic"
        element={
          <Suspense fallback={<FileLoader />}>
            <SearchedPageFile />
          </Suspense>
        }
      />
      <Route
        path="/search/:q"
        element={
          <Suspense fallback={<FileLoader />}>
            <SearchedPageFile />
          </Suspense>
        }
      />
      <Route
        path="/auth/*"
        element={
          <Suspense fallback={<FileLoader />}>
            <AuthFile />
          </Suspense>
        }
      />
      <Route
        path="/write/*"
        element={
          <Suspense fallback={<FileLoader />}>
            <CreditsGuard>
              <WriteFile />
            </CreditsGuard>
          </Suspense>
        }
      />
      <Route
        path="/profile/*"
        element={
          <Suspense fallback={<FileLoader />}>
            <CreditsGuard>
              <SettingFile />
            </CreditsGuard>
          </Suspense>
        }
      />
   
     <Route
        path="/messaging/*"
        element={
            <Suspense fallback={<FileLoader />}>
          <CreditsGuard>
              <MessagingFile />
              </CreditsGuard>
              </Suspense>
        }
      />
    </Routes> 
  </main>
  )
}

export default FlexzonRoutes
