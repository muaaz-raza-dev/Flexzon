import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandItem } from "@/components/ui/command";
import { MessageSquarePlus, Plus } from "lucide-react";
import FIndusersToChat from "./FIndusersToChat.chat";
import useFindUsers from "../Hooks/useFindUsers.chat";
import  {  LightLoader, SmallLoader } from "@/Essentials/Loader";
import useInitializeChat from "../Hooks/useInitialize.chat";
import { MessagingInsertion } from "@/app/Slices/Messaging/MessagingSlice";
import useSentInvite from "../Hooks/Invites/useSentInvite";

const ChatAddBtn = () => {
  let Searched = useAppSelector((state) => state.messaging.Searched);
let {isLoading,mutate,status}=useFindUsers()
let {Open,purpose} = useAppSelector(state=>state.messaging.SearchDialog)
let dispatch=useAppDispatch()
  return (
    <div>
      <Button
        onClick={() => dispatch(MessagingInsertion({SearchDialog:{Open:true,purpose:"search"}}))}
        className="hover:bg-[var(--primary)] hover:text-white text-black"
      >
        <MessageSquarePlus />
      </Button>
      <CommandDialog open={Open} onOpenChange={(e)=>dispatch(MessagingInsertion({SearchDialog:{Open:e,purpose:"search"}}))}>
        <div className=" w-full">
          <FIndusersToChat mutate={mutate}/>
        </div>

        <div className="flex gap-1 max-h-[55vh] overflow-scroll h-min py-2 flex-col">
        
          {
            status=="idle"?
            <div className="px-2 center flex-col text-xs w-full object-fill "> 
            <img src="/images/chat.png" className=""/>
            <b> {purpose=="search"?"Find":"Invite"} Friends to chat</b>
            </div>
            :
          isLoading?
          <CommandItem>
          <SmallLoader/>
            </CommandItem>
          :
         Searched.length!=0? Searched.map((elm) => {
            return <IndividualUser data={elm} />;
          }) : status=="success"&& <CommandItem>
            <p className="px-2 text-xs"> No one exists try with different names </p>
            </CommandItem>
          
        }
          </div>
      </CommandDialog>
    </div>
  );
};

function IndividualUser({
  data
}: {
  data: { username: string; _id: string; avatar: string };

}) {
let {purpose} = useAppSelector(state=>state.messaging.SearchDialog)
  let {mutate,isLoading}=useInitializeChat()
  let ChatInvitation = useSentInvite()
  let chatId=useAppSelector(state=>state.chat.chatId)
  return (
    <CommandItem>
      <main className="flex justify-between items-center  w-full">
        <div className=" flex gap-x-2 center">
          <Avatar>
            <AvatarImage src={data.avatar} />
          </Avatar>
          <h1 className="hFont">{data.username}</h1>
        </div>
        <Button onClick={()=>{
          if (purpose=="search") {
            mutate(data._id)
          }
          else{
            ChatInvitation.mutate({chatId,InvitedMember:data._id})
          }
        }}
         className="flex gap-x-2 p-2 hover:bg-[var(--primary)] bg-[var(--primary)]">
          {
            isLoading?
            <LightLoader/>:
            <>
            {purpose=="search"?
          "Chat":"Invite"
            }
           <Plus />
            </>
          }
        </Button>
      </main>
    </CommandItem>
  );
}
export default ChatAddBtn;
