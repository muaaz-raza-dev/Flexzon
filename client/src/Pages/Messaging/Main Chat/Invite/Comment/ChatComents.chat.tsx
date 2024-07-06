import { IeachInviteChat } from "@/app/Types/IInvitation";
import { Plus, Reply } from "lucide-react";
import { useState } from "react";
import AddCommentInput from "./AddCommentInput.chat";
function ChatComment({ data }: { data: IeachInviteChat }) {
  const [InputToggle, setInputToggle] = useState(false);
  return (
    <>
      {!data.Commented && 
        !InputToggle && 
          <button className={` p-1 w-max  rounded-full cursor-pointer text-[var(--primary)] bg-[white] ${data.sent?"self-end ":"self-start"}  `}>
            <Plus size={16} onClick={() => setInputToggle(!InputToggle)} />
          </button>
        
        }
        {
          InputToggle&&
        <div className={`flex  w-[70%] px-4 pr-5 gap-x-2 rounded-full  bg-white text-black ${data.sent?"self-end ":"self-start"} `}>
          <AddCommentInput setInputToggle={setInputToggle} data={data}/>
          </div>
        }
{        
        !InputToggle&& data.Commented &&
        <div
          className={`flex max-w-full   items-center gap-x-1   rounded-md pl-2  mx-4 ${
            !data.sent ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <Reply size={16} className="w-[5%] bg-[var(--bg)] rounded-lg " />
          <button onClick={()=>setInputToggle(true)} className=" px-4  break-words whitespace-pre text-wrap cursor-pointer rounded-md bg-[var(--primary)] text-white">
            {data.Comments.Comment}
          </button>
        </div>
      }
    </>
  );
}

export default ChatComment;
