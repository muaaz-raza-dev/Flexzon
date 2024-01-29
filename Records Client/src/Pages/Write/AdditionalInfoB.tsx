import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { WriteInsertion } from "@/app/Slices/WriteSlice";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { ChangeEvent, useEffect } from "react";
const ReadCountCaculator = (plainText: string) => {
  let wordsCount = plainText.split(" ").filter((elm) => elm !== " ").length;
  let avgReader = 200; //238-38 wpm refrence:Google
  let output = wordsCount / avgReader;
  return output > 1
    ? `${Math.round(output)} mins read`
    : `
        ${Math.round(output * 60)} seconds read`;
};


const AdditionalInfoB = () => {
  let writeState = useAppSelector((state) => state.write);
  let dispatch = useAppDispatch();
  useEffect(() => {
    let output = ReadCountCaculator(writeState.plainText);
    dispatch(WriteInsertion({ timeToRead: output }));
  }, [writeState.plainText]);
  let InputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(WriteInsertion({ [e.target.name]: e.target.value }));
  };
  return (
    <div className="w-full">

      <Input
        placeholder="Title"
        name="title"
        className="   focus-visible:ring-0 border border-black my-2 text-md font-bold placeholder:font-bold "
        onChange={(e) => InputHandler(e)}
        value={writeState.title}
      />
      <Textarea
      placeholder="Sub-title or teaser "
      name="subtitile"
        className="   focus-visible:ring-0 border border-black my-2 text-sm"
        onChange={(e) => InputHandler(e)}
        value={writeState.subtitile}
        />
      <div className="flex gap-x-2 w-full justify-between">
        <div className="w-[80%]">
          <Input
            placeholder="Topic i.e Programming or Entertaiment"
            name="topic"
            className=" outline-none  focus-visible:ring-0 border border-black my-2 text-[0.85rem] "
            onChange={(e) => InputHandler(e)}
            value={writeState.topic}
          />
        </div>
        <div className="text-center center float-end flex gap-x-2 bg-[var(--primary)] max-md:w-[25%] md:w-[15%] max-sm:w-[60%] p-2 my-2 rounded text-white">
          {writeState.timeToRead}{" "}
        </div>
      </div>
      {/* // !FollowerOnly */}
    <FollowerOnlyOption/>
    </div>
  );
};

export default AdditionalInfoB;

        function FollowerOnlyOption() {
          let writeState = useAppSelector((state) => state.write);
          let dispatch = useAppDispatch();
          return (
            <div className=" lg:w-[18%]  max-lg:w-[38%] max-md:w-[48%] justify-between    items-center  flex space-x-2">
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-md font-bold tracking-tight center  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-x-3"
                  
                >


                  Follower only ⭐

                  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
                  <Info size={18}/>
      </TooltipTrigger>
      <TooltipContent>
        <p>You can't post anonymously after active this option</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
                </label>
              </div>
              <Switch
                id="terms1"
                onCheckedChange={(e) =>
                  dispatch(
                    WriteInsertion({
                      FollowerOnly: e,
                    })
                  )
                }
                className="!bg-[var(--light)] ToggleShadCn     aspect-square"
                checked={writeState.FollowerOnly}
              />
            </div>
          );
        }