import { Route, Routes } from "react-router-dom"
import MessagingSidebar from "./Sidebar/Sidebar.chat"
import MainChat from "./Main Chat/MainChat.chat"
import LandingChatPage from "./Main Chat/LandingPage.chat"
import useGetAllChats from "./Sidebar/useGetAllChats"
import InviteChatFile from "./Main Chat/Invite/InviteChatFile.chat"
import { useAppSelector } from "@/app/ReduxHooks"

const MessagingFile = () => {
  let {isLogined} =useAppSelector(s=>s.credits)
  if(isLogined===true){
  useGetAllChats()
}
 
  return (
<main className="w-screen md:h-[94vh] max-md:h-[92vh] flex ">
<div className="lg:w-[30%] max-lg:w-[40%]  h-full max-md:hidden">
  <MessagingSidebar/>
</div>
<div className="lg:w-[70%] max-lg:w-[60%] h-full max-md:w-full">
<Routes>
  <Route path="/" element={<LandingChatPage/>}/>
  <Route path="/:id" element={<MainChat/>}/>
  <Route path="/invite/:id" element={<InviteChatFile/>}/>
  <Route path="/invite/" element={<LandingChatPage/>}/>
</Routes>
</div>
</main>
  )
}

export default MessagingFile
