import { Separator } from "@/components/ui/separator"
import TPHeader from "./TPHeader"
import TPMain from "./TPMain"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import SearchTopicFn, { SearchFn } from "@/Queryfunctions/Posts/SearchTopic"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { SearchedInsert } from "@/app/Slices/SearchedSlice"
import Loader from "@/Essentials/Loader"


const SearchedPageFile = () => {
  let searchParams=useParams()
let searchedState = useAppSelector(state=>state.searched)
let dispatch = useAppDispatch()
let {isLoading}=useQuery({queryKey:["Topic",searchParams?.topic||searchParams?.q,],staleTime:1000*60 ,queryFn:()=>{
  if (searchParams.topic) {
    dispatch(SearchedInsert({count:0}))
    return SearchTopicFn(searchParams?.topic||"",searchedState.count)
  }
  else{
    dispatch(SearchedInsert({count:0}))
    return SearchFn(decodeURI(searchParams?.q||""),searchedState.count)}
} ,
onSuccess(data) {
  if (searchParams.topic) {
    dispatch(SearchedInsert({Blogs:data?.payload,count:data.count,totalResults:data.totalResults,Topic:data.Topic,TopicSearch:true}))
  }
  else{
    dispatch(SearchedInsert({Blogs:data?.payload,count:data.count,totalResults:data.totalResults,TopicSearch:false,}))
  }
},
})
if (isLoading) {
  return(
    <div className='w-full h-screen center'>
 <Loader/>
   </div>) 
}
else{

  return (
    <div className="w-full h-full px-4 ">
     <TPHeader/>
     <Separator/>
     <TPMain/>
    </div>
  )
}
}

export default SearchedPageFile
