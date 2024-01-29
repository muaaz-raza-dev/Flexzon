import { BlogPost } from "@/Pages/Profile/User's Posts/BlogPost"
import { Iblog } from "@/app/Types/Ilanding"


const BlogFooter = ({data}:Iblog|any) => {
 if (data.Recommendations.length!==0) {
  
   return (
     <div className="w-full my-8 flex flex-col items-center justify-center gap-y-4">
 <h1 className="hFont text-2xl self-start "> More from {data?.Post.author?.username}</h1>
 <section className="flex flex-wrap w-full items-center md:justify-around gap-y-6 max-md:justify-center gap-2">
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
