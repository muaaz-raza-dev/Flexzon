import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const BlogSkeleton = () => {
return(<>

<Skeleton baseColor='#31304D' highlightColor='#161A30' height={45}/> 
<Skeleton baseColor='#31304D' highlightColor='#161A30' count={5} /> 
<div className="flex gap-x-4 ">
<Skeleton width={45} baseColor='#31304D' highlightColor='#161A30' borderRadius={100} height={45}/> 
<div className="">
<Skeleton width={45} height={14}/> 
<Skeleton width={95} height={14}/> 
</div>


</div>
<Skeleton baseColor='#31304D' highlightColor='#161A30' className='w-full h-[40vh]'/> 
<Skeleton baseColor='#31304D' highlightColor='#161A30' count={10} height={18} /> 
<Skeleton baseColor='#31304D' highlightColor='#161A30'  height={35} /> 
<div className="">
<div className="flex justify-between">
<Skeleton baseColor='#31304D' highlightColor='#161A30' width={450}  height={255} /> 
<Skeleton baseColor='#31304D' highlightColor='#161A30'  width={450}  height={255} /> 
</div>
<div className="flex justify-between">
<Skeleton baseColor='#31304D' highlightColor='#161A30'  width={450}  height={255} /> 
<Skeleton baseColor='#31304D' highlightColor='#161A30'  width={450}  height={255} /> 

</div>
</div>


</>)
}

export default BlogSkeleton
