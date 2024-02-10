import UploadFn from "@/Queryfunctions/Posts/UploadPost";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { CreditsInsertion } from "@/app/Slices/CredentialSlice";
import { insertion } from "@/app/Slices/LandingSlice";
import { useNavigate } from "react-router-dom";
import { WriteInsertion } from "@/app/Slices/WriteSlice";
const useUploadPost = () => {
  let writeState = useAppSelector((state) => state.write);
  let dispatch = useAppDispatch();
  let credits = useAppSelector((state) => state.credits);
  let { Blogs } = useAppSelector((state) => state.landing);
  let {
    mainContent,
    title,
    subtitile,
    Banner,
    topic,
    timeToRead,
    FollowerOnly,
    AdditionalAssests,
    Commenting,
    likescount
  } = writeState;
  let { type, options, title: PollTitle } = AdditionalAssests.PollnQ;

  let navigate = useNavigate();
  let backtoDefault = () => {
    dispatch(
      WriteInsertion({
        mainContent: "",
        title: "",
        timeToRead: "",
        Banner: "",
        subtitile: "",
        topic: "",
      })
    );
    localStorage.removeItem("Banner_Post");
  };
  let AdditionalAssestsPayload: any = {};
  if (AdditionalAssests.include) {
    if (AdditionalAssests.PollnQ.type === "Question") {
      AdditionalAssestsPayload.AdditonalAssetsType = type;
      AdditionalAssestsPayload.AdditonalAssets = {
        title: PollTitle,
        options,
        correct: AdditionalAssests.PollnQ.correct,
      };
    } else {
      AdditionalAssestsPayload.AdditonalAssetsType = type;
      AdditionalAssestsPayload.AdditonalAssets = { title: PollTitle, options };
    }
  }

  let { mutate, isLoading } = useMutation({
    mutationKey: ["upload", credits.Info._id],
    mutationFn: (Anonymous: boolean) => {
      return UploadFn({
        author: credits.Info._id,
        anonymous: Anonymous,
        content: mainContent,
        title,
        subTitle: subtitile,
        banner: Banner,
        timeToRead,
        topic,
        FollowerOnly,
        ...AdditionalAssestsPayload,
        commenting:Commenting,
        likesCount:likescount 
      });
    },
    onSuccess(data) {
      let { payload } = data;
      let Input;
      if (payload.anonymous) {
        Input = { ...payload, author: {} };
      } else {
        Input = payload;
      }
      dispatch(insertion({ Blogs: [Input, ...Blogs] }));
      dispatch(CreditsInsertion({ Posts: [Input, ...credits.Info.Posts] }));
      toast.success("Blog posted successfully");
      localStorage.removeItem("Blog_Content");
      localStorage.removeItem("Banner_Post");
      backtoDefault();
      navigate("/");
    },
    onError() {
      toast.error("Failed to upload , try again later");
    },
  });
  return { mutate, isLoading };
};

export default useUploadPost;
