import { Separator } from "@/components/ui/separator"
import BlogHeader from "./BlogHeader"
import BlogFooter from "./footer/BlogFooter"
import MainBlog from "./main/MainBlog"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import FetchIndividualBlog from "@/Queryfunctions/Detail/FetchIndividualBlog"
import Loader from "@/Essentials/Loader"
import { useAppDispatch } from "@/app/ReduxHooks"
import { BlogInsert } from "@/app/Slices/BlogSlice"

const BlogFile = () => {
  let Params = useParams()
  let dispatch =useAppDispatch()
  let {data,isLoading}=useQuery({queryKey:[Params.id,"Blog"],staleTime:1000*60*60*5,
  queryFn:()=>FetchIndividualBlog(Params?.id||"") 
,onSuccess(data) {
  dispatch(BlogInsert({data:data?.payload.Post,Recommendations:data?.payload.Recommendations}))
},
} 
  
  )  
if (isLoading) {
  return <Loader/>
}

  return (
  <div className="w-full flex flex-col items-center justify-center pt-16">
    <div className="md:w-[80%] max-md:w-[95%] flex flex-col gap-y-3 my-8">
    <BlogHeader data={data?.payload.Post} />
    <MainBlog  data={data?.payload.Post}/>
    <Separator />
    <BlogFooter data={data?.payload}/>
    <Link to={"/"} preventScrollReset>
    <Button variant={"default"} className="rounded-2xl active:scale-95 transition-transform bg-[var(--primary)] hover:bg-[var(--primary)] hover:text-white flex gap-x-2 lg:w-[30%] max-md:w-[50%]">
       <ArrowLeft/> See more recommendations
    </Button>
    </Link>
    </div>
  </div>)
}

export default BlogFile
