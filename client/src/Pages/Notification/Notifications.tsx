import { useAppSelector } from "@/app/ReduxHooks";
import { Inotification } from "@/app/Types/INotifications";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import useFetchNotification from "./Hook/useFetchNotification";
import { SmallLoader } from "@/Essentials/Loader";
import useReadNotification from "./Hook/useReadNotification";
import moment from "moment";

const EachNotification: React.FC<{ data: Inotification }> = ({ data }) => {
  let { mutate } = useReadNotification();
  console.log(data.message);
  
  let CommentMessageProvider = () => {
    if (data.type == "comments") {
      return (
        <Link
          to={`/blog/${data.NotificationIncludedPost}`}
          className="w-full py-2 font-semibold text-md"
        >
          {data.NotificationIncludedUser.username} {data.message}
        </Link>
      );
    } else if (data.type == "follows") {
      return (
        <Link
          to={`/user/${data.NotificationIncludedUser._id}`}
          className="w-full py-2 font-semibold text-md"
        >
          {data.NotificationIncludedUser.username} {data.message}
        </Link>
      );
    } else if (data.type == "likes") {
   return   <Link
        to={`/blog/${data.NotificationIncludedPost}`}
        className="w-full py-2 font-semibold text-md"
      >
        {data.NotificationIncludedUser.username} {data.message}
      </Link>;
    }
  };
  
if (data.message) {
  return (
    <section
    className={`w-full cursor-pointer transition-all ${
        !data.read ? " hover:bg-[#8080804a] bg-[#80808027]" : "border"
      } flex gap-x-2 p-1 items-center    rounded-md`}
      onClick={() => mutate(data._id)}
      >
      <Avatar>
        <AvatarImage src={data.NotificationIncludedUser.avatar} />
      </Avatar>
      {CommentMessageProvider()}
      <p className="px-4 text-xs text-black text-nowrap">
        {moment(data.notifiedTime).fromNow()}
      </p>
    </section>
  );
}
};

const Notifications = () => {
  let { notifications } = useAppSelector((state) => state.notifications);
  let { isLoading } = useFetchNotification();
  return (
    <div className="flex flex-col w-full h-full p-2 mb-4 overflow-auto gap-y-2">
      {!isLoading ? (
        notifications.length !== 0 ? (
          notifications.map((elm) => <EachNotification data={elm} />)
        ) : (
          <p className="px-3 text-sm text-center">No notifications... </p>
        )
      ) : (
        <SmallLoader />
      )}
    </div>
  );
};

export default Notifications;
