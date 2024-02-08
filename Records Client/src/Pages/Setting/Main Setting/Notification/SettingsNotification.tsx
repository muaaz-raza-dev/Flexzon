import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { CreditsInsertion } from "@/app/Slices/CredentialSlice";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { FC } from "react";
import useNotificationSave from "./hooks/useNotificationSave";
import { LightLoader } from "@/Essentials/Loader";
import { Button } from "@/components/ui/button";
import useTrackChanges from "@/Queryfunctions/Hooks/useTrackChanges";

const NotificationRadioGroup: FC<{ data: [string, boolean] }> = ({ data }) => {
  let dispatch = useAppDispatch();
  let notificationSettings = useAppSelector((state) => state.credits).Info
    .notificationSettings;
  return (
    <div className="flex flex-col gap-y-2 w-[80%]">
      <h1 className="font-bold">{data[0]} notification</h1>
      <RadioGroup
        value={data[0] + (data[1] ? ".on" : ".off")}
        onValueChange={(e) => {
          console.log(e);
          dispatch(
            CreditsInsertion({
              NotificationSetting: {
                ...notificationSettings,
                [data[0]]: e.split(".")[1] == "on",
              },
            })
          );
        }}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={data[0] + ".on"} id="r1" />
          <Label htmlFor="r2">On</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={data[0] + ".off"} id="r2" />
          <Label htmlFor="r1">Off</Label>
        </div>
      </RadioGroup>
      <Separator />
    </div>
  );
};

const SettingsNotification = () => {
  let { notificationSettings } = useAppSelector((state) => state.credits).Info;
  let dispatch = useAppDispatch();
  let {changes,ChangeInitialState} = useTrackChanges(notificationSettings)
  let {mutate,isLoading}=useNotificationSave<typeof ChangeInitialState>(ChangeInitialState)
  return (
    <div className=" w-full py-12 flex justify-center ">
      <div className="w-[90%] flex flex-col gap-y-8">
        <h1 className="text-3xl hFont">Notification control</h1>
        <div className="flex flex-col gap-y-2 w-[80%]">
          <h1 className="font-bold">Push all notification</h1>
          <div className="  justify-between    items-center  flex space-x-2">
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-md tracking-tight font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
               Turn on /off
              </label>
            </div>
            <Switch
              id="terms1"
              checked={notificationSettings.all}
              onCheckedChange={(e)=>dispatch(CreditsInsertion({NotificationSetting:{...notificationSettings,all:e}}))}
              className="!bg-[var(--light)] ToggleShadCn  aspect-square"
            />
          </div>
        </div>
        {Object.entries(notificationSettings).map((elm) => {
          if (elm[0] !== "all") {
            return <NotificationRadioGroup data={elm} />;
          }
        })}
      <Button disabled={!changes} className="w-[20%]  text-md  bg-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white text-white" variant={"outline"} onClick={()=>mutate()}>
{isLoading?<LightLoader/>:"Save"}
  </Button>
      </div>
    </div>
  );
};

export default SettingsNotification;
