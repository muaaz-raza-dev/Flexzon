import LikeFn from '@/Queryfunctions/Posts/Like'
import { useAppDispatch, useAppSelector } from '@/app/ReduxHooks'
import { Heart } from 'lucide-react'
import { useMutation } from 'react-query'
import {FC} from 'react'
import { CreditsInsertion } from '@/app/Slices/CredentialSlice'
import { insertion } from '@/app/Slices/LandingSlice'
import { Iblog } from '@/app/Types/Ilanding'
import CreditsValidator from '@/app/middlewares/functions/CreditsValidator'
interface Ilikebtn{
    _id:string;
    size?:number
}
const LikeBtn:FC<Ilikebtn> = ({_id,size}) => {
  let dispatch=useAppDispatch()
    let Info =useAppSelector(state=>state.credits)
    let data =useAppSelector(state=>state.landing)
    const {mutate,isLoading}=useMutation({mutationFn:()=>LikeFn(_id,Info.Info._id) ,mutationKey:[_id,"Like"] , onSuccess(resp) {
      if (resp.type ==="like") {
        dispatch(CreditsInsertion({liked:[...Info.Info.liked,_id]}))
        dispatch(insertion({Blogs:data.Blogs.map((elm:Iblog)=>{
          if (elm._id ===_id) {
            return {...elm,likes:elm.likes+1}
          }
          else{return elm}
        })
      }))
    }
    else{
      dispatch(CreditsInsertion({liked:Info.Info.liked.filter((elm)=>elm!==_id)}))
      dispatch(insertion({Blogs:data.Blogs.map((elm:Iblog)=>{
        if (elm._id ===_id) {
          return {...elm,likes:elm.likes-1}
        }
        else{return elm}
      })
    }))
    }
    },})
    
  return (
    <button onClick={()=>CreditsValidator<typeof mutate,typeof dispatch>(Info,mutate,dispatch)} className='active:scale-110 transition-transform'> 
    <Heart size={size} fill={ isLoading?"#FF3040": Info.Info.liked.includes(_id)? "#FF3040":"transparent"}   className={`text-black   hover:text-[var(--primary)] p-0.5 cursor-pointer max-md:w-6`} />
    </button>
  )
}

export default LikeBtn
