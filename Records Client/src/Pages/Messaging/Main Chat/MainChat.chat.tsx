import ChatBar from "./ChatBar.chat"
import Chats from "./Chats.chat"
import Headerchat from "./Header.chat"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import useReadMessages from "../Hooks/Chat/useReadMessages"
import { SmallLoader } from "@/Essentials/Loader"
const MainChat = () => {
  let {id}=useParams()
  let {mutate,isLoading}=useReadMessages(id||"")
  useEffect(() => {
  id&&mutate()
  }, [id]);
  return (
    <div className=" w-full  h-full flex flex-col justify-between">
          <Headerchat/>
          {
            isLoading?<SmallLoader/>:<Chats/>
          }
      <ChatBar/>
    </div>
  )
}

export default MainChat
