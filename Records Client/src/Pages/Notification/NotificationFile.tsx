import { Separator } from "@/components/ui/separator"
import LpSidebarFile from "../Landing page/sidebar/LpSidebarFile"
import Notifications from "./Notifications"

const NotificationFile = () => {
  return (
    <div className="w-full flex md:h-[94vh] max-md:h-[92vh]  items-center">

        <div className="md:w-[70%] max-md:w-full flex flex-col h-full items-center">
            <div className="max-md:w-[90%] md:w-[85%] md:pt-24 max-md:pt-12 h-full px-2 flex flex-col gap-y-4">
<h1 className="hFont text-5xl">Notifications</h1>
            <Separator />
            <Notifications/>
            </div>
        </div>
        <div className="w-[30%] h-full max-md:hidden">
<LpSidebarFile/>
        </div>
        
    </div>
  )
}

export default NotificationFile
