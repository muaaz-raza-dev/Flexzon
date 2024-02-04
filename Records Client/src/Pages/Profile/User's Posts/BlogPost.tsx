import { Iblog } from "@/app/Types/Ilanding"
import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import BlogOptions from "./BlogOptions"
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import SaveBtn from "@/Pages/Landing page/main/SaveBtn";
import RestrictionIcon from "@/Pages/Landing page/main/RestrictionIcon";
import { useAppSelector } from "@/app/ReduxHooks";
import {useState,useEffect} from "react"
export const BlogPost = ({data}:Iblog|any) => {
  const [IsFollower, setIsFollower] = useState<boolean>(false);
  let {Info} = useAppSelector(state=>state.credits)
  let credits = useAppSelector(state=>state.credits)
  useEffect(() => {
setIsFollower(data.FollowerOnly&&(credits.isLogined&& credits.Info.following.some(elm=>elm._id==data._id)))
TimeAgo.addDefaultLocale(en)
  }, []);
    let timeAgo;
    if (TimeAgo) {
       timeAgo = new TimeAgo('en-US')
    }
  
  return (
    <main  className="flex flex-col  lg:w-[40%] border max-lg:w-[35%] max-md:w-[95%]  md:h-[24rem] max-md:h-[27rem] border-b   px-5 ">

        <Link    to={!data.FollowerOnly?`/blog/${data?._id}`:IsFollower?`/blog/${data?._id}`:`/user/${data?.author._id}`} className="flex justify-center object-fill h-48 bg-gray-300 w-full  border-b  p-2">
{["mp3", "mp4"].includes(data?.banner.split(".")[3]) ? (
              <video src={data.banner} loop autoPlay muted ></video>
            ) : (
              <img
                src={data?.banner || "/images/Records.png"}
                alt=""
                className="w-full object-contain rounded "
              />
            )}
        </Link>

     
        <h1 className="font-bold text-xl ">{data?.title}</h1>
        <p className=" h-[30%]">{data?.subTitle.split(" ").slice(0,20).join(" ")|| ""}...</p>
        <div className="flex  w-full">

        <section className="flex w-full items-center gap-x-2 py-2">
        <p className="md:text-sm max-md:text-xs whitespace-nowrap tracking-tighter text-blue-500 border p-1">{data?.timeToRead} </p>
<p className="text-gray-800 md:text-sm max-md:text-xs whitespace-nowrap tracking-tighter">{timeAgo?.format(new Date(data?.publishDate))||"-"}</p>

        </section>
    <div className="flex gap-x-2  items-center w-full justify-end">
<Link to={`/topic/${data?.topic?._id}`} className=" px-2 whitespace-nowrap py-0.5 bg-gray-200 rounded-md  text-sm">{data?.topic?.title}</Link>
<div className="flex  gap-x-4 items-center ">
  
  <div className="text-gray-800 text-sm flex items-center justify-center gap-x-0.5">
     {data?.likes} 
  
<div className="cursor-not-allowed ">
  <Heart size={18} className="max-md:w-6 text-gray-500"/>

</div>
  </div>

  <RestrictionIcon Info={data.FollowerOnly}/>
<SaveBtn _id={data._id} size={22}/>
{
  Info._id==data.author._id&&
  <BlogOptions id={data?._id}>
     <div className=" rotate-90 text-xl">...</div>
  </BlogOptions>
}
</div>
</div>
      </div>
    </main>
  )
}


