import { VoteQ } from "@/Queryfunctions/Posts/VotePoll";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { BlogInsert } from "@/app/Slices/BlogSlice";
import { IQuestion } from "@/app/Types/Ilanding";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

const useQuestionVote = (Poll: IQuestion) => {
  let dispatch = useAppDispatch();
  let QState = useAppSelector((state) => state.Blog.data?.Question);
  let { mutate, isLoading } = useMutation({
    mutationKey: "PollingVote",
    mutationFn: (title: string) => VoteQ(Poll, title),
    onError(err: any) {
      toast.error(err?.response?.data?.msg);
    },
    onSuccess(data) {
      if (QState?.total == 0) {
        let UpdatedPoll = {
          ...QState,
          Polled: true,
          PolledTotal: QState?.total || 0 + 1,
          voted: data.title,
          options: QState?.options.map((elm) => {
            if (elm.title == data.title) {
              return { ...elm, votes: 100 };
            } else {
              return elm;
            }
          }),
        };

        dispatch(BlogInsert({ Question: UpdatedPoll }));
      } else {
        dispatch(
          BlogInsert({
            Polled: true,
            QuestionVoted: data.title,
            PolledTotal: QState?.total || 0 + 1,
          })
        );
      }
    },
  });
  return { mutate, isLoading, dispatch };
};

export default useQuestionVote;
