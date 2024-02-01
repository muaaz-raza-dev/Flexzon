import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { WriteInsertion } from "@/app/Slices/WriteSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";
import PollingTab from "./PollingTab";


const Polling = () => {
  return (
    <div className="flex flex-col gap-y-4 w-full my-4">
      <PollingAsk/>

      <div className="border-2 p-2 w-full border-black rounded border-dashed flex flex-col gap-y-3">
       <PollingTab/>
        <Input autoFocus placeholder="Ask question or somthing" className="text-xl bg-transparent border-balck active:outline-none focus-within:shadow-none focus-visible:ring-offset-0 outline-0 border-0 focus:border-b-2 hFont focus-visible:ring-0 "/>
        <div className=" flex flex-col gap-y-2">
            <Label className="text-xl font-bold">
                Options
            </Label>
        </div>
        <Input placeholder="Option 1" className="focus-visible:ring-0"/>
        <Input placeholder="Option 2" className="focus-visible:ring-0"/>
        <Button className="hover:bg-[var(--primary)] bg-[var(--primary)]">Add more options </Button>
      </div>
    </div>
  )
}


const PollingAsk=()=>{
    return(
        <div className=" lg:w-[18%]  max-lg:w-[38%] max-md:w-[48%] justify-between    items-center  flex space-x-2">
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-md font-bold tracking-tight center  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-x-3"
            
          >


         Add Polling/Question

          </label>
        </div>
        <Switch
          id="terms1"
          
          
          className="!bg-[var(--light)] ToggleShadCn     aspect-square"
   
        />
      </div>
    )
}

export default Polling
