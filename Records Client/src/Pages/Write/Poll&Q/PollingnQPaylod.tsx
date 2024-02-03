// import PollingTab from "./PollingTab";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { WriteInsertion } from "@/app/Slices/WriteSlice";
import { Check, PlusCircle, X } from "lucide-react";
const PollingnQPaylod = () => {
  let { AdditionalAssests } = useAppSelector((state) => state.write);
  let dispatch = useAppDispatch();
  let OptionvsQuestion =
    AdditionalAssests.PollnQ.type == "Poll" ? "Options" : "Answers";
  function OptionHandler(e: any) {
    let options = AdditionalAssests.PollnQ.options?.map((...index) => {
      return { title: e.target[index[1]].value };
    });
    dispatch(
      WriteInsertion({ Options: options.filter((elm) => elm.title !== "") })
    );
  }
  let CorrectAnswerHandler = (value: string) => {
    if (AdditionalAssests.PollnQ.type === "Question") {
      dispatch(WriteInsertion({ correct: value }));
    }
  };

  return (
    <div className="border-2 p-2 w-full border-black rounded border-dashed flex flex-col gap-y-3">
      {/* <PollingTab /> */}
      <Input
        autoFocus
        placeholder="Ask question or somthing"
        className="text-xl bg-transparent border-balck  active:outline-none focus-within:shadow-none focus-visible:ring-offset-0 outline-0 border-2 focus:border-b-2 hFont focus-visible:ring-0 "
        value={AdditionalAssests.PollnQ.title}
        onChange={(e) =>
          dispatch(WriteInsertion({ AdditionalAssestsTitle: e.target.value }))
        }
      />
      <div className=" flex flex-col gap-y-2">
        <Label className="text-xl font-bold">Options</Label>
      </div>
      <form
        className="flex flex-col gap-y-2"
        onSubmit={(e: any) => {
          e.preventDefault();
          OptionHandler(e);
        }}
      >
        {AdditionalAssests.PollnQ.options.map((elm, index) => {
          return (
            <Input
              defaultValue={elm.title}
              key={`${elm.title} ${index}`}
              placeholder={`${OptionvsQuestion} ${index + 1}`}
              className="focus-visible:ring-0 font-bold text-black"
            />
          );
        })}

        <Button
          type="button"
          className="text-black px-4 w-max border-2 border-[var(--primary)]"
          onClick={() =>
            dispatch(
              WriteInsertion({
                Options: [...AdditionalAssests.PollnQ.options, { title: "" }],
              })
            )
          }
        >
          <PlusCircle className="max-md:w-6" size={22} />{" "}
        </Button>
        {AdditionalAssests.PollnQ.type == "Question" && (
          <h1 className=" font-semibold font-roboto text-xl">
            Choose correct one :
          </h1>
        )}
        <div className="flex flex-wrap gap-x-2">
          {AdditionalAssests.PollnQ.options.map((elm, index) => {
            if (elm.title !== "") {
              return (
                <div
                  className={`flex rounded-xl hover:scale-[.97] cursor-pointer transition  border-black border-2 p-2 gap-x-4 items-center ${
                    AdditionalAssests.PollnQ.type == "Question" &&
                    AdditionalAssests.PollnQ.correct == elm.title &&
                    "scale-95 border-green-500"
                  }`}
                  onClick={() => CorrectAnswerHandler(elm.title)}
                >
                  <p className="text-xs">
                    {`${OptionvsQuestion.slice(
                      0,
                      OptionvsQuestion.length - 1
                    )}.${index + 1} :`}
                  </p>
                  <b className="">{elm.title}</b>
                  {AdditionalAssests.PollnQ.type == "Question" &&
                    AdditionalAssests.PollnQ.correct == elm.title && (
                      <button
                        className="text-green-500 border-black rounded  font-bold"
                        onClick={() => {}}
                      >
                        <Check size={16} />
                      </button>
                    )}
                  <button
                    className="text-red-500 border-red-500 rounded-full border font-bold"
                    onClick={() => {
                      dispatch(
                        WriteInsertion({
                          Options: AdditionalAssests.PollnQ.options.filter(
                            (...i) => i[1] != index
                          ),
                        })
                      );
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              );
            }
          })}
        </div>
        <Button
          type="submit"
          className="hover:bg-[var(--primary)] bg-[var(--primary)]"
        >
          Confirm {AdditionalAssests.PollnQ.type}{" "}
        </Button>
      </form>
    </div>
  );
};

export default PollingnQPaylod;
