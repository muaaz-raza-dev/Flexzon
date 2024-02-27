import moment from "moment"
import { SmallLoader } from "@/Essentials/Loader";
import { useAppSelector } from "@/app/ReduxHooks";
import { LegacyRef, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NestedLengthCalculator from "../../Hooks/NestedLengthCalculator";
import TypingLoader from "@/Essentials/TypingLoader";
import useReadInvitedMessages from "./Hook/useReadInvitedMessage";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IeachInviteChat } from "@/app/Types/IInvitation";
import ChatComment from "./Comment/ChatComents.chat";
const InvitedMainChat = () => {
    let ref:LegacyRef<HTMLDivElement> = useRef(null)
    let chats = useAppSelector(state=>state.Invitation)
    let chatLength = NestedLengthCalculator(Object.values(chats.Chats))
    let {mutate}=useReadInvitedMessages()
    let Typing = useAppSelector(state=>state.chat.Typing)
    useEffect(() => {
        ref.current&& ref.current.scroll({top:ref.current.scrollHeight})
    }, [chats.Chats]);
  return (
    <div className=" w-full h-[96%] overflow-auto ChatBg relative" ref={ref}>
    <div className='w-full flex flex-col  px-4 py-4 gap-y-2 '>
    <InfiniteScroll
        className="overflow-hidden overflow-x-hidden ZeroScroll md:p-1 max-md:p-2 flex flex-col gap-y-2"
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
   {
              chats.Chats.map((data)=>{
                return <EachChatBlock data={data}/>
              })
            }
      
        </InfiniteScroll>
    </div>
        <div className=" left-3 bottom-0">
        {Typing&&<TypingLoader/>}
        </div>
    </div>
  )
}
const EachChatBlock =({data}:{data:IeachInviteChat})=>{
    return (
      <>
    <div className={`max-w-[80%] items-center flex gap-x-2 ${data.sent?"self-end bg-[var(--primary)]":"self-start bg-[var(--secondary)]"} w-max rounded-full text-white px-3 py-2 `}>
        <Avatar className="w-4 h-4 ">
          <TooltipProvider>
            <Tooltip>

<TooltipTrigger>
          <AvatarImage src={data.sender.avatar} />
</TooltipTrigger>
<TooltipContent>
  <p>by {data.sender.username}</p>
</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Avatar>
        <p className=" whitespace-nowrap">
{data.content}
        </p>
        <div className="text-xs whitespace-nowrap self-end">{moment(data.delivered).format("LT")}</div>
    </div>
    <div className={`flex flex-col w-full `}>
  <ChatComment data={data}/>
    </div>
    
    </>

    )
}
export default InvitedMainChat