import { useAppSelector } from "@/app/ReduxHooks"
import { Iblog } from "@/app/Types/Ilanding";
import { Avatar,  AvatarImage } from "@/components/ui/avatar"
import { Dot,  TrendingUp } from "lucide-react"
import { FC} from "react";
import { Link } from "react-router-dom";
import moment from 'moment'
interface ITrendingProp {
  data:Iblog;
  }
export const ShortCard:FC<ITrendingProp> = ({data})=>{
  return(<div className="flex flex-col md:w-full border max-md:w-[49%] my-1 py-2 p-1  rounded-md ">
    <Link to={`/user/${data.author._id}`} className="flex items-center  gap-x-0.5">
     
        <Avatar className="p-2">
    <AvatarImage   src={data?.author?.avatar||"/images/muaaz.png"} className="w-full rounded-full  aspect-square"/>
  </Avatar>
 
  

<h1 className="font-bold">{data?.author?.username||"Anonymous"}</h1>

<Dot className="max-md:hidden"/>
<p className="max-md:hidden">{moment(data?.publishDate).fromNow()}</p>
</Link>
<Link to={`/blog/${data._id}`} className="">
<h1  className="lg:text-[1.1rem] max-lg:text-[.9rem] whitespace-normal h-max w-full   BFont pr-4 cursor-pointer " >{data?.title}</h1>
</Link>
<div className="flex justify-between pr-3 gap-x-2">

<Link to={`/topic/${data.topic._id}`} className="whitespace-nowrap bg-gray-200 text-sm px-3 py-0.5 rounded ">{data.topic.title}</Link>
<div className="text-sm hFont border border-dashed px-2">{data.timeToRead}</div>
</div>
</div>
)
}

export const TrendingSection = () => {
  let data = useAppSelector(state=>state.landing)
  return (
    <div className="w-full ">
        <h1 className="flex items-center py-2 text-xl BFont gap-x-2"> Trending Blogs <TrendingUp size={16}/> </h1>
    <div className="flex flex-wrap gap-1">
        {
          data.Trendings.length!==0&&
          data.Trendings.map((elm)=><ShortCard data={elm}/>)
        }
        </div>
    </div>
  )
}