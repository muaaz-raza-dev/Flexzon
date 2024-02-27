import { useAppSelector } from "@/app/ReduxHooks";
import { IinvitedUserState } from "@/app/Types/Ichat";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC, ReactNode } from "react";
import OnlineCircle from "../../Sidebar/OnlineCircle.chat";
import { useEndInviteAdmin } from "./Hook/useEndInvite";

const DetailsInvitedUser: FC<{ children: ReactNode }> = ({ children }) => {
  let { Invited } = useAppSelector((state) => state.chat);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-max center bg-transparent ring-0 border-0 outline-0 focus-visible:ring-offset-0 focus-visible:ring-0 focus-within:ring-transparent active:ring-transparent focus-visible:shadow-none ring-offset-0 ring-transparent focus:ring-0">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[var(--primary)]  text-white flex flex-col ">
        {Invited.map((elm) => (
          <EachDetailsInvitedUser data={elm} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const EachDetailsInvitedUser: FC<{ data: IinvitedUserState }> = ({ data }) => {
  let { mutate } = useEndInviteAdmin();
  return (
    <DropdownMenuItem className="hover:text-white border-b cursor-pointer">
      <div className="w-full flex justify-between gap-x-6 items-center px-2">
        <div className="flex gap-x-2 center">
          <div className="relative">
            <Avatar className="w-8 h-8 border border-black">
              <AvatarImage src={data.InvitedMember.avatar} className="" />
            </Avatar>
            {data.InvitedMember.Active && <OnlineCircle />}
          </div>
          <div className="flex gap-x-2 center">
            <p>{data.InvitedMember.username}</p>
          </div>
        </div>
        <button
          onClick={() => mutate(data._id)}
          className="border border-red-600 px-2 py-1 rounded text-xs"
        >
          Remove
        </button>
      </div>
    </DropdownMenuItem>
  );
};

export default DetailsInvitedUser;
