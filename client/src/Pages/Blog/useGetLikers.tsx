import getLikersFn from "@/Queryfunctions/Posts/LikerDetails"
import { useAppSelector } from "@/app/ReduxHooks"
import { useQuery } from "react-query"

const useGetLikers = () => {
let PostId = useAppSelector(state=>state.Blog.data?._id)
let {data} =useQuery({queryKey:["Likers",PostId],queryFn:()=>getLikersFn(PostId||"")
})
return {data}
}

export default useGetLikers
