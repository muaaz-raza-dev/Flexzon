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
    <main  className="flex flex-col rounded  lg:w-[30%] gap-y-2  max-lg:w-[35%] max-md:w-[95%]  md:h-[21rem] max-md:h-[27rem]    ">

        <Link    to={!data.FollowerOnly?`/blog/${data?._id}`:IsFollower?`/blog/${data?._id}`:`/user/${data?.author._id}`} className="flex justify-center object-fill w-full h-[45%]  ">

              <img
                src={data?.banner || "/images/Records.png"}
                alt=""
                className="object-cover w-full rounded h-full "
                loading="lazy"

              />
           
        </Link>
<div className="h-[45%] ">

     <Link to={!data.FollowerOnly?`/blog/${data?._id}`:IsFollower?`/blog/${data?._id}`:`/user/${data?.author._id}`} className="h-[40%]">
        <h1 className="text-2xl   font-bold ">{data?.title}</h1>
     </Link>
        <p className=" h-[60%] text-gray-600 text-lg overflow-hidden break-words">{data?.subTitle.slice(0,60)|| ""}...</p>
        </div>
        <div className="flex w-full h-[10%]">

       
        <section className="flex items-center w-full py-2 gap-x-2">
        <Link to={`/topic/${data?.topic?._id}`} className=" px-2 whitespace-nowrap py-0.5 bg-gray-200 rounded-md  text-sm">{data?.topic?.title}</Link>
      
<p className="tracking-tighter text-gray-800 md:text-sm max-md:text-xs whitespace-nowrap">{moment(data.publishDate).format("D MMMM YY")||"-"}</p>

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


