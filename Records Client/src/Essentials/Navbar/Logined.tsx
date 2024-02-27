import {
  PenBox,
  Search,
  Settings,
  UserCircle2,
  PenBoxIcon,
  BookText,
  Bell,
  MessageSquareIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  CommandDialog,
  CommandInput,
  CommandSeparator,

} from "@/components/ui/command";
import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { SearchInsert } from "@/app/Slices/SearchSlice";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
// @ts-ignore
import { useDebouncedCallback } from "use-debounce";
import { SearchQuery } from "@/Queryfunctions/Landing/SearchQuery";
import { SearchedInsert } from "@/app/Slices/SearchedSlice";
const LoginedOptions = () => {
  let info=useAppSelector(state=>state.credits)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="h-full overflow-hidden  focus-visible:ring-0 object-center md:py-1 max-md:py-3 focus-within:ring-0 outline-0 active:ring-0 ring-0">
          <img src={info.Info.avatar? info?.Info?.avatar:"/images/muaaz.png"} className="aspect-square rounded-full h-[90%] border border-[var(--primary)]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-2 z-[600]">
        <Link to={"/messaging"} className=" transition-colors cursor-pointer font-normal flex items-center gap-x-1 ">
            <DropdownMenuItem  className="flex cursor-pointer  gap-x-2 items-center">
          <MessageSquareIcon size={16} /> Messaging 
          </DropdownMenuItem>
        </Link>
            <Link to={`/user/${info.Info._id}`}
               className="cursor-pointer w-full"
             >
          <DropdownMenuItem 
               className="cursor-pointer flex gap-x-2 items-center"
          >
              <UserCircle2 size={16} />
              Profile
          </DropdownMenuItem>
            </Link>
            <Link
              to={"/profile/settings"}
              className="cursor-pointer w-full" >
          <DropdownMenuItem className="flex cursor-pointer  gap-x-2 items-center">
              <Settings size={16} /> Settings
          </DropdownMenuItem>
            </Link>
          <Link to={"/write"} className="cursor-pointer w-full">
            <DropdownMenuItem  className="flex cursor-pointer  gap-x-2 items-center">
              <PenBoxIcon size={16} /> Write
            </DropdownMenuItem>
            
          </Link>
         
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const Logined = () => {
  let {notifications}=useAppSelector(state=>state.notifications)
  let {newMessages}=useAppSelector(state=>state.messaging)
  let route  = useLocation().pathname
  return (
    <>
      <ul className="list-none flex gap-x-2  items-center">
      <Link to={"/notifications"} className={`relative text-gray-600 p-2 rounded hover:text-[var(--primary)] transition-colors cursor-pointer font-normal flex items-center center gap-x-1 max-sm:hidden  ${route.split("/")[1]=="notifications"&&"bg-[var(--secondary)] text-white hover:text-white"}`}>
        {notifications.filter(elm=>elm.read==false).length!==0&&
          <p className="absolute top-0  -right-1 bg-[var(--secondary)] rounded-full w-4 center aspect-square  text-xs text-white ">{notifications.filter(elm=>elm.read==false).length}</p>
        }
          <Bell size={20} />
        </Link>
        <Link to={"/messaging"} className={`relative text-gray-600 hover:text-[var(--secondary)] p-2 rounded transition-colors cursor-pointer font-normal flex items-center gap-x-1 max-sm:hidden ${route.split("/")[1]=="messaging"&&"bg-[var(--secondary)] text-white hover:text-white"}`}>
        {route.split("/")[1]!=="messaging"&&newMessages!==0&&
          <p className="absolute top-0  -right-1 bg-[var(--secondary)] rounded-full w-4 center aspect-square  text-xs text-white ">{newMessages}</p>
        }
          <MessageSquareIcon size={20} />
        </Link>
        
        <Link to={"/write"} className={`text-gray-600 hover:text-[var(--secondary)] transition-colors cursor-pointer font-normal flex items-center gap-x-1 p-2 rounded  ${route.split("/")[1]=="write"&&"bg-[var(--secondary)] text-white hover:text-white"}`}>
          <PenBox size={20} />{" "}
        </Link>
       
      </ul>
      <LoginedOptions />
    </>
  );
};

export const LoginedSearchbar = () => {
  let dispatch=useAppDispatch()
  let data=useAppSelector(state=>state.search)
  const [open, setOpen] = useState(false);
  let Trendings= useAppSelector(state=>state.landing.Topics)
  const debouced = useDebouncedCallback((output:any)=>{
    SearchQuery(output).then(data=>{
      dispatch(SearchInsert({topics:data.payload.topics,users:data.payload.users}))
    })
    },800)
    useEffect(() => {
      if (data.input!=="") {
        debouced(data.input)
    }

    }, [data.input]);
    let navigate =useNavigate()
    let Searcher = (e:KeyboardEvent<HTMLInputElement>)=>{
if (e.key =="Enter") {
  dispatch(SearchedInsert({TopicSearch:false}))
  navigate (`/search/${data.input}`)
  setOpen(false)
}
    }
  return (
    <>
      <div
        className="lg:w-[45%] max-lg:w-[30%]  max-md:w-[20%] flex rounded-md h-full items-center gap-x-2 text-sm cursor-pointer lg:mx-2 max-lg:ml-1 lg:bg-[#eceaea] lg:p-2"
        onClick={() => setOpen(!open)}
      >
        <Search className="max-md:text-gray-600" />
        <p className="text-gray-800 max-lg:hidden">{data.input||"Search"}</p>
      </div>
      <CommandDialog open={open}   onOpenChange={setOpen}>
        <div className="flex justify-between px-2 w-full">

        <CommandInput placeholder="Type a topic or author's name..." className="w-full" value={data.input}  onValueChange={(e)=>dispatch(SearchInsert({input:e})) } 
        onKeyDown={(e)=>Searcher(e)} >
          </CommandInput>
          <Link to={`/search/${data.input}`} onClick={()=>setOpen(false)}  className={`my-3 mr-8 p-1  cursor-pointer aspect-square transition-colors hover:bg-gray-300 rounded-full `} >
  <Search size={18} onClick={()=>dispatch(SearchedInsert({TopicSearch:false}))}/>
    </Link>
        </div>
{
        data.input.length!==0?
        <div className="px-4 py-2">
      <b className="text-[grey]">Topics</b>
      <div className="flex gap-3 py-2 flex-col">

{data.topics.length!==0?
  data.topics.map(elm=>{
    return <Link to={`/topic/${elm._id}`} onClick={()=>setOpen(false)}>
    <Topic topic={elm.title} />
    </Link>
  }):
  <h1>0 results found</h1>}
</div>
    </div>
  :
  <div className="flex gap-3 py-2 flex-col">
  {

    Trendings.slice(0,5).map(elm=>{
      return <Link to={`/topic/${elm.topic._id}`} onClick={()=>setOpen(false)} className="flex gap-3 justify-between">
    <Topic topic={elm.topic.title} /> 
  </Link>
})
}
</div>

}
    <CommandSeparator/>
{
  data.input.length!==0&&
    <div className="px-4 py-2">
      <b className=" text-[gray]">People</b>
      <div className="flex gap-3 py-2 flex-col">
  {data.users.length!==0?
        data.users.map(elm=>{
          return<User avatar={elm.avatar} id={elm._id} username={elm.username} setOpen={setOpen}/>
        }):

        <h1>0 results found</h1>}
        </div>
    </div>
}
       
      </CommandDialog>
    </>
  );
};
export default Logined;

export function Topic({topic,}:{topic:string}){
return <div   className="flex w-full  cursor-pointer items-center">
  <BookText  className="text-[#474747] p-0.5" />
<h1 className="text-md">{topic}</h1>

</div>
}

export function User({avatar,username,id,setOpen}:{avatar:string,id:string,username:string,setOpen:any}){
  return <Link to={`/user/${id}`} onClick={()=>setOpen(false)} className="flex gap-x-5 cursor-pointer items-center">
    <Avatar>
      <AvatarImage src={avatar} />
    </Avatar>
    <h1>{username}</h1>
  </Link>
  }