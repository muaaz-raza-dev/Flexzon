import { useAppDispatch } from "@/app/ReduxHooks";
import { InvitationStateInsertion } from "@/app/Slices/InvitationSlice";
import { Iinvites } from "@/app/Types/Imessaging";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { Link, useParams } from "react-router-dom";

export function InvitesChatComp({ data }: { data: Iinvites; }) {
  let id = useParams();
  let dispatch =useAppDispatch()
  return (
    <Link to={`/messaging/invite/${data._id}`} onClick={()=>{
      dispatch(InvitationStateInsertion({count:0,InvitationId:data._id,Invitation:data}))
    }} className={`flex py-4 border transition-colors rounded hover:text-white w-full px-4 items-center gap-x-4 hover:bg-[var(--secondary)] ${data._id == id["*"]?.split("/")[1] ? "bg-[var(--secondary)] text-white" : ""} cursor-pointer`}
    >
<div className="flex">
      <Avatar className="h-8 w-8 -mr-3  border border-black aspect-square object-contain">
        <AvatarImage src={data?.ChatId.Chatters[0].avatar} className="" />
      </Avatar>
      <Avatar className="h-8 w-8 aspect-square border border-black object-contain">
        <AvatarImage src={data?.ChatId.Chatters[1].avatar} className="" />
      </Avatar>
</div>
      <div className="w-full">
        <div className="hFont flex items-center gap-x-4 text-xl">
          <h1>
            {data.ChatId.Chatters[0]?.username} & {data.ChatId.Chatters[1]?.username}
          </h1>


        </div>
        <div className=" w-full text-xs text-nowrap flex justify-between gap-x-2  text-ellipsis ">
          <div className="flex justify-between items-center w-[90%] ">
            You are invited to this chat by {data.InvitedBy.username}
          </div>
          <p>{moment(data.InvitedAt).format("LT")}</p>
        </div>
      </div>
    </Link>
  );
}
