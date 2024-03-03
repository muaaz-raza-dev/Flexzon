import { SmallLoader } from "@/Essentials/Loader";
import FetchBlogs from "@/Queryfunctions/Hooks/useFetchBlogs";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { Iblog } from "@/app/Types/Ilanding";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Dot,  } from "lucide-react";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import LikeBtn from "./LikeBtn";
import SaveBtn from "./SaveBtn";
import RestrictionIcon from "./RestrictionIcon";
import PostBlockRenderer from "./FollowerRestrictionValidator";
interface IblogProp {
  data: Iblog;
  Follower:boolean
}
import TopCreators from "./TopCreators";
import moment from "moment"

export const PostBox: FC<IblogProp> = ({ data ,Follower}) => {

  return (
  
      <section className="flex flex-col CardBoxShadow justify-between w-full py-2 md:px-4 rounded-lg  max-md:px-2 ">
        <Link
          to={`/user/${data?.author?._id ? data?.author?._id : ""}`}
          className="flex items-center   gap-x-0.5"
        >
          <Avatar className="z-20 h-full p-2 object-cover aspect-square">
            <AvatarImage
              src={data?.author?.avatar || "/images/anonymous.png"}
              className="z-10 rounded-full h-full aspect-square"
              loading="lazy"
            />
          </Avatar>
          
          <Link
            to={
              Follower?
              data?.author?._id?
                 `/user/${data?.author._id}`
                : `/blog/${data?._id}`:
                data?.author?._id?
                 `/user/${data?.author._id}`
                : `/blog/${data?._id}`
            }
          >
            {data?.author?.username || "Anonymous"}
          </Link>
          {/* <VerifiedBadge/> */}
          <Dot />
          <p>{moment(data.publishDate).fromNow()||"-"}</p>
        </Link>

        <main className="flex w-full  max-md:items-center gap-x-4 flex-row-reverse h-[8rem]  ">
          <section className="flex  flex-col px-2  max-md:w-[75%] h-full lg:min-w-[85%]  justify-between">
            <Link to={!data.FollowerOnly?`/blog/${data?._id}`:Follower?`/blog/${data?._id}`:`/user/${data?.author._id}`} className="cursor-pointer h-[80%]">
              <h1 className="BFont md:text-2xl max-md:text-xl">
                {data?.title}
              </h1>
              {data.subTitle? 
              <p className="md:text-[1rem] w-full max-md:hidden break-words max-md:text-[.7rem] text-gray-700 text-ellipsis  overflow-hidden">
                {data?.subTitle?.slice(0, 150)}...
              </p>
              :
                <p
                  className="md:text-[1rem] w-full max-md:hidden break-words max-md:text-[.7rem] text-gray-700 text-ellipsis  overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: data.content.slice(0, 150)
                  }}
                ></p>
               } 
            </Link>
            <section className="flex items-center justify-between w-full gap-x-4">
              <div className="flex items-center gap-x-2">
                <div className=" px-2 py-0.5  bg-gray-200 rounded-md text-sm">
                  {data.topic?.title}
                </div>
                <p className="text-sm text-gray-800">{data.timeToRead}</p>
             
              </div>
              <section className="flex items-center gap-x-4">
                {data.FollowerOnly&&
<RestrictionIcon Info={data.FollowerOnly}/>
                }
                <SaveBtn _id={data._id} />
                <LikeBtn _id={data._id} />
              </section>
            </section>
          </section>
<Link to={!data.FollowerOnly?`/blog/${data?._id}`:Follower?`/blog/${data?._id}`:`/user/${data?.author._id}`} className=" h-[8rem] object-contain  aspect-square ">
          <div className=" bg-[var(--primary)] object-contain  center rounded flex overflow-hidden  justify-start aspect-square h-full items-start  mx-2">
            {["mp3", "mp4"].includes(data?.banner.split(".")[3]) ? (
              <video className=" aspect-square rounded " src={data.banner} loop autoPlay muted 
             ></video>
            ) : (
              <img
                src={data?.banner || "/images/Records.png"}
                alt=""
                className="object-contain aspect-square rounded "
                loading="lazy"
              />
            )}
          </div>
          </Link>
        </main>
      </section>
    
  );
};



export const LpMainContent = () => {
  let Data = useAppSelector((state) => state.landing);
  let Credits = useAppSelector((state) => state.credits);
  let dispatch = useAppDispatch();
  return (
    <div className="flex flex-col w-full gap-y-1 ">
      <div className="max-md:hidden w-full">
      <TopCreators/>
      </div>
      <InfiniteScroll
        className="overflow-hidden overflow-x-hidden ZeroScroll md:p-1 max-md:p-2 flex flex-col gap-y-4"
        dataLength={Data.Blogs.length}
        next={() => {
          if (Data.Blogs.length !== 0) {
            FetchBlogs<typeof dispatch>(Data, dispatch, Credits);
          }
        }}
        hasMore={Data.Blogs.length !== Data.totalResults}
        loader={<SmallLoader />}
    
      >
        {Data.Blogs.length !== 0 ?
          Data.Blogs.map((elm) => <PostBlockRenderer key={elm._id} data={elm}/>)
          :<h1 className="font-bold">0 blogs found</h1>
          }
      </InfiniteScroll>
      
    </div>
  );
};
