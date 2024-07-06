import HeaderTabSidebar from "./HeaderTabSidebar.chat"
import UsersChatSidebar from "./UsersSidebar.chat"
import HeaderChatSidebar from "./headerSidebar.chat"
const MessagingSidebar = () => {
 
  return (
    <div className=" text-black  h-full  overflow-scroll flex flex-col">
<HeaderChatSidebar/>   
<HeaderTabSidebar/> 
<UsersChatSidebar/> 
    </div>
  )
}

export default MessagingSidebar
