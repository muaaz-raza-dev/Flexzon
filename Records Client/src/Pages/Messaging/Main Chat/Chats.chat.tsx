import { SmallLoader } from "@/Essentials/Loader";
import { useAppSelector } from "@/app/ReduxHooks";
import { IeachChat } from "@/app/Types/Ichat";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
//@ts-ignore
import InfiniteScrollReverse from "react-infinite-scroll-reverse";
import useReadMessages from "../Hooks/Chat/useReadMessages";
import { useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import TypingLoader from "@/Essentials/TypingLoader";
import ChatComments from "./ChatComments.chat";
import NestedLengthCalculator from "../Hooks/NestedLengthCalculator";

const Chats = () => {
    let ref = useRef<HTMLDivElement>(null)
    let {id}=useParams()
    const [LengthofMessages, setLengthofMessages] = useState<number>(0);
    let chats = useAppSelector(state=>state.chat)
    let {mutate}=useReadMessages(id??"")
    let Typing = useAppSelector(state=>state.chat.Typing)
    useEffect(() => {
        ref.current&& ref.current.scroll({top:ref.current.scrollHeight})
       setLengthofMessages(NestedLengthCalculator(chats.Chats))
    }, [chats.Chats]);
    console.log(chats.Chats.length);
    
  return (
    <div className=" w-full h-[88%] overflow-auto   ChatBg " id="MYchat" ref={ref}>
    <div className='w-full h-full flex flex-col  py-4 gap-y-2 '>
    <InfiniteScrollReverse
        className=" overflow-x-hidden    md:p-1 max-md:p-2 flex flex-col gap-y-4"
        loadArea={10}
          loadMore={() => {

            mutate()
          
        }}
        hasMore={LengthofMessages != chats.totalChats}
        loader={<SmallLoader />}
      >
        <div className="self-center bg-[var(--primary)] text-white text-xs  p-2 rounded-md flex gap-x-2 center">
          <Lock size={14}/>
          Messages and your data is end to end encrypted no one can read the conversation , Begin your chat with {chats.user.username} </div>
    {
      Object.entries(chats.Chats).map((elm)=>{
        
        return (<>
            <div className="self-center p-2 bg-black rounded-md text-white">{elm[0]}</div> 
            {
              
              elm[1].map((data)=>{
                return <EachChatBlock data={data}/>
              })
            }
    </>)
        })
    }
            </InfiniteScrollReverse>
    </div>
        <div className=" left-3 bottom-0">
        {Typing&&<TypingLoader/>}
        </div>
    </div>
  )
}
const EachChatBlock =({data}:{data:IeachChat})=>{
    return (
      <div className={`max-w-[80%]   w-max  ${data.sent?"self-end ":"self-start"} `}>
      <div className={`w-full flex gap-x-2 rounded-full text-white px-3 py-2 ${data.sent?" bg-[var(--primary)]":" bg-[var(--secondary)]"}`}>
        <p className=" whitespace-nowrap">
{data.content}
        </p>
        <div className="text-xs whitespace-nowrap self-end">{moment(data.delivered).format("LT")}</div>
      </div>
      {
        data.Commented&&
      <ChatComments data={data}/>
      }
    </div>
    )
}

export default Chats
