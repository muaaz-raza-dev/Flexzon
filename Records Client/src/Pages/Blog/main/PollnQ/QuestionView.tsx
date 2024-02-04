import { useAppSelector } from "@/app/ReduxHooks";
import CreditsValidator from "@/app/middlewares/functions/CreditsValidator";
import useQuestionVote from "../Hooks/useQuestionVote";
import { Check,X } from "lucide-react";

const QuestionView = () => {
  let BlogState = useAppSelector((state) => state.Blog);
  let credits = useAppSelector((state) => state.credits);
  if (
    BlogState.data?.AdditonalAssetsType == "Question" &&
    BlogState.data.Question
  ) {
    let { mutate, dispatch, isLoading } = useQuestionVote(
      BlogState.data.Question
    );
    return (
      <div
        className="w-full px-6 py-3 flex gap-y-4 flex-col border-2 border-dashed rounded 
      border-[#00000059] my-4 "
      >
        <h1 className="hFont text-3xl  ">Q: {BlogState.data.Question?.title}</h1>
        <div className="flex flex-col gap-2">
          {BlogState.data.Question &&
            BlogState.data.Question.options.map((elm) => {
              if (!BlogState.data?.Question?.Polled||isLoading) {
                return (
                  <button
                    className={`w-full px-4 hover:outline-2 outline-white hover:text-white transition hover:bg-[var(--primary)] cursor-pointer font-semibold border-[var(--primary)] border   rounded-lg p-2 flex justify-between `}
                    onClick={() => {
                      CreditsValidator(credits, mutate, dispatch, elm.title);
                    }}
                  >
                    {elm.title}
                  </button>
                );
              } else {
                return (
                  <button
                    className={`w-full px-4 hover:outline-2 outline-white hover:text-white transition hover:bg-[var(--primary)] cursor-pointer font-semibold border-[var(--primary)] border   rounded-lg p-2 flex justify-between ${
                      BlogState.data?.Question?.voted == elm.title
                        ? BlogState.data?.Question?.voted ==
                            BlogState.data.Question.correct ?
                          "bg-[#00800044] border-[#00800075]"
                        : "bg-[#ff00004f] border-[#ff00004f]":""
                    }`}
                  >
                    {elm.title}{" "}
                    <div className="px-4 w-[10%] items-end hFont flex gap-x-4">
                      {
                      elm.title ==
                        BlogState.data?.Question?.correct ? (
                        <Check className="max-md:w-6 font-bold "  size={20} />
                      ) : (
                        <X className="max-md:w-6 text-red-500" size={20} />
                      )}
                      {elm.votes}%
                    </div>
                  </button>
                );
              }
            })}
          <b className="text-sm">
            {BlogState.data.Question.total} vote
            {BlogState.data.Question.total > 1 && "s"}
          </b>
        </div>
      </div>
    );
  }
};

export default QuestionView;
