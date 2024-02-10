import { Iblog } from '@/app/Types/Ilanding'
import LikeBtn from '../Landing page/main/LikeBtn'
import {useState} from "react"
import { useAppSelector } from '@/app/ReduxHooks';
const LikeMechanism = ({data}:Iblog|any) => {
    const [LikeCount, setLikeCount] = useState<number>(data?.likes);
let {Info}=useAppSelector(state=>state.credits)
  return (
    <div className="flex gap-x-1 text-[#6B6B6B] hover:text-black transition text-sm items-center">
        <div className='center' onClick={()=>{Info.liked.includes(data._id) ? setLikeCount(LikeCount-1):setLikeCount(LikeCount+1)}}>
<LikeBtn _id={data?._id} size={20}/>
        </div>
        {data.likesCount&&
    <p>
      {LikeCount}
    </p>
        }
        {/* <Heart size={20} fill={Info.Info.liked.includes(data?._id)? "#FF3040":"transparent"}   className={`${"text-black"}  hover:text-[var(--primary)] p-0.5 cursor-pointer `} /> */}
  </div>
  )
}

export default LikeMechanism
