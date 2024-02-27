import { useAppSelector } from "@/app/ReduxHooks";
import DetailsInvitedUser from "./DetailsInvitedUser.chat";
import { FC } from "react";
import { Users } from "lucide-react";

const InvitedAvatar:FC<{image:string}> = ({image}) => {
  return (
    <div className="relative inline-block mr-[-10px]">
      <img
        className="w-10 h-10 rounded-full border-2 border-white shadow-md"
        src={image}
        alt={"user"}
      />
    </div>
  );
};

const InvitedUsers: React.FC = () => {
  let {Invited} = useAppSelector(state=>state.chat)
  return (
    <div className="flex items-center">
      {Invited.length>2?
      <>
      <InvitedAvatar image={Invited[0].InvitedMember.avatar}/>
      <InvitedAvatar image={Invited[1].InvitedMember.avatar}/>
      <DetailsInvitedUser>
      <div className="relative inline-block ml-[-10px]">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white shadow-md">
          <span className="text-lg font-bold">{Invited.length-2}+</span>
        </div>
      </div>
      </DetailsInvitedUser>
      </>:
      <DetailsInvitedUser>
      <div className="cursor-pointer hover:bg-[var(--primary)] p-2 rounded-md">
      <Users size={18}/>
      </div>
      </DetailsInvitedUser>
      }
    </div>
  );
};

export default InvitedUsers;
