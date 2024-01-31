import { CatchProfileviewer } from "@/Queryfunctions/Detail/FetchIndividualUser"
import { useAppSelector } from "@/app/ReduxHooks"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {  ArrowUpLeftFromCircle, ArrowUpRight, CalendarDays, Contact, Facebook, Instagram, Linkedin, Mail, PanelTop, UserRoundIcon } from "lucide-react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
const ProfileDetails = () => {
let credits = useAppSelector(state=>state.credits)
let Params = useParams()
  useQuery({queryKey:[credits.Info._id,"Viewer"],queryFn:()=>CatchProfileviewer(Params?.id||"") ,staleTime:1000*60*60*60 ,     refetchOnWindowFocus: false})
  let {Info} = useAppSelector(state=>state.userDetails)
let {Name,email,contact,website,dob,gender,registeredDate,Links} =Info
  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button className="bg-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white text-white" variant={"outline"}>
    More Details
  </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Name. {Name}</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-2">
                <Mail size={18}/>
              Email:  <b className="text-black">
                {email}
                </b>
            </div>
            {
              contact&&
            <div className="flex gap-x-2">
                <Contact size={18}/>
               Contact: <b className="text-black">
                {contact?.value||""}
                </b>
            </div>}
            {
              dob&&
            <div className="flex gap-x-2">
                <CalendarDays size={18}/>
                Birthday :<b className="text-black">
                    {dob?.value||""} 
                    </b>
            </div>
}
{
  gender&&
            <div className="flex gap-x-2">
                <UserRoundIcon size={18}/>
                Gender :<b className="text-black">
                    {gender?.value||""}
                    </b>
            </div>
}
            <div className="flex gap-x-2">
                <PanelTop size={18}/>
            <a href={website?.url} target="blank" className="text-md flex gap-x-1 ">
                Website:  <b className=" text-blue-500 "> {website?.altText||"WEBSITE"} </b>
                    <ArrowUpRight size={12}/>
            </a>
            </div>
<div className="flex gap-x-2">
<ArrowUpLeftFromCircle  size={18}/>
    Joined   <b> {new Date(registeredDate).toDateString()}</b>
</div>
            <div className="flex gap-x-2">
            <a href={Links?.fb} target="blank" className="text-white text-md flex rounded-full p-2 bg-[var(--primary)]">
                <Facebook className="max-md:w-8 " size={20}/>
            </a>
            <a href={Links?.insta} target="blank" className="text-white text-md flex rounded-full p-2 bg-[var(--primary)]">
                <Instagram className="max-md:w-8 " size={20}/>
            </a>
            <a href={Links?.linkedIn} target="blank" className="text-white text-md flex rounded-full p-2 bg-[var(--primary)]">
                <Linkedin className="max-md:w-8 " size={20}/>
            </a>
            </div>
        </div>
      </DialogDescription>
     
    </DialogContent>
  </Dialog>
  )
}

export default ProfileDetails
