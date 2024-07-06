import {  MessageSquareDashed } from "lucide-react"
import MessagingSidebar from "../Sidebar/Sidebar.chat"

const LandingChatPage = () => {
  return (
    <>
    <div className="w-full md:hidden">
      <MessagingSidebar/>
    </div>
    <div  className="w-full center bg-[var(--secondary)] ChatBgL text-white h-[94vh] max-md:hidden">
      <div className="flex flex-col gap-y-2 items-center justify-center">
        <div className="rounded-full p-4 aspect-square border-2 border-white center">
            <MessageSquareDashed  size={64}/>
        </div>
        <h1 className="hFont text-2xl">Your Messages</h1>
        <p className="text-gray-400">Chat with friends and followers</p>

      </div>
    </div>
    </>
  )
}

export default LandingChatPage
