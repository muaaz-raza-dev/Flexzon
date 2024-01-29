import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Edit } from "lucide-react";
import { FC, ReactNode } from "react";
import DeletePost from "./DeletePost";
  

const BlogOptions:FC<{children:ReactNode,id:string}> = ({children,id}) => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger className="h-full overflow-hidden  focus-visible:ring-0 items-end object-center md:py-1 max-md:py-3 focus-within:ring-0 outline-0 active:ring-0 ring-0">
 {children}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="mx-2 z-[600]">
      <DropdownMenuItem className="cursor-pointer border-b-2">
     <DeletePost id={id}/>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer">
        <div  className="flex gap-x-2 items-center text-sm" >
          <Edit/> Edit 
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default BlogOptions
