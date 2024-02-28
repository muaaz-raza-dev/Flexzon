import { SmallLoader } from "@/Essentials/Loader";
import { useAppSelector } from "@/app/ReduxHooks";
import { IeachChat } from "@/app/Types/Ichat";
import moment from "moment";
import { useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useReadMessages from "../Hooks/Chat/useReadMessages";
import { useParams } from "react-router-dom";
import NestedLengthCalculator from "../Hooks/NestedLengthCalculator";
import { Lock } from "lucide-react";
import TypingLoader from "@/Essentials/TypingLoader";
import ChatComments from "./ChatComments.chat";

const Chats = () => {
    let ref = useRef<HTMLDivElement>(null)
    let {id}=useParams()
    let chats = useAppSelector(state=>state.chat)
    let chatLength = NestedLengthCalculator(Object.values(chats.Chats))
    let {mutate}=useReadMessages(id??"")
    let Typing = useAppSelector(state=>state.chat.Typing)
    useEffect(() => {
        ref.current&& ref.current.scroll({top:ref.current.scrollHeight})
    }, [chats.Chats]);
  return (
    <div className=" w-full h-[88%] overflow-auto ChatBg relative" ref={ref}>

    <div className='w-full flex flex-col  px-4 py-4 gap-y-2 '>
      <div className=" self-center bg-[var(--primary)] text-white text-xs  p-2 rounded-md flex gap-x-2 center">
        <Lock size={14}/>
        Messages and your data is end to end encrypted no one can read the conversation , Begin your chat with {chats.user.username} </div>
    <InfiniteScroll
        className="overflow-hidden overflow-x-hidden ZeroScroll md:p-1 max-md:p-2 flex flex-col gap-y-4"
        dataLength={[...Object.values(chats.Chats)].length}
        next={() => {
          if (chatLength!=0) {
            mutate()
          }
        }}
        inverse={true}
        hasMore={chatLength !== chats.totalChats}
        loader={<SmallLoader />}
      >
    {/* {
      Object.entries(chats.Chats).map((elm)=>{
        
        return (<>
            <div className="self-center p-2 bg-black rounded-md text-white">{elm[0]}</div> */}
            {
              chats.Chats.map((data)=>{
                return <EachChatBlock data={data}/>
              })
            }
            {/* </>)
        })
    } */}
        </InfiniteScroll>
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
