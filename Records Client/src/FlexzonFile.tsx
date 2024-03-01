import { Suspense, lazy, useEffect, useState } from "react";
import { FetchStarter } from "@/Queryfunctions/Hooks/useFetchStarter";
import { insertion } from "./app/Slices/LandingSlice";
import { RecordsLoader } from "./Essentials/Loader";
import { useAppDispatch, useAppSelector } from "./app/ReduxHooks";
import { useMutation } from "react-query";
import useValidate from "./Queryfunctions/Hooks/useValidate";
const FlexzonRoutes = lazy(() => import("./FlexzonRoutes"));

const RecordsFile = () => {
  let state = useAppSelector((state) => state.landing);
  let validation = useValidate();
  let Info = useAppSelector((state) => state.credits);
  const [Loading, setLoading] = useState(true);
  let dispatch = useAppDispatch();
  let { mutate, isLoading } = useMutation({
    mutationKey: "Topics",
    onSuccess(data) {
      dispatch(
        insertion({
          count: state?.count + 1,
          Blogs: [...state.Blogs, ...data?.payload?.Blogs] || [],
          Topics: data?.payload?.Topics || [],
          Trendings: data?.payload?.Trendings || [],
          TopCreators: data?.payload.TopCreators || [],
        })
      );
    },
    mutationFn: () => FetchStarter(state.count, Info.Info.interests),
  });

  useEffect(() => {
    validation.then((loading) => {
      mutate();
      setLoading(loading);
    });
  }, []);

  if (isLoading) {
    return <RecordsLoader />;
  } else {
    if (!Loading) {
      return (
        <Suspense fallback={<RecordsLoader/>}>
        <FlexzonRoutes/>
        </Suspense>
      );
    } else {
      return <RecordsLoader />;
    }
  }
};

export default RecordsFile;
