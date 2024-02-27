import {
    DropdownMenu,
    DropdownMenuContent,
  
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import ClearChat from "./ChatOptions/ClearChat.chat"
import InviteUsers from "./ChatOptions/InviteUsers"

const ChatOptions = () => {
  return (
    <DropdownMenu>
  <DropdownMenuTrigger className="w-max center bg-transparent ring-0 border-0 outline-0 focus-visible:ring-offset-0 focus-visible:ring-0 focus-within:ring-transparent active:ring-transparent focus-visible:shadow-none ring-offset-0 ring-transparent focus:ring-0">
          <div className="hover:text-white  cursor-pointer">
        <DotsVerticalIcon  />{" "}
      </div>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="bg-[var(--bg)] p-1 text-black flex flex-col ">
<ClearChat/>
<InviteUsers/>
  </DropdownMenuContent>
</DropdownMenu>


   
    
  )
}

export default ChatOptions
