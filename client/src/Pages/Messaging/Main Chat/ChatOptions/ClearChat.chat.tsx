import { Trash2 } from "lucide-react"
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
import useClearChat from "../../Hooks/Chat/useClearChat"

const ClearChat = () => {
  let {mutate}=useClearChat()
  return (
    <AlertDialog>
      <AlertDialogTrigger >
      <div className="flex gap-x-1 border hover:bg-[var(--secondary)] hover:text-white p-1 center cursor-pointer">
      <Trash2  size={16}/>Clear chat</div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[var(--bg)]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>mutate()} className="hover:bg-[var(--primary)] bg-[var(--primary)]">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}



export default ClearChat
