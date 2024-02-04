import Loader from "@/Essentials/Loader"
import DeleteFn from "@/Queryfunctions/Posts/DeletePost"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { CreditsInsertion } from "@/app/Slices/CredentialSlice"
import { insertion } from "@/app/Slices/LandingSlice"
import { userDetailsInsertion } from "@/app/Slices/UserDetailsSilce"
import {  Trash2 } from "lucide-react"
import { toast } from "react-hot-toast"
import { useMutation } from "react-query"

const DeletePost:React.FC<{id:string}> = ({id}) => {
    let dispatch=useAppDispatch()
    let landing =useAppSelector(state=>state.landing)
    let {isLoading,mutate}=useMutation({mutationKey:"Delete",mutationFn:()=>DeleteFn(id) ,
    onSuccess(response){
        toast.success("Post deleted sucessfully!")
        dispatch(CreditsInsertion({Posts:response.payload}))
        dispatch(userDetailsInsertion({Posts:response.payload}))
        dispatch(insertion({Blogs:landing.Blogs.filter(elm=>elm._id!==id)}))
    }}, )

  return (
    <button  className="flex gap-x-2 items-center text-red-500 text-xs" onClick={()=>mutate()}>
    <Trash2 size={16}/>
    {
        isLoading?
        <Loader/>:
    "Delete"
    }
  </button>
  )
}

export default DeletePost
