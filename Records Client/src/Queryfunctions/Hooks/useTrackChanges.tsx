import { useState, useEffect } from "react";
import lodash from "lodash";

function useTrackChanges<T>(comparableValue: T) {
  const [InititalState, setInititalState] = useState<any>(null);
  const [changes, setChanges] = useState<boolean>(false);

  useEffect(() => {
    if (InititalState == null) {
      setInititalState(comparableValue);
    }
  }, []);

  useEffect(() => {
    setChanges(
      !(lodash.isEqual(
        JSON.stringify(InititalState),
        JSON.stringify(comparableValue)
      ))
    );
  }, [comparableValue,InititalState]);

  useEffect(() => {
    console.log(
      lodash.isEqual(
        JSON.stringify(InititalState),
        JSON.stringify(comparableValue)
      )
    );
  }, [changes]);

  let ChangeInitialState = (updatedState: any) => {
    setInititalState(updatedState);
  };

  return { changes, ChangeInitialState };
}

export default useTrackChanges;