import { Route,Routes } from 'react-router-dom'
import{useEffect, useState ,lazy,Suspense} from "react"
import { Toaster } from 'react-hot-toast'
import  { FetchStarter } from "@/Queryfunctions/Hooks/useFetchStarter"
import { insertion } from './app/Slices/LandingSlice'
import CreditsGuard, { LoginAskModal } from './app/middlewares/CreditsGuard'
import  { RecordsLoader } from './Essentials/Loader'
import { useAppDispatch, useAppSelector } from './app/ReduxHooks'
import { useMutation } from 'react-query'
import useValidate from './Queryfunctions/Hooks/useValidate'
import Navbar from './Essentials/Navbar/Navbar'
const LandingFile = lazy(() => import('./Pages/Landing page/LandingFile'));
const ProfileFile = lazy(() => import('./Pages/Profile/ProfileFile'));
const BlogFile = lazy(() => import('./Pages/Blog/BlogFile'));
const SearchedPageFile = lazy(() => import('./Pages/Searched/SearchedPageFile'));
const AuthFile = lazy(() => import('./Pages/Auth/AuthFile'));
const WriteFile = lazy(() => import('./Pages/Write/WriteFile'));
const SettingFile = lazy(() => import('./Pages/Setting/SettingFile'));
const NotificationFile = lazy(() => import('./Pages/Notification/NotificationFile'));
const RecordsFile = () => {
  let state=useAppSelector(state=>state.landing)
  let validation = useValidate()
  let Info=useAppSelector(state=>state.credits)
  const [Loading, setLoading] = useState(true);
  let dispatch =useAppDispatch()
  let {mutate,isLoading}= useMutation({mutationKey:"Topics",
 onSuccess(data) {
    dispatch(
      insertion({
          count: state?.count + 1,
          Blogs:[ ...state.Blogs, ...data?.payload?.Blogs]||[],
          Topics:data?.payload?.Topics||[],
  Trendings: data?.payload?.Trendings||[],
  TopCreators:data?.payload.TopCreators||[]
}))
  },
  mutationFn:()=>FetchStarter(state.count,Info.Info.interests)
})

useEffect(() => {
  validation.then((loading)=>{
  mutate()
  setLoading(loading)
      })
  }, []);

  if (isLoading) {
  return<RecordsLoader/>
  }
else {

if (!Loading) {
  return (
    <main>
<Navbar/>
<Toaster/>
{state.ValidModal===true&&<LoginAskModal/>
}
        <Routes>
        <Route path="/" element={<Suspense fallback={<RecordsLoader/>}><LandingFile /></Suspense>} />
      <Route path="*" element={<Suspense fallback={<RecordsLoader/>}><LandingFile /></Suspense>} />
      <Route path="/user/:id" element={<Suspense fallback={<RecordsLoader/>}><ProfileFile /></Suspense>} />
      <Route
        path="/notifications"
        element={
          <Suspense fallback={<RecordsLoader/>}>
            <CreditsGuard>
              <NotificationFile />
            </CreditsGuard>
          </Suspense>
        }
      />
      <Route path="/blog/:id" element={<Suspense fallback={<RecordsLoader/>}><BlogFile /></Suspense>} />
      <Route path="/topic/:topic" element={<Suspense fallback={<RecordsLoader/>}><SearchedPageFile /></Suspense>} />
      <Route path="/search/:q" element={<Suspense fallback={<RecordsLoader/>}><SearchedPageFile /></Suspense>} />
      <Route path="/auth/*" element={<Suspense fallback={<RecordsLoader/>}><AuthFile /></Suspense>} />
      <Route
        path="/write/*"
        element={
          <Suspense fallback={<RecordsLoader/>}>
            <CreditsGuard>
              <WriteFile />
            </CreditsGuard>
          </Suspense>
        }
      />
      <Route
        path="/profile/*"
        element={
          <Suspense fallback={<RecordsLoader/>}>
            <CreditsGuard>
              <SettingFile />
            </CreditsGuard>
          </Suspense>
        }
      />
        </Routes>
    </main>
  )
}
else{
  return<RecordsLoader/>
}
}


}

export default RecordsFile
