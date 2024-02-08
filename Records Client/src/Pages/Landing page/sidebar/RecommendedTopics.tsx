import { useAppSelector } from "@/app/ReduxHooks"
import { Itopic } from "@/app/Types/Ilanding"
import { TrendingUp } from "lucide-react"
import { FC } from "react"
import { Link } from "react-router-dom"
interface Itopics {
    data: {
        _id:string;
        topic:Itopic,
        results?:number
    }
}
export const TopicBox:FC<Itopics>=({data})=>{
    
    return (
        <Link to={`/topic/${data.topic._id}`} className="flex p-2  min-w-[20%] text-white font-medium border-2  bg-[var(--primary)] items-center justify-center rounded-xl cursor-pointer text-sm transition">
            {data._id}
        </Link>
    )
}
export const RecommendedTopics = () => {
    let data = useAppSelector(state=>state.landing)
  return (
    <div className="w-full max-md:hidden">
        <h1 className="text-xl BFont flex gap-x-2 py-2 items-center "> Trending Topics today <TrendingUp size={16} />  </h1>
        <div className="flex gap-2 justify-start   max-md:w-full flex-wrap">
{
    data.Topics.slice(0,6).map((elm)=><TopicBox data={elm}/>)
}

    </div>
    </div>
  )
}