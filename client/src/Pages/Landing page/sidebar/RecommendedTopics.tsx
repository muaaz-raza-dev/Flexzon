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
        <Link to={`/topic/${data.topic._id}`} className="flex p-2 px-5    text-black font-medium    bg-[#e2e2e2] items-center justify-center rounded-3xl cursor-pointer text-sm  hover:rounded-2xl transition-all">
            {data._id}
        </Link>
    )
}
export const RecommendedTopics = () => {
    let data = useAppSelector(state=>state.landing)
  return (
    <div className="w-full  flex flex-col gap-4">
            <h1 className="flex items-center  hFont font-bold text-xl tracking-wide gap-x-2"> 
            Topic Recommendations  </h1>
        <div className="flex gap-2 justify-start   max-md:w-full flex-wrap">
{
    data.Topics.slice(0,6).map((elm)=><TopicBox data={elm}/>)
}
    </div>
   
    </div>
  )
}