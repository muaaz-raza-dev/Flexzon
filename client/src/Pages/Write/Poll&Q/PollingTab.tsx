import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { WriteInsertion } from "@/app/Slices/WriteSlice";

const PollingTab = () => {
  let dispatch = useAppDispatch();
  let { AdditionalAssests } = useAppSelector((state) => state.write);
  let ActiveStyle = "scale-95 bg-[var(--primary)] text-white";
  let ToggleType = (type:"Poll"|"Question")=>{
    dispatch(WriteInsertion({AdditionalAssestsType:type}))
  }
  return (
    <div className="center w-full">
      <div className="w-[50%] border-2 border-[var(--primary)] rounded center  gap-x-2 p-2">
        {AdditionalAssests.available.map((elm) => {
          return (
            <button
            onClick={()=>ToggleType(elm)}
              className={`border-2 border-inherit w-[46%] py-1 rounded-md center ${AdditionalAssests.PollnQ.type==elm&&ActiveStyle}`}
            >
              {elm}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PollingTab;
