import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CircleOff, LucideShare, MessageCircle } from "lucide-react";
import { Webshare } from "./functions/WebShare";
import { Iblog } from "@/app/Types/Ilanding";
import { useAppDispatch } from "@/app/ReduxHooks";
import LikeMechanism from "./LikeMechanism";
import { Link } from "react-router-dom";
import CommentsFile from "./Comments/CommentsFile";
import { CommentInsertion } from "@/app/Slices/CommentSlice";
import SaveBtn from "../Landing page/main/SaveBtn";
import moment from "moment";
const BlogHeader = ({data}:(Iblog|any)) => {
  let dispatch =useAppDispatch()
  return (
    <header className="flex flex-col gap-y-8">
      <div className="">
      <h1 className="text-5xl BFont">{data?.title}</h1>
      <p className="text-gray-700 font-roboto ">{data?.subTitle}</p>
      </div>
      <Link to={data.author?`/user/${data.author?._id }`:`/blog/${data._id}`} className={`flex gap-x-2 items-center ${!data.author&&"cursor-not-allowed"}`} >
        <Avatar>
          <AvatarImage src={data?.author?.avatar || "/images/anonymous.png"} />
        </Avatar>
        <div className="">
          <h1 className="flex text-lg gap-x-4 ">
            {data?.author?.username ||"Anonymous"}
                    </h1>
          <span className="flex text-sm text-gray-500 gap-x-2">
            {data?.timeToRead}
            <p>|| {moment(data?.publishDate).toNow()}</p>
          </span>
        </div>
      </Link>
      <div className="flex flex-col px-2 gap-y-6">
        <Separator />
        <section className="flex justify-between">
          <div className="flex gap-x-6 items-center">
           <LikeMechanism data={data}/>
            {
              data?.commenting?
           <CommentsFile >
            <div onClick={()=>
            dispatch(CommentInsertion({count:0})) 
          } className="flex gap-x-1 cursor-pointer text-[#6B6B6B] hover:text-black transition text-sm items-center">
              <MessageCircle
                size={20}
                className="text-[#6B6B6B] hover:text-black transition"
              />
              {data?.comments?.length}
            </div>
            </CommentsFile>:
            <div className="flex items-center gap-x-2">
          <CircleOff size={20}
          className="text-[#6B6B6B]  transition"/>
          <p className="text-red-500 text-xs">Responses disabled</p>
          </div>
            }
          </div>
          <div className="flex gap-x-6">
            <SaveBtn _id={data._id}/>
            <div className="" onClick={() => Webshare(data?.title,location.href,data?.subTitle)}>
              <LucideShare
                size={20}
                className="text-[#6B6B6B] max-md:w-6 hover:text-[var(--primary)] hover:text-black transition cursor-pointer"
              />
            </div>
          </div>
        </section>
        <Separator />
      </div>
    </header>
  );
};

export default BlogHeader;
