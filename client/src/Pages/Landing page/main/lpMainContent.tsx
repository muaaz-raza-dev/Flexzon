import { SmallLoader } from "@/Essentials/Loader";
import FetchBlogs from "@/Queryfunctions/Hooks/useFetchBlogs";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { Iblog } from "@/app/Types/Ilanding";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import LikeBtn from "./LikeBtn";
import SaveBtn from "./SaveBtn";
import RestrictionIcon from "./RestrictionIcon";
import PostBlockRenderer from "./FollowerRestrictionValidator";
import moment from "moment"
interface IblogProp {
  data: Iblog;
  Follower:boolean
}

export const PostBox: FC<IblogProp> = ({ data ,Follower}) => {

  return (
      <section className="flex flex-col border-b pb-6 justify-between md:w-full max-md:w-[95%] items-start rounded-lg gap-2 ">
        <Link to={`/user/${data?.author?._id ? data?.author?._id : ""}`}
          className="flex items-center    gap-x-2 h-full" >
          <Avatar className="z-20 w-7 h-7 bg-black object-contain aspect-square">
            <AvatarImage
              src={data?.author?.avatar || "/images/anonymous.png"}
              className="z-10 rounded-full h-full aspect-square object-cover"
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
            className="text-[1.1rem] text-black"
          >
            <p >
            {data?.author?.username || "Anonymous"}
            </p>
          </Link>
          <p className="text-gray-500 text-[1.1rem]">in</p>
          <Link
            to={`/topic/${data?.topic?._id? data?.topic?._id : ""}`}
            className="font-medium text-[1.1rem]"
          >
            <p > {data.topic.title} </p>

          </Link>
        </Link>

        <main className="flex w-full  max-md:items-center gap-x-4 flex-row md:h-[8rem] max-md:max-h-[8rem] ">
          <section className="flex  flex-col   max-md:w-[75%] h-full lg:min-w-[80%]  justify-between">
            <Link to={!data.FollowerOnly?`/blog/${data?._id}`:Follower?`/blog/${data?._id}`:`/user/${data?.author._id}`} className="cursor-pointer h-[60%] ">
              <h1 className="BFont font-black max-h-[90%] w-full overflow-clip  md:text-3xl max-md:text-xl">
                {data?.title}
              </h1>
              <p className="md:text-[1.2rem] max-md:text-[1rem] w-full break-words text-gray-600 text-ellipsis  overflow-hidden">
                {data.subTitle ? data?.subTitle?.slice(0, 70) :data.content.slice(0, 150)  }...
              </p>
            </Link>
            <section className="flex items-end h-[40%]  justify-between w-full gap-x-4">
              <div className="flex items-center gap-x-3">
                <p className=" px-2 py-0.5  rounded-md ">
                {moment(data.publishDate).format("D MMM Y")||"-"}
                </p>
                <p className=" text-green-700">{data.timeToRead}</p>
             
              </div>
              <section className="flex items-center gap-x-4">
                {data.FollowerOnly&&  <RestrictionIcon Info={data.FollowerOnly}/> }
                <SaveBtn _id={data._id} size={20}/>
                <div className="flex items-center gap-1 text-gray-600">
                <LikeBtn _id={data._id} size={20}/>
                <p> {data.likes} </p>
                </div>
              </section>
            </section>
          </section>

<Link to={!data.FollowerOnly?`/blog/${data?._id}`:Follower?`/blog/${data?._id}`:`/user/${data?.author._id}`} className=" 
 w-[20%] h-full">
          <div className=" w-full bg-[var(--primary)]  object-fit h-full  center rounded flex overflow-hidden  justify-start aspect-square items-start  ">
          <img
              src={data?.banner }
              alt=""
              className="object-fit aspect-w-4 aspect-h-3 rounded "
              loading="lazy"
              />
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
      <InfiniteScroll
        className="overflow-hidden overflow-x-hidden ZeroScroll justify-center items-center  flex flex-col gap-y-4"
        dataLength={Data.Blogs.length}
        next={() => {
          if (Data.Blogs.length !== 0) {
            FetchBlogs<typeof dispatch>(Data, dispatch, Credits);
          }
        }}
        hasMore={Data.Blogs.length !== Data.totalResults}
        loader={<SmallLoader />}
    
      >
        
        {
          Data.Blogs.map((elm) => <PostBlockRenderer key={elm._id} data={elm}/>)
        }
      </InfiniteScroll>
      
    </div>
  );
};
