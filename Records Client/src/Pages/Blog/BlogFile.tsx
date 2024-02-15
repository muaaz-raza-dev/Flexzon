import { Separator } from "@/components/ui/separator"
import BlogHeader from "./BlogHeader"
import BlogFooter from "./footer/BlogFooter"
import MainBlog from "./main/MainBlog"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import FetchIndividualBlog from "@/Queryfunctions/Detail/FetchIndividualBlog"
import  { RecordsLoader } from "@/Essentials/Loader"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { BlogInsert } from "@/app/Slices/BlogSlice"
import ErrorPage from "@/Essentials/ErrorPage"

const BlogFile = () => {
  let Params = useParams()
  let dispatch =useAppDispatch()
  let AdminId=useAppSelector(state=>state.credits.Info._id)
  let {data,isLoading,isError}=useQuery({queryKey:Params.id,staleTime:1000*60*60*5,
  queryFn:()=>FetchIndividualBlog(Params?.id||"",AdminId) 
,onSuccess(data) {
  dispatch(BlogInsert({data:data?.payload.Post,Recommendations:data?.payload.Recommendations}))
},
refetchOnWindowFocus: false
} 
  )  
if (isLoading) {
  return <RecordsLoader/>
}
if (isError) {
  return <ErrorPage/>
}

  return (
  <div className="w-full flex flex-col items-center justify-center md:pt-16 max-md:pt-4">
    <div className="md:w-[80%] max-md:w-[95%] flex flex-col gap-y-3 my-8">
    <BlogHeader  />
    <MainBlog  />
    <Separator className="text-black my-4"/>
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
