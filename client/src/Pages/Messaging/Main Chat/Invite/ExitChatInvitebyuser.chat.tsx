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
import { LogOut } from "lucide-react"
import useEndInviteUser from "./Hook/useEndInvite"
import { useParams } from "react-router-dom"


const ExitChatInvitebyuser = () => {
  let {mutate} = useEndInviteUser()
  let {id} = useParams()
  return (
    <AlertDialog>
  <AlertDialogTrigger><LogOut/></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently exit you
        from this chat unless the admin re-invite you.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="hover:bg-[var(--primary)] bg-[var(--primary)]" onClick={()=>{
        id&&mutate(id)
      }}>Exit</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default ExitChatInvitebyuser
