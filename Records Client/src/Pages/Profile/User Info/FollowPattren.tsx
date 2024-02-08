import { LightLoader } from "@/Essentials/Loader"
import FollowFn from "@/Queryfunctions/Posts/FollowUnfollow"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { CreditsInsertion } from "@/app/Slices/CredentialSlice"
import { userDetailsInsertion } from "@/app/Slices/UserDetailsSilce"
import CreditsValidator from "@/app/middlewares/functions/CreditsValidator"
import { toast } from "react-hot-toast"
import { useMutation } from "react-query"

const FollowPattren = () => {
    const data = useAppSelector(state=>state.userDetails)
    let dispatch=useAppDispatch()
    let {Info} =useAppSelector(state=>state.credits)
    let credits =useAppSelector(state=>state.credits)
    const {mutate,isLoading}=useMutation({mutationFn:()=>FollowFn(data.Info?._id)
       ,mutationKey:[data.Info?._id,"save"] , onSuccess(resp) {
      if (resp.type=="follow") {
          toast.success(`You are following ${data.Info.username}`)
          dispatch(userDetailsInsertion({Follower:[...data.Follower,Info]}))
          dispatch(CreditsInsertion({following:[...Info.following,data.Info]}))
        }
        else{

            dispatch(userDetailsInsertion({Follower:data.Follower.filter(elm=>elm._id!==Info._id)}))
          dispatch(CreditsInsertion({following:Info.followers.filter(elm=>elm._id!==data.Info._id)}))
        }

    },})

    
  return (
    <div className='w-full h-full  ' onClick={()=>{
      CreditsValidator<typeof mutate,typeof dispatch>(credits,mutate,dispatch)}}>
{!isLoading? (Info.following.some(elm=>elm._id==data.Info._id))? "Unfollow":"Follow" : <LightLoader/>}
    </div>
  )
}

export default FollowPattren
