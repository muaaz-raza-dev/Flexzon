import FollowTopicFn from "@/Queryfunctions/Topic/FollowTopic"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { CreditsInsertion } from "@/app/Slices/CredentialSlice"
import { SearchedInsert } from "@/app/Slices/SearchedSlice"
import CreditsValidator from "@/app/middlewares/functions/CreditsValidator"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { useMutation } from "react-query"

const FollowTopicPattren = () => {
    const data = useAppSelector(state=>state.userDetails)
    const searchedData = useAppSelector(state=>state.searched)
    let dispatch=useAppDispatch()
    let credits =useAppSelector(state=>state.credits)
    const {mutate}=useMutation({mutationFn:()=>FollowTopicFn(searchedData.Topic._id) ,mutationKey:[data.Info?._id,"Follow Topic"] , onSuccess(resp) {
        let payloadEntry = {_id:searchedData.Topic._id,title:searchedData.Topic.title}
      if (resp.type=="follow") {
          toast.success(`You are following ${searchedData.Topic.title}`)
        dispatch(CreditsInsertion({interests:[...credits.Info.interests,payloadEntry]}))
        dispatch(SearchedInsert({Topic:{...searchedData.Topic,Followers:searchedData.Topic.Followers+1}}))
        }
        else{
            dispatch(CreditsInsertion({interests:credits.Info.interests.filter(elm=>elm._id!==searchedData.Topic._id)}))
            dispatch(SearchedInsert({Topic:{...searchedData.Topic,Followers:searchedData.Topic.Followers-1}}))
        }

    },})
  return (
    <Button onClick={()=>CreditsValidator<typeof mutate,typeof dispatch>(credits,mutate,dispatch)} className="hover:bg-[var(--primary)]  px-5 py-2 rounded-lg active:scale-95 transition-transform primary">{credits.Info.interests.find(elm=>elm._id===searchedData.Topic._id)?"Following":"Follow"}</Button>
  )
}

export default FollowTopicPattren
