import { saveNotificationSettings } from "@/Queryfunctions/Notification/saveNotificationPreferences"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { toast } from "react-hot-toast"
import { useMutation } from "react-query"

function useNotificationSave  <T>(ChangeInitialState:T)  {
    let dispatch = useAppDispatch()
    let notificationSettings=useAppSelector(state=>state.credits.Info.notificationSettings)
        let {mutate,isLoading}=useMutation({mutationKey:"PollingVote",mutationFn:()=>saveNotificationSettings(notificationSettings) ,onError(err:any) {
            toast.error(err?.response?.data?.msg)
          }, onSuccess(data) {
            toast.success(data.msg)
            typeof ChangeInitialState=="function"&& ChangeInitialState(notificationSettings)
          },})
          return {mutate,isLoading,dispatch}
}

export default useNotificationSave
