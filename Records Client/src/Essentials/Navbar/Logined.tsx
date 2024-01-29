import {
  PenBox,
  Search,
  Settings,
  UserCircle2,
  PenBoxIcon,
  LogOut,
  BookText,
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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { SearchInsert } from "@/app/Slices/SearchSlice";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDebouncedCallback } from "use-debounce";
import { SearchQuery } from "@/Queryfunctions/Landing/SearchQuery";
import Cookies from "js-cookie";
import { CreditsInsertion } from "@/app/Slices/CredentialSlice";
import { SearchedInsert } from "@/app/Slices/SearchedSlice";
import { toast } from "react-hot-toast";
const LoginedOptions = () => {
  let info=useAppSelector(state=>state.credits)
  let dispatch =useAppDispatch()
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="h-full overflow-hidden  focus-visible:ring-0 object-center md:py-1 max-md:py-3 focus-within:ring-0 outline-0 active:ring-0 ring-0">
          <img src={info.Info.avatar? info?.Info?.avatar:"/images/muaaz.png"} className="aspect-square rounded-full h-[90%] border border-black" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-2 z-[600]">
          <DropdownMenuItem className="cursor-pointer">
            <Link to={`/user/${info.Info._id}`} className="flex gap-x-2 items-center">
              <UserCircle2 size={16} />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              to={"/profile/settings"}
              className="flex gap-x-2 items-center">
              <Settings size={16} /> Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link to={"/write"} className="flex gap-x-2 items-center">
              <PenBoxIcon size={16} /> Write
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            
            <div  className="flex gap-x-2 items-center" onClick={()=>{
              Cookies.remove("Records_session")
              toast("Logged out")
              dispatch(CreditsInsertion({isLogined:false,Info: {
                _id:"",
              username:"",
              avatar:"",
              email:"",
              Name:"",
              bio:"",
              followers:[],
              following:[],
              Posts:[],
              saved:[],
              liked:[],
              anonymous:[],
              interests:[],
              registeredDate:"",
              }  }))
            }}>
           
              <LogOut size={16} /> Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const Logined = () => {
  return (
    <>
      <ul className="list-none flex gap-x-5  ">
        <Link to={"/write"} className="text-gray-600 hover:text-black transition-colors cursor-pointer font-normal flex items-center gap-x-1 max-sm:hidden">
          <PenBox size={25} />{" "}
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
  const debouced = useDebouncedCallback((output)=>{
    SearchQuery(output).then(data=>{
      dispatch(SearchInsert({topics:data.payload.topics,users:data.payload.users}))
    })
    },800)
    useEffect(() => {
      if (data.input!=="") {
             
        debouced(data.input)
    }

    }, [data.input]);
  return (
    <>
      <div
        className="lg:w-[45%] max-lg:w-[30%] max-md:w-[20%] flex rounded-md h-full items-center gap-x-2 text-sm cursor-pointer lg:mx-2 max-lg:ml-1 lg:bg-[#eceaea] lg:p-2"
        onClick={() => setOpen(!open)}
      >
        <Search className="max-md:text-gray-600" />
        <p className="text-gray-800 max-lg:hidden">{data.input||"Search"}</p>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex justify-between px-2">

        <CommandInput placeholder="Type a topic or author's name..."  value={data.input} onValueChange={(e)=>dispatch(SearchInsert({input:e}))}>
          </CommandInput>
          <Link to={`/search/${data.input}`} onClick={()=>setOpen(false)}  className={`my-3 mr-8 p-1  cursor-pointer aspect-square transition-colors hover:bg-gray-300 rounded-full `} >
  <Search size={20} onClick={()=>dispatch(SearchedInsert({TopicSearch:false}))}/>
    </Link>
        </div>
        <div className="px-4 py-2">
      <b className="text-[grey]">Topics</b>
      <div className="flex gap-3 py-2 flex-col">

{data.topics.length!==0?
  data.topics.map(elm=>{
    return <Link to={`/topic/${elm._id}`} onClick={()=>setOpen(false)}>
    <Topic topic={elm.title} />
    </Link>
  }):
  <h1>0 results found</h1>
}
</div>
    </div>
    <CommandSeparator/>
    <div className="px-4 py-2">
      <b className=" text-[gray]">People</b>
      <div className="flex gap-3 py-2 flex-col">
{
  data.users.length!==0?
        data.users.map(elm=>{
          return<User avatar={elm.avatar} id={elm._id} username={elm.username} setOpen={setOpen}/>
        }):
        <h1>0 results found</h1>
}
        </div>
    </div>
       
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