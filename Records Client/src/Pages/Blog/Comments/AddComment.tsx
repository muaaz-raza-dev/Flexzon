import { LightLoader } from "@/Essentials/Loader"
import UploadComment from "@/Queryfunctions/Comment/UploadComment"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { CommentInsertion } from "@/app/Slices/CommentSlice"
import CreditsValidator from "@/app/middlewares/functions/CreditsValidator"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { useState } from "react"
import { useMutation } from "react-query"

const AddComment = () => {
  const [Comment, setComment] = useState<string>("");
  let  {data}= useAppSelector(state=>state.Blog)
  let  commentState= useAppSelector(state=>state.comment)
  let {mutate,isLoading} =useMutation({mutationKey:"Commenting",mutationFn:()=>UploadComment(Comment,data?._id||""),onSuccess(data,) {
    dispatch(CommentInsertion({Comment:[data.payload,...commentState.Comment]}))
  },},)
    let credits = useAppSelector(state=>state.credits)
    let dispatch = useAppDispatch()
  return (
    <div className="flex flex-col gap-y-2 justify-center p-2 shadow-lg mb-12 border-2">
        <div className="flex gap-x-2 items-center border-b py-2">
      <Avatar className="w-8 aspect-square rounded-full border border-black">
        <AvatarImage src={credits.Info.avatar} className="w-full aspect-square rounded-full"/>
      </Avatar>
      <h1>{credits.Info.username}</h1>
        </div>
    <Textarea placeholder="Write your thoughts on this upload" className="outline-none border-none focus:outline-none focus:border-none ring-0 focus-within:ring-0 focus-visible:ring-0" onChange={(e)=>setComment(e.target.value)} value={Comment}/>
    <Button className="primary text-white hover:bg-[var(--primary)]" onClick={()=>{
      CreditsValidator(credits,mutate,dispatch)
    }}>
      {isLoading?<LightLoader/>:  "Post response"}
    </Button>
    </div>
  )
}

export default AddComment
