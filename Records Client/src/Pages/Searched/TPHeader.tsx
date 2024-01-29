import { useAppSelector } from "@/app/ReduxHooks"
import { Dot } from "lucide-react"
import { useParams } from "react-router-dom"
import FollowTopicPattren from "./FollowTopicPattren"

const TPHeader = () => {
  let {Topic,TopicSearch,totalResults} = useAppSelector(state=>state.searched)
  let search=useParams()
  if (TopicSearch===true) {
  return (
    <header className="flex flex-col gap-y-4 h-[30vh] center">
    <h1 className="text-5xl hFont">
        {Topic.title}
    </h1>
    <div className="flex gap-x-2 text-lg">
        <p className=" font-roboto" >
          {Topic.totalPosts} blogs</p>
        <Dot/>
        <p className=" font-roboto" >{Topic.Followers} followers</p>
    </div>
 <FollowTopicPattren/>
  </header>
  )
  }
  else{
    return (
    <header className="flex flex-col gap-y-4 h-[14rem] center">
    <h1 className="text-5xl hFont flex  gap-x-2">
      <p className="text-gray-600">SEARCH:</p> {search.q}
    </h1>
    <p>Total Results:{totalResults}</p>
    </header>
    )
  }
}

export default TPHeader
