import { useAppSelector } from "@/app/ReduxHooks"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ExitChatInvitebyuser from "./ExitChatInvitebyuser.chat"

const HeaderInvitedChat = () => {
    let {Invitation} = useAppSelector(state=>state.Invitation)
  return (
    <div className=" sticky bg-[var(--secondary)] text-white  px-4 w-full border-b flex justify-between items-center py-2">
    <div className="center w-max gap-x-2 cursor-pointer">
    <div className="flex">
      <Avatar className="h-12 w-12 -mr-3  border border-black aspect-square object-contain">
        <AvatarImage src={Invitation?.ChatId.Chatters[0]?.avatar} className="" />
      </Avatar>
      <Avatar className="h-12 w-12 aspect-square border border-black object-contain">
        <AvatarImage src={Invitation?.ChatId.Chatters[1]?.avatar} className="" />
      </Avatar>
</div>
      <div className="">
        <div className="hFont text-xl flex items-center gap-x-2">
          <h1>{Invitation?.ChatId.Chatters[0]?.username} & {Invitation.ChatId.Chatters[1]?.username} </h1> Chat
        </div>
      </div>
    </div>
    <div className=" gap-x-4 items-center cursor-pointer text-red-500 flex flex-col">
        <TooltipProvider>

      <Tooltip>
        <TooltipTrigger>
<ExitChatInvitebyuser/>
        </TooltipTrigger>
        <TooltipContent>
          <p>Exit chat room</p>
        </TooltipContent>
      </Tooltip>
        </TooltipProvider>

    </div>
  </div>
  )
}

export default HeaderInvitedChat
