import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { WriteInsertion } from "@/app/Slices/WriteSlice";
import PollingnQPaylod from "./PollingnQPaylod";


const Polling = () => {
  let {AdditionalAssests} =useAppSelector(state=>state.write)

  return (
    <div className="flex flex-col gap-y-4 w-full my-4">
      <PollingAsk/>
{
AdditionalAssests.include&&  
   <PollingnQPaylod/>
      }
    </div>
  )
}


const PollingAsk=()=>{
    let {AdditionalAssests} =useAppSelector(state=>state.write)
  let dispatch=useAppDispatch()
    return(
        <div className=" lg:w-[18%]  max-lg:w-[38%] max-md:w-[48%] justify-between    items-center  flex space-x-2">
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-md font-bold tracking-tight center  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-x-3"
            
          >


         Add Polling / Question
         {/* / Question */}

          </label>
        </div>
        <Switch
          id="terms1"
          checked={AdditionalAssests.include}
          onCheckedChange={(e)=>dispatch(WriteInsertion({AdditionalAssestsInclude:e}))}
          className="!bg-[var(--light)] ToggleShadCn pr-1"
   
        />
      </div>
    )
}

export default Polling
