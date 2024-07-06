import { IeachChat } from "@/app/Types/Ichat"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { FC } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { IChatComment } from "@/app/Types/IInvitation"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import moment from "moment"
  
  
const ChatComments:FC<{data:IeachChat}> = ({data}) => {
  return (
<DropdownMenu >
  <DropdownMenuTrigger className="ring-0 focus:ring-offset-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
  <div className="flex mx-2">
    <Avatar className="-mr-5 border border-rose-300 cursor-pointer w-5 h-5">
      <AvatarImage src={data.Comments[0]?.UserId?.avatar}/>
    </Avatar>
    <Avatar className="border border-rose-300 cursor-pointer w-5 h-5">
      <AvatarImage src={data.Comments[1]?.UserId?.avatar}/>
    </Avatar>
  </div>  
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Comments</DropdownMenuLabel>
    <DropdownMenuSeparator />
{data.Comments.map(elm=><EachChatComment data={elm}/>)}
  </DropdownMenuContent>
</DropdownMenu>

  
  )
}


let EachChatComment:FC<{data:IChatComment}> =({data})=>{
    return <HoverCard>
  <HoverCardTrigger>
            <DropdownMenuItem className="flex gap-x-4">
    <p>{data.Comment.split(" ").slice(0,3).join(" ")}...</p>
    <Avatar className="w-3 h-3">
        <AvatarImage
        src={data.UserId.avatar}
             />
    </Avatar>
    </DropdownMenuItem>

  </HoverCardTrigger>
  <HoverCardContent className="flex gap-x-3 max-w-[80vw] w-max">
    <div className="flex center border-r px-2 flex-col gap-x-2">

  <Avatar className="w-4 h-4">
        <AvatarImage
        src={data.UserId.avatar}
        />
    </Avatar>
    <p className="text-xs">{data.UserId.username}</p>
        </div>
        <div className="flex flex-col  w-full">
            <h2 className=" text-base">{data.Comment}</h2>
            <p className="self-end justify-self-end text-[0.5rem]">{moment(data.CreatedAt).calendar()}</p>
        </div>
  </HoverCardContent>
</HoverCard>

}

export default ChatComments
