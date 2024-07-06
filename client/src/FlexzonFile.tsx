import { Suspense, lazy, useEffect, useState } from "react";
import useFetchStarter from "@/Queryfunctions/Hooks/useFetchStarter";
import { FileLoader, RecordsLoader } from "./Essentials/Loader";
import useValidate from "./Queryfunctions/Hooks/useValidate";
const FlexzonRoutes = lazy(() => import("./FlexzonRoutes"));

const RecordsFile = () => {
  let validation = useValidate();
  const [Loading, setLoading] = useState(true);
const {mutate ,isLoading}=useFetchStarter()


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

        <Suspense fallback={<FileLoader/>}>
        <FlexzonRoutes/>
        </Suspense>
      );
    } else {
      return <FileLoader />;
    }
  }
};

export default RecordsFile;
