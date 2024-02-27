import { useAppSelector } from "@/app/ReduxHooks"

import { Link } from "react-router-dom"
import ChatAddBtn from "./AddBtn.chat"

const HeaderChatSidebar = () => {
    let username = useAppSelector(state=>state.credits.Info.username)
  return (
    <header className="flex items-center border-b    p-2 justify-between w-full">
    <Link to={"/profile/settings"} className="hFont text-2xl px-4">
    {username}
    </Link>
   <ChatAddBtn/>
    </header>
  )
}

export default HeaderChatSidebar
