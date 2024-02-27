import { Trash } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import useDeleteConversation from "../Hooks/Chat/useDeleteConversation"
const DeleteChat = ({id}:{id:string}) => {
  let {mutate} = useDeleteConversation()
  return (
    <AlertDialog>
    <AlertDialogTrigger  className="bg-[var(--primary)] w-full  h-full center gap-2 text-red-400 text-x" >
    <button className="bg-[var(--primary)] w-full  h-full center gap-2 text-red-400 text-xl"><Trash/> Delete conversation</button>
    </AlertDialogTrigger>
    <AlertDialogContent className="bg-[var(--bg)]">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          chats and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-transparent">Cancel</AlertDialogCancel>
        <AlertDialogAction  className="hover:bg-[var(--primary)] bg-[var(--primary)]">Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DeleteChat
