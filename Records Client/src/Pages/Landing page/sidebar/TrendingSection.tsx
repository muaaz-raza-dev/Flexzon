import { useAppSelector } from "@/app/ReduxHooks"
import { Iblog } from "@/app/Types/Ilanding";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Dot, Heart, TrendingUp } from "lucide-react"
import { FC } from "react";
import { Link } from "react-router-dom";
import moment from 'moment'
interface ITrendingProp {
  data:Iblog;
  }
export const ShortCard:FC<ITrendingProp> = ({data})=>{

  return(<div className="flex flex-col w-full py-2 border-b md:border-r">
    <Link to={`/user/${data.author._id}`} className="flex items-center  gap-x-0.5">
  <Avatar className="p-2">
    <AvatarImage src={data?.author?.avatar||"/images/muaaz.png"} className="w-full rounded-full -z-10 aspect-square"/>
  </Avatar>
<h1 className="font-bold">{data?.author?.username||"Anonymous"}</h1>
<Dot/>
<p>{moment(data?.publishDate).fromNow()}</p>
</Link>
<Link to={`/blog/${data._id}`} className="">
<h1  className="text-[1.1rem] whitespace-normal h-max w-full   BFont pr-4 cursor-pointer " >{data?.title}</h1>
</Link>
<div className="flex justify-between pr-3">

<Link to={`/topic/${data.topic._id}`} className="whitespace-nowrap bg-gray-200 text-sm px-3 py-0.5 rounded ">{data.topic.title}</Link>
<p className="center gap-x-2">{data?.likes} <Heart size={12} className="text-gray-600"/></p>
</div>
</div>)
}

export const TrendingSection = () => {
  let data = useAppSelector(state=>state.landing)
  return (
    <div className="w-full ">
        <h1 className="flex items-center py-2 text-xl BFont gap-x-2"> Trending Blogs <TrendingUp size={16}/> </h1>
        {
          data.Trendings.length!==0&&
            data.Trendings.map((elm)=><ShortCard data={elm}/>)
        }
    </div>
  )
}