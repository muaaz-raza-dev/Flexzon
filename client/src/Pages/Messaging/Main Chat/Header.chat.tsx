import { useAppSelector } from "@/app/ReduxHooks";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import ChatOptions from "./ChatOptions.chat";
import InvitedUsers from "./Invite/Invited.chat";
import moment from "moment";
import OnlineCircle from "../Sidebar/OnlineCircle.chat";
const Headerchat = () => {
 let { user, Invited } = useAppSelector((state) => state.chat);
   return (
    <div className=" sticky bg-[var(--secondary)] text-white  px-4 w-full border-b flex justify-between items-center py-2">
      <div className="center w-max gap-x-2 cursor-pointer">
        <div className="relative">

        <Avatar className="w-12 h-12 aspect-sqaure object-contain ">
          <AvatarImage src={user.avatar} className="w-full h-full" />
        </Avatar>
            {user.Active && (
              <OnlineCircle/>
              )}
              </div>
        <div className="">
          <div className="hFont text-xl flex items-center gap-x-2 relative">
            <h1>{user.username}</h1>
          </div>
          <p
            className={`${
              user.Active ? "text-green-500" : "text-gray-200"
            }  text-xs `}
          >
            
            {user.Active ? "Active" :user.LastLogin?`Last seen at ${moment(user.LastLogin).calendar()}`:"Offline"}
          </p>
        </div>
      </div>
      <div className=" flex gap-x-4 items-center">
{Invited.length!=0&&
      <InvitedUsers/>
}
   <ChatOptions/>
      </div>
    </div>
  );
};

export default Headerchat;
