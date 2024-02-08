import { useAppSelector } from "@/app/ReduxHooks"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Link } from "react-router-dom"

export const FollowerandFollowingDialog:React.FC<{children:React.ReactNode,type:"follower"|"following"}> = ({children,type}) => {
let {Info} =useAppSelector(state=>state.userDetails)
     let ToIterate ={follower:Info.followers,following:Info.following}
  return (
       
          <Dialog >
            <DialogTrigger asChild className="cursor-pointer">
             {children}
            </DialogTrigger>
            <DialogContent className="w-screen p-0">
              <Command className="w-full">
                <CommandInput placeholder="Search by username ... " className="h-9" />
                <CommandEmpty>No follower found.</CommandEmpty>
                <CommandGroup>
                  {
                    ToIterate[type].length!==0?
                  ToIterate[type].map((data) => (
                    <CommandItem
                  
                     
                    >

                        <Link to={`/user/${data._id}`} className="flex w-full gap-x-4  items-center ">
                        <DialogClose className="flex w-full gap-x-4  items-center">
                            <Avatar>
                                <AvatarImage src={data.avatar} className="w-full aspect-square rounded-full border border-black"/>
                            </Avatar>
                            <div className="flex flex-col ">
                            <b className="text-start">
                      {data.username}
                            </b>
                            <p className="text-gray-700  text-start">{data.Name}</p>
                            </div>
                        </DialogClose>
                        </Link>
                    
                    </CommandItem>
                  )) :
                  <CommandItem>
                    0  {type} yet
                  </CommandItem >
                  }
                </CommandGroup>
              </Command>
            </DialogContent>
          </Dialog>
        )
  
}

