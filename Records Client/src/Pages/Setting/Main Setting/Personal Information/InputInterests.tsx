import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { CreditsInsertion } from "@/app/Slices/CredentialSlice"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

const InputInterests = () => {
    let credits =useAppSelector(state=>state.credits)
  return (
    <div className="flex flex-col gap-y-2 ">
        <h1 className="text-xl hFont">Interests</h1>
    <div className="w-full flex gap-2 flex-wrap">
        {credits.Info.interests.map(interest=>{
            return (
                <div className="p-2 rounded-lg text-sm bg-[var(--primary)] text-white cursor-default shadow-lg center" key={interest._id}>{interest.title}</div>
)
            })}
            <InterestDialog>

            <div className="p-2 rounded-lg text-sm bg-transparent border-[var(--primary)] text-black border-2 cursor-pointer shadow-lg flex gap-x-2 items-center">Edit Interests <Plus size={18}/></div>
            </InterestDialog>
    </div>
            </div>
  )
}


const InterestDialog:React.FC<{children:React.ReactNode}> =({children})=>{
let {Info} =useAppSelector(state=>state.credits)
let dispatch=useAppDispatch()
let Topics =useAppSelector(state=>state.landing).Topics
    return(
        <Dialog>
        <DialogTrigger className="">{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Find your interests</DialogTitle>
            <DialogDescription>
              Select at least 3 topics from follwing list
              <div className="flex flex-wrap w-full my-4 items-center  gap-3  ">
                  {Topics.map((elm)=> <div key={elm._id} className="flex items-center gap-x-2">
      <Checkbox id={elm._id} className="ToggleRadio" onCheckedChange={(e)=>{
  if (e ===true) {
   dispatch(CreditsInsertion({interests:[...Info.interests,elm.topic]}))
  }
  else{
   dispatch(CreditsInsertion({interests:Info.interests.filter(topic=>topic._id!==elm.topic._id)}))
  }
}} checked={Info.interests.some(interest=>interest._id==elm.topic._id)} 
     />
                      <Label htmlFor={elm._id} className="cursor-pointer">
          {elm._id}
                          </Label>
                  </div>)}
              </div>
         
            </DialogDescription>
          
          </DialogHeader>
       
        </DialogContent>
      </Dialog>
    )
}

export default InputInterests
