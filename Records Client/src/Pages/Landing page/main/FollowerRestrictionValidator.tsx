import { useAppSelector } from "@/app/ReduxHooks"
import { Iblog } from "@/app/Types/Ilanding"
import { FC } from "react"
import { PostBox } from "./lpMainContent"

const PostBlockRenderer:FC<{data:Iblog}> = ({data}) => {
    let credits = useAppSelector(state=>state.credits)
    
        return (
    <PostBox data={data} Follower={data.FollowerOnly&&(credits.isLogined&& credits.Info.following.some(elm=>elm._id==data.author._id))}/> 
  )
}

export default PostBlockRenderer
