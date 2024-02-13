import SaveFn from "@/Queryfunctions/Posts/Save"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { CreditsInsertion } from "@/app/Slices/CredentialSlice"
import CreditsValidator from "@/app/middlewares/functions/CreditsValidator"
import { Bookmark } from "lucide-react"
import { toast } from "react-hot-toast"
import { useMutation } from "react-query"

const SaveBtn = ({_id,size}:{_id:string,size?:number}) => {
    let dispatch=useAppDispatch()
    let {Info} =useAppSelector(state=>state.credits)
    let credits =useAppSelector(state=>state.credits)
    const {mutate,isLoading}=useMutation({mutationFn:()=>SaveFn(_id) ,mutationKey:[_id,"save"] , onSuccess(resp) {
      if (resp.type=="save") {
          toast.success(resp.msg)
        }
        dispatch(CreditsInsertion({saved:resp.payload}))
    },})
  
    
  return (

<Bookmark fill={isLoading?"black": Info.saved.length!==0? Info?.saved?.some(elm=>elm?._id===_id)?"black":"transparent":"transparent"} className={` ${!Info?.saved?.some(elm=>elm?._id===_id)?"text-[#6B6B6B]":"text-transparent"} max-md:w-8 hover:text-[var(--primary)] text-[#6B6B6B] p-0.5 ${isLoading&&"animate-pulse "}  cursor-pointer`} size={size} onClick={()=>{CreditsValidator<typeof mutate,typeof dispatch>(credits,mutate,dispatch)}} />
      

  )
}

export default SaveBtn
