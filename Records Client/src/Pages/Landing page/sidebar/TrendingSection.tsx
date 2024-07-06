import { useAppSelector } from "@/app/ReduxHooks"
import { Iblog } from "@/app/Types/Ilanding";
import { Avatar,  AvatarImage } from "@/components/ui/avatar"
import { FC} from "react";
import { Link } from "react-router-dom";
import moment from 'moment'
import LikeBtn from "../main/LikeBtn";
import SaveBtn from "../main/SaveBtn";
interface ITrendingProp {
  data:Iblog;
  }
export const ShortCard:FC<ITrendingProp> = ({data})=>{
  return(<div className="flex flex-col md:w-[90%] gap-2 max-md:min-w-[98%] my-1 py-2 p-1  ">
    <Link to={`/user/${data.author._id}`} className="flex items-center  gap-x-2">
        <Avatar className="h-full w-max">
    <AvatarImage   src={data?.author?.avatar||"/images/muaaz.png"} className="w-6 h-6 bg-black rounded-full  aspect-square object-contain"/>
  </Avatar>
<h1 className="font-bold">{data?.author?.username||"Anonymous"}</h1>
</Link>
<Link to={`/blog/${data._id}`} className="">
<h1  className="lg:text-[1.23rem] max-lg:text-[.9rem] whitespace-normal h-max w-full   hFont font-extrabold pr-4 cursor-pointer " >{data?.title}</h1>
</Link>
<div className="flex justify-between pr-3 gap-x-2">

<b className="whitespace-nowrap text-sm  py-0.5 rounded ">{moment(data?.publishDate).format("D MMM Y")}
</b>
<div className="text-sm hFont  flex items-center  text-gray-500  ">
  <LikeBtn _id={data._id} size={20}/>
  <SaveBtn _id={data._id} size={20}/>
</div>
</div>
</div>
)
}

export const TrendingSection = () => {
  let data = useAppSelector(state=>state.landing)
  return (
    <div className="w-full ">
        <h1 className="flex items-center  hFont font-bold text-xl tracking-wide gap-x-2"> 
         Top Picks  </h1>
    <div className="flex flex-wrap justify-start gap-1">
        {
          data.Trendings.length!==0&&
          data.Trendings.map((elm)=><ShortCard data={elm}/>)
        }
        </div>
        <div className="center mt-5">
    <div className="w-[80%] h-[1px] bg-gray-200"></div>
    </div>
    </div>
  )
}