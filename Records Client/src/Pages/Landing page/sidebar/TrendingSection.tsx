import { useAppSelector } from "@/app/ReduxHooks"
import { Iblog } from "@/app/Types/Ilanding";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Dot, Heart, TrendingUp } from "lucide-react"
import { FC } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
interface ITrendingProp {
  data:Iblog;
  }
export const ShortCard:FC<ITrendingProp> = ({data})=>{
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')
  return(<div className="w-full flex flex-col border-b md:border-r py-2">
    <Link to={`/user/${data.author._id}`} className="flex items-center  gap-x-0.5">
  <Avatar className="p-2">
    <AvatarImage src={data?.author?.avatar||"/images/muaaz.png"} className="-z-10 w-full aspect-square rounded-full"/>
  </Avatar>
<h1 className="font-bold">{data?.author?.username||"Anonymous"}</h1>
<Dot/>
<p>{timeAgo.format(new Date(data?.publishDate))}</p>
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
    <div className="w-full">
        <h1 className="text-xl BFont flex gap-x-2 py-2 "> Trending <TrendingUp /> </h1>
        {
          data.Trendings.length!==0&&
            data.Trendings.map((elm)=><ShortCard data={elm}/>)
        }
    </div>
  )
}