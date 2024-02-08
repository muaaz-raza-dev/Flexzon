import { ReadNotifications } from '@/Queryfunctions/Notification/ReadNotification';
import { useAppDispatch, useAppSelector } from '@/app/ReduxHooks';
import { NotificationInsert } from '@/app/Slices/Notifications/NotifcationSlice';
import {  useMutation } from 'react-query';

const useReadNotification = () => {
let dispatch=useAppDispatch()
let credits =useAppSelector(state=>state.credits)
    let { mutate, isLoading } = useMutation({
      mutationKey: ["notifications", credits.Info._id],
      mutationFn: (id:string)=>ReadNotifications(id),
      onSuccess(data) {
     dispatch(NotificationInsert({notifications:data.payload}))
    }}
    );
    return { mutate, isLoading };
}

export default useReadNotification
