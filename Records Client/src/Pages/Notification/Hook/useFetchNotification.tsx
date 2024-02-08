import { GetNotifications } from '@/Queryfunctions/Notification/GetNotifications';
import { useAppDispatch, useAppSelector } from '@/app/ReduxHooks';
import { NotificationInsert } from '@/app/Slices/Notifications/NotifcationSlice';
import {  useQuery } from 'react-query';

const useFetchNotification = () => {
let dispatch=useAppDispatch()
let credits =useAppSelector(state=>state.credits)
    let {  isLoading } = useQuery({
      queryKey: ["notifications", credits.Info._id],
      queryFn: GetNotifications,
      onSuccess(data) {
     dispatch(NotificationInsert({notifications:data.payload}))
    }}
    );
    return {  isLoading };
}

export default useFetchNotification
