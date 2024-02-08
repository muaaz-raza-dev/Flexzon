import {useState,useEffect} from "react"
function useTrackChanges  <T>(comparableValue:T) {
  const [InititalState, setInititalState] = useState<any>(null);
  let changes:boolean;
  useEffect(() => {
    if (InititalState==null) {
        setInititalState(comparableValue)
    }
  }, []);
if (JSON.stringify(InititalState)==JSON.stringify(comparableValue)) {
    changes=false
}
else{
    changes=true
}

let ChangeInitialState = (updatedState:any)=>{
  setInititalState(updatedState)
}

return {changes ,ChangeInitialState }  

}

export default useTrackChanges
