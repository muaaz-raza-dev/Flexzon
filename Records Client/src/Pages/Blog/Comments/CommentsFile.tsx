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
interface ICommentBox {
    children:ReactNode
}
const CommentsFile:FC<ICommentBox> = ({children}) => {
  return (
    <Sheet  >
    <SheetTrigger asChild>
    {children}
    </SheetTrigger>
    <SheetContent className="  overflow-y-auto " >
      <SheetHeader>
        <SheetTitle className="hFont text-2xl"> Responses </SheetTitle>
        <SheetDescription className="flex flex-col gap-y ">
            <AddComment/>
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
