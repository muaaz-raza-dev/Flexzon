import { Inotification, InotificationState } from "@/app/Types/INotifications";
import { PayloadAction } from "@reduxjs/toolkit/react";
interface IsearchAction{
    notifications:Inotification[]
}

const NotificationInsertion = (
  state: InotificationState,
  action: PayloadAction<IsearchAction>
) => {
    let {payload}=action
if (payload.notifications) {
    state.notifications=payload.notifications
}

}
export default NotificationInsertion;
