
import { SmallLoader } from "@/Essentials/Loader";
import { useAppSelector } from "@/app/ReduxHooks";
import moment from "moment";
import { useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import useReadMessages from "../../Hooks/Chat/useReadMessages";
import { IeachInviteChat } from "@/app/Types/IInvitation";


const InvitedChats = () => {
    let ref = useRef<any>()
    let {id}=useParams()
    let chats = useAppSelector(state=>state.Invitation)
    let chatLength = chats.Chats.length
    let {mutate}=useReadMessages(id??"")
    useEffect(() => {
        ref.current&& ref.current.scroll({top:ref.current.scrollHeight})
    }, [chats.Chats]);
  return (
    <div className=" w-full h-[88%] overflow-auto ChatBg" ref={ref}>

    <div className='w-full flex flex-col  px-4 py-4 gap-y-2 '>
     
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
    </div>
  )
}
const EachChatBlock =({data}:{data:IeachInviteChat})=>{
    return (
      
    <div className={`max-w-[80%] flex gap-x-2 ${data.sent?"self-end bg-[var(--primary)]":"self-start bg-[var(--secondary)]"} w-max rounded-full text-white px-3 py-2 `}>
        <p className=" whitespace-nowrap">
{data.content}
        </p>
        <div className="text-xs whitespace-nowrap self-end">{moment(data.delivered).format("LT")}</div>
    </div>
      
    )
}



export default InvitedChats
