import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FC, ReactNode } from "react"
import AddComment from "./AddComment"
import MainCommentBlock from "./MainCommentBlock"
import { useAppSelector } from "@/app/ReduxHooks"
interface ICommentBox {
    children:ReactNode
}
const CommentsFile:FC<ICommentBox> = ({children}) => {
  let {isLogined}=useAppSelector(state=>state.credits)
  return (
    <Sheet  >
    <SheetTrigger asChild>
    {children}
    </SheetTrigger>
    <SheetContent className="overflow-y-auto " >
      <SheetHeader>
        <SheetTitle className="text-2xl hFont"> Responses </SheetTitle>
        <SheetDescription className="flex flex-col gap-y ">
          {isLogined&&
            <AddComment/>
          }
        </SheetDescription>
      </SheetHeader>
    <MainCommentBlock/>
      <SheetFooter>
    
      </SheetFooter>
    </SheetContent>
  </Sheet>
  )
}

export default CommentsFile
