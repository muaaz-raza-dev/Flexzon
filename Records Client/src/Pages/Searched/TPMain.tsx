import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { PostBox } from "../Landing page/main/lpMainContent"
import InfiniteScroll from "react-infinite-scroll-component"
import { SmallLoader } from "@/Essentials/Loader"
import SearchTopicFn, { SearchFn } from "@/Queryfunctions/Posts/SearchTopic"
import { useParams } from "react-router-dom"
import { SearchedInsert } from "@/app/Slices/SearchedSlice"

const TPMain = () => {
    let searchedState = useAppSelector(state=>state.searched)
    let searchParams=useParams()
    let dispatch = useAppDispatch()
    let FetchBlogs=()=>{
      
        if (searchParams.topic) {
          SearchTopicFn(searchParams?.topic||"",searchedState.count)
          SearchTopicFn(searchParams?.topic||"",searchedState.count).then(data=>{
            dispatch(SearchedInsert({Blogs:data?.payload,count:searchedState.count+1,totalResults:data.totalResults,Topic:data.Topic,TopicSearch:true}))
          })
        }
        else{
          SearchFn(searchParams?.q||"",searchedState.count).then(data=>{
            dispatch(SearchedInsert({Blogs:data?.payload,count:searchedState.count+1,totalResults:data.totalResults,TopicSearch:false}))
          })
        }
      }
      let credits = useAppSelector(state=>state.credits)
  return (
    <div className="flex flex-col items-center w-full gap-y-4 py-4 ">
        <h1 className="hFont text-2xl">{searchedState.TopicSearch?"Top Stories":"Search Results"}</h1>    
        <div className="lg:w-[80%] max-lg:w-[85%] max-md:w-[90%] flex flex-col gap-y-2">
          {
            searchedState.Blogs.length!==0?
            <InfiniteScroll
            className="overflow- overflow-x-hidden"
            dataLength={searchedState.Blogs.length}
            next={()=>{if (searchedState.Blogs.length!==0) {
              
              FetchBlogs()
            }
            }
          }
            hasMore={searchedState.Blogs.length!==searchedState.totalResults}
            loader={ 
              <SmallLoader/>
              
            }
            endMessage={<h1 className="text-md font-bold py-6 text-center">You all caught up! Thanks for scrolling through Records; stay tuned for more, as your curiosity is our fuel!
            </h1>}
          >
            {
              searchedState.Blogs.map(elm=><PostBox data={elm} Follower={elm.FollowerOnly&&(credits.isLogined&& credits.Info.following.some(Elm=>Elm._id==elm._id) )}/>)
            }
           {/* {  searchedState.Blogs.map(elm=><PostBox 
           Follower={elm.FollowerOnly&&(credits.isLogined&& credits.Info.following.some(Elm=>Elm._id==elm._id) }  data={elm} />) }  */}
           
        </InfiniteScroll>:
        <h1>No results</h1>
           }
            </div>  
            </div>
            )
}

export default TPMain
