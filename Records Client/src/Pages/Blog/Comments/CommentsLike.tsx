import LikeComment from "@/Queryfunctions/Comment/LikeComment";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { CommentInsertion } from "@/app/Slices/CommentSlice";
import CreditsValidator from "@/app/middlewares/functions/CreditsValidator";
import { ThumbsUp } from "lucide-react";
import { useMutation } from "react-query";

const CommentsLike = ({ data }: { data: Icomment }) => {
  let credits = useAppSelector((state) => state.credits);
  let Comments = useAppSelector((state) => state.comment);
  let { mutate } = useMutation({
    mutationKey: "Like",
    mutationFn: () => LikeComment(data._id),
    onSuccess(data) {
      dispatch(
        CommentInsertion({
          Comment: Comments.Comment.map((elm) => {
            if (elm._id === data.payload._id) {
              return data.payload;
            } else return elm;
          }),
        })
      );
    },
  });
  let dispatch = useAppDispatch();
  return (
    <div className="flex gap-x-2">
    <ThumbsUp
      size={18}
      color="gray"
      fill={data?.likes?.includes(credits.Info._id) ? "#5252527d" : "transparent"}
      className="cursor-pointer text-[#5252527d]"
      onClick={() => {
        CreditsValidator(credits, mutate, dispatch);
      }}
      />
      <p>{data.likes.length}</p>
      </div>
  );
};

export default CommentsLike;
