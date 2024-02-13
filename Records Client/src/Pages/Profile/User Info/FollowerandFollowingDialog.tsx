import { Iinfo } from "@/app/Types/ICredits"
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

export const FollowerandFollowingDialog:React.FC<{children:React.ReactNode,data:Iinfo[]}> = ({children,data}) => {
  return (
       
          <Dialog >
            <DialogTrigger asChild className="cursor-pointer">
             {children}
            </DialogTrigger>
            <DialogContent className="w-screen p-0">
              <Command className="w-full">
                <CommandInput placeholder="Search by username ... " className="h-9" />
                <CommandEmpty>No user found.</CommandEmpty>
                <CommandGroup>
                  {
                    data.length!==0?
                  data.map((user:any) => (
                    <CommandItem
                  
                     
                    >

                        <Link to={`/user/${user._id}`} className="flex w-full gap-x-4  items-center ">
                        <DialogClose className="flex w-full gap-x-4  items-center">
                            <Avatar>
                                <AvatarImage src={user.avatar} className="w-full aspect-square rounded-full border border-black"/>
                            </Avatar>
                            <div className="flex flex-col ">
                            <b className="text-start">
                      {user.username}
                            </b>
                            <p className="text-gray-700  text-start">{user.Name}</p>
                            </div>
                        </DialogClose>
                        </Link>
                    
                    </CommandItem>
                  )) :
                  <CommandItem>
                    0  found
                  </CommandItem >
                  }
                </CommandGroup>
              </Command>
            </DialogContent>
          </Dialog>
        )
  
}

