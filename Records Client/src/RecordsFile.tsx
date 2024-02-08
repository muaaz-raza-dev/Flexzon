import { Route,Routes } from 'react-router-dom'
import Navbar from './Essentials/Navbar/Navbar'
import LandingFile from './Pages/Landing page/LandingFile'
import ProfileFile from './Pages/Profile/ProfileFile'
import BlogFile from './Pages/Blog/BlogFile'
import SettingFile from './Pages/Setting/SettingFile'
import AuthFile from './Pages/Auth/AuthFile'
import WriteFile from './Pages/Write/WriteFile'
import 'react-loading-skeleton/dist/skeleton.css'
// import NotificationFile from './Pages/Notification/NotificationFile'
import { Toaster } from 'react-hot-toast'
import  { FetchStarter } from "@/Queryfunctions/Hooks/useFetchStarter"
import useValidate from './Queryfunctions/Hooks/useValidate'
import { useMutation } from 'react-query'
import { useAppDispatch, useAppSelector } from './app/ReduxHooks'
import { insertion } from './app/Slices/LandingSlice'
import{useEffect, useState} from "react"
import SearchedPageFile from './Pages/Searched/SearchedPageFile'
import CreditsGuard, { LoginAskModal } from './app/middlewares/CreditsGuard'
import  { RecordsLoader } from './Essentials/Loader'
import NotificationFile from './Pages/Notification/NotificationFile'
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
<Route path='/' element={<LandingFile/>}/>
<Route path='*' element={<LandingFile/>}/>
<Route path='/user/:id' element={<ProfileFile  />}/>
<Route path='/notifications' element={<CreditsGuard><NotificationFile  /></CreditsGuard>}/>
<Route path='/blog/:id' element={<BlogFile />}/>
<Route path='/topic/:topic' element={<SearchedPageFile  />}/>
<Route path='/search/:q' element={<SearchedPageFile  />}/>
<Route path='/auth/*' element={<AuthFile />}/>
<Route path='/write/*' element={<CreditsGuard><WriteFile/></CreditsGuard>}/>
<Route path='/profile/*' element={
  <CreditsGuard>
<SettingFile />
  </CreditsGuard>
}/>
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
