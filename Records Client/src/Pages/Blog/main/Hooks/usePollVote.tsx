import VotePollFn from "@/Queryfunctions/Posts/VotePoll"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { BlogInsert } from "@/app/Slices/BlogSlice"
import { IPoll } from "@/app/Types/Ilanding"
import { toast } from "react-hot-toast"
import { useMutation } from "react-query"

const usePollVote = (Poll:IPoll) => {
    let dispatch = useAppDispatch()
    let PollState=useAppSelector(state=>state.Blog.data?.Poll)
        let {mutate,isLoading}=useMutation({mutationKey:"PollingVote",mutationFn:(title:string)=>VotePollFn(Poll,title) ,onError(err:any) {
            toast.error(err?.response?.data?.msg)
          }, onSuccess(data) {
            if (PollState?.total==0) {
              let UpdatedPoll={...PollState,Polled:true,
                PolledTotal:PollState?.total||0+1 , options:PollState?.options.map(elm=>{
                  if (elm.title==data.title) {
                    return {...elm,votes:100}
                  }
                  else{
  return elm
                  }
                })}

              dispatch(BlogInsert({Poll:UpdatedPoll}))
            }
            else{
              dispatch(BlogInsert({Polled:true,PolledTotal:PollState?.total||0+1}))
            }
          },})
          return {mutate,isLoading,dispatch}
}

export default usePollVote
