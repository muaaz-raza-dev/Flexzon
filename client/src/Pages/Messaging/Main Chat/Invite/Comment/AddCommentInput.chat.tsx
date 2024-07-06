import { FC,    useState } from "react"
import useCreateChatComment from "../Hook/useCreateChatComment"
import { Send } from "lucide-react"
import { IeachInviteChat } from "@/app/Types/IInvitation"
import { SmallLoader } from "@/Essentials/Loader"

const AddCommentInput:FC<{setInputToggle:any,data:IeachInviteChat}> = ({setInputToggle,data}) => {
  let {mutate,isLoading}=useCreateChatComment(data.Comments._id,setInputToggle)
  const [Input, setInput] = useState(data?.Comments?.Comment||"");
  return (
    <>
    <input
    className=" w-full bg-transparent outline-none border-none p-2"
    autoFocus
    value={Input}
    onChange={(e)=>setInput(e.target.value)}
    onKeyDown={(e)=>{
      if(e.key=="Enter"&&Input!==""){
        mutate({ChatId:data.chatId,MessageId:data._id,Comment:Input})
      }
    }}
    onBlur={() => setInputToggle(false)}
    />
  <button className="" onClick={()=>{
    if(Input!==""){
      mutate({ChatId:data.chatId,MessageId:data._id,Comment:Input})
      
   }
  }}>
    {isLoading?
     < SmallLoader/>:
  <Send size={14} />
    }
</button>
    </>
  )
}

export default AddCommentInput
