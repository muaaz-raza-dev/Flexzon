import { Link } from "react-router-dom"
import SaveBtn from "@/Pages/Landing page/main/SaveBtn";
import RestrictionIcon from "@/Pages/Landing page/main/RestrictionIcon";
import { useAppSelector } from "@/app/ReduxHooks";
import {useState,useEffect} from "react"
import moment from "moment"
import LikeBtn from "@/Pages/Landing page/main/LikeBtn";
import DeletePost from "./DeletePost";
export const BlogPost = ({data}:any) => {
  const [IsFollower, setIsFollower] = useState<boolean>(false);
  let {Info} = useAppSelector(state=>state.credits)
  let credits = useAppSelector(state=>state.credits)
  useEffect(() => {
setIsFollower(data.FollowerOnly&&(credits.isLogined&& credits.Info.following.some(elm=>elm._id==data._id)))
  }, []);

  
  return (
    <main  className="flex flex-col p-2 shadow lg:w-[40%] gap-y-4 border max-lg:w-[35%] max-md:w-[95%]  md:h-[21rem] max-md:h-[27rem] border-b   px-5 ">

        <Link    to={!data.FollowerOnly?`/blog/${data?._id}`:IsFollower?`/blog/${data?._id}`:`/user/${data?.author._id}`} className="flex justify-center object-fill w-full h-[40%] p-2 bg-[var(--accent)] border-b">

              <img
                src={data?.banner || "/images/Records.png"}
                alt=""
                className="object-contain w-full rounded "
                loading="lazy"

              />
           
        </Link>
<div className="h-[50%]">

     <Link to={!data.FollowerOnly?`/blog/${data?._id}`:IsFollower?`/blog/${data?._id}`:`/user/${data?.author._id}`} className="h-[40%]">
        <h1 className="text-2xl   font-bold ">{data?.title}</h1>
     </Link>
        <p className=" h-[60%] overflow-hidden break-words">{data?.subTitle.slice(0,120)|| ""}...</p>
        </div>
        <div className="flex w-full">

       
        <section className="flex items-center w-full py-2 gap-x-2">
        <Link to={`/topic/${data?.topic?._id}`} className=" px-2 whitespace-nowrap py-0.5 bg-gray-200 rounded-md  text-sm">{data?.topic?.title}</Link>
      
<p className="tracking-tighter text-gray-800 md:text-sm max-md:text-xs whitespace-nowrap">{moment(data.publishDate).fromNow()||"-"}</p>

        </section>
    <div className="flex items-center justify-end w-full gap-">
   
<div className="flex items-center gap-x-1">
  {
    data?.likesCount&&
  <div className="text-gray-800 text-base  flex items-center justify-center gap-x-0.5">
     {data?.likes} 
  <LikeBtn _id={data._id}/>
  </div>
  }

  <RestrictionIcon Info={data.FollowerOnly}/>
<SaveBtn _id={data._id} size={22}/>
{
  Info._id==data.author._id&&
  <DeletePost id={data._id}/>

}
</div>
</div>
      </div>
    </main>
  )
}


