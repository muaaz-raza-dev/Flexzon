import { useAppSelector } from "@/app/ReduxHooks"
import { Itopic } from "@/app/Types/Ilanding"
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
        <Link to={`/topic/${data.topic._id}`} className="flex p-2 items-center justify-center rounded-md bg-gray-200 cursor-pointer hover:bg-gray-300 transition">
            {data._id}
        </Link>
    )
}
export const RecommendedTopics = () => {
    let data = useAppSelector(state=>state.landing)
  return (
    <div className="w-full ">
        <h1 className="text-xl BFont flex gap-x-2 py-2 "> Recommended Topics  </h1>
        <div className="flex gap-2  max-md:w-full flex-wrap">
{
    data.Topics.slice(0,7).map((elm)=><TopicBox data={elm}/>)
}
    </div>
    </div>
  )
}