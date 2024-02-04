import { FC} from "react"
import PuserInfoFile from "./User Info/PuserInfoFile"
import PUserPost from "./User's Posts/PUserPost"
import { useParams } from "react-router-dom"
import {  useQuery } from "react-query"
import FetchIndividualUser  from "@/Queryfunctions/Detail/FetchIndividualUser"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { userDetailsInsertion } from "@/app/Slices/UserDetailsSilce"
import { RecordsLoader } from "@/Essentials/Loader"
import UPostHeader from "./Post Header/UPostHeader"
import ErrorPage from "@/Essentials/ErrorPage"
const ProfileFile:FC = () => {
  let dispatch = useAppDispatch()
  let credits = useAppSelector(state=>state.credits)
  let Params = useParams()
  let {isLoading,data,isError }=useQuery({queryKey:[Params.id,"user"],
  queryFn:()=>FetchIndividualUser(Params?.id||""),onSuccess(data) {
  dispatch(userDetailsInsertion({Info:data.payload,isAdmin:data.payload._id===credits.Info._id ,Posts:data.payload.Posts, Follower:data.payload?.followers , Following:data?.payload.following
  }))
  },     refetchOnWindowFocus: false})  
  

if (isLoading) {
  return <RecordsLoader/>
}
if (isError) {
  return <ErrorPage/>
}
  return (
    <main className="w-full flex flex-col items-center justify-center">
<PuserInfoFile />
      {data.payload._id===credits.Info._id&&<UPostHeader/>
      }
      <PUserPost />
    </main>
  )
}

export default ProfileFile
