import { BlogPost } from "@/Pages/Profile/User's Posts/BlogPost"
import { Iblog } from "@/app/Types/Ilanding"


const BlogFooter = ({data}:Iblog|any) => {
 if (data.Recommendations.length!==0) {
   return (
     <div className="w-full flex flex-col items-center justify-center ">
 <h1 className="font-bold  text-xl mt-6 self-start "> More from {data?.Post.author?.username}</h1>
 <section className="flex justify-between flex-wrap w-full   gap-y-6  gap-2">
{
  data?.Recommendations.length!==0&&
     data?.Recommendations.map((elm:Iblog)=><BlogPost data={elm}/>)
    }
    </section>
    </div>
  )
}
}

export default BlogFooter
