import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useEffect, useState } from "react";
import useSendMessage from "../Hooks/Chat/useSendMessage";
import { LightLoader } from "@/Essentials/Loader";
import { useAppSelector } from "@/app/ReduxHooks";
// @ts-ignore
import { useDebouncedCallback } from 'use-debounce';


const ChatBar = () => {
  const [Input, setInput] = useState<string>("");
  let {mutate ,isLoading}=useSendMessage()
  let socket = useAppSelector(state=>state.messaging.socket)
  let chatId = useAppSelector(state=>state.chat.chatId)
  const debounced:any = useDebouncedCallback(
    // function
    ()=>{
        socket.emit("Typing",{Typing:false,chatId})
    },
    // delay in ms
    1500
  );
  useEffect(() => {
    debounced(Input)
  }, [Input]);

  let SendMessage = ()=>{
if (Input!=="") {
  mutate(Input.trim())
  setInput("")
}
  }
  return (
    <>
  
    <div className="  w-full px-3 py-4 bg-[var(--primary)]">
    <div className="w-full  bg-[var(--secondary)]   text-white items-center rounded-lg  flex justify-between ">
        <div className="w-full">
      <input onInputCapture={()=>socket.emit("Typing",{Typing:true,chatId})}   onKeyDown={(e)=>{e.key=="Enter"&&SendMessage()}} autoFocus value={Input} onChange={(e)=>setInput(e.target.value)} placeholder="Message..." className=" resize-none border-0 w-full whitespace-nowrap ring-transparent p-2 px-4 text-white focus-within:ring-0  outline-0 text-nowrap focus-visible:ring-0 bg-transparent" />
        </div>
      <Button disabled={Input.trim()==""} className="bg-transparent hover:text-[#ffffff] text-white" onClick={SendMessage}>
        {isLoading?
        <LightLoader/>:
        <Send size={18}/> 
      }
      </Button>
    </div>
    </div>
        </>
  )
}

export default ChatBar
