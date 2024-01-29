import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const NotificationRadioGroup= ()=>{
  return(
    <div className="flex flex-col gap-y-2 w-[80%]">
      <h1 className="font-bold">Likes notification</h1>
    <RadioGroup defaultValue="comfortable">
    <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Off</Label>
    </div>
    <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">On</Label>
    </div>

    </RadioGroup>
    <Separator/>
</div>
  )
}

const SettingsNotification = () => {
  return (
    <div className=" w-full py-12 flex justify-center ">
        <div className="w-[90%] flex flex-col gap-y-8">
      <h1 className="text-3xl hFont">
        Notification control
        </h1>
<div className="flex flex-col gap-y-2 w-[80%]">

      <h1 className="font-bold">Push notification</h1>
    <div className="  justify-between    items-center  flex space-x-2">
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-md tracking-tight font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          Turn off 
        </label>
       
      </div>
      <Switch  id="terms1" className="!bg-[var(--light)] ToggleShadCn     aspect-square" />
          </div>
    </div>

<NotificationRadioGroup/>
<NotificationRadioGroup/>
<NotificationRadioGroup/>
<NotificationRadioGroup/>


    </div>
    </div>
  )
}

export default SettingsNotification
