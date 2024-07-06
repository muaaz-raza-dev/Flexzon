import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { LucideShare, MessageCircle } from "lucide-react";
import { Webshare } from "./functions/WebShare";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import LikeMechanism from "./LikeMechanism";
import { Link } from "react-router-dom";
import CommentsFile from "./Comments/CommentsFile";
import { CommentInsertion } from "@/app/Slices/CommentSlice";
import SaveBtn from "../Landing page/main/SaveBtn";
import moment from "moment";
import LikersViewer from "./LikersViewer";
const BlogHeader = () => {
  let dispatch =useAppDispatch()
  let data = useAppSelector(state=>state.Blog.data)
  return (
    <header className="flex flex-col gap-y-8">
      <div className="">
      <h1 className="text-5xl  hFont">{data?.title}</h1>
      <p className="text-gray-700 text-lg break-words font-roboto w-full  py-1">
             {data?.subTitle}</p>
      </div>
      <div className="flex flex-col px-2 gap-y-6">
        <Separator />
        <section className="flex justify-between">
      <Link to={data?.author?`/user/${data?.author?._id }`:`/blog/${data?._id}`} className={`flex gap-x-2 items-center ${!data?.author&&"cursor-not-allowed"}`} >
        <Avatar>
          <AvatarImage src={data?.author?.avatar || "/images/anonymous.png"} />
        </Avatar>
        <div className="">
          <div className="flex items-center gap-1">
          <b className="flex text-lg gap-x-4 ">
            {data?.author?.username ||"Anonymous"}
                    </b>
          </div>
          <span className="flex  text-gray-500 gap-x-2">
            <b className="text-green-700"> {data?.timeToRead} </b>
            <p> . {moment(data?.publishDate).format("D MMMM YY")}</p>
          </span>
        </div>
      </Link>
          <div className="flex gap-x-4 items-center">
          <div className="flex gap-x-2 items-center">
           <LikeMechanism data={data} />
                {data?.likes!=0&&
     <LikersViewer />
                }
          </div>
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
              {data?.comments?.length||0}
            </div>
            </CommentsFile>:
            <div className="flex items-center gap-x-2">
              <button  title="Comments are disabled">
                <MessageCircle
                size={20}
                
                className="text-[#6B6B6B] max-md:w-8  hover:text-black transition cursor-not-allowed"
                />
                </button>
          </div>
            }

            <SaveBtn _id={data?._id||""} size={24}/>
            <div className="" onClick={() => Webshare(data?.title||"",location.href,data?.subTitle||"")}>
              <LucideShare
                size={20}
                className="text-[#6B6B6B] max-md:w-8 hover:text-[var(--primary)] hover:text-black transition cursor-pointer"
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
