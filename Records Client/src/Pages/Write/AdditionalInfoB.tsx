import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { WriteInsertion } from "@/app/Slices/WriteSlice";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { ChangeEvent,  useEffect } from "react";
import Polling from "./Poll&Q/Polling";
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

          <Polling/> 
      <Input
        placeholder="Title"
        name="title"
        className="my-2 font-bold border border-black focus-visible:ring-0 text-md placeholder:font-bold"
        onChange={(e) => InputHandler(e)}
        value={writeState.title}
      />
      <Textarea
      placeholder="Sub-title or teaser "
      name="subtitile"
        className="my-2 text-sm border border-black focus-visible:ring-0"
        onChange={(e) => InputHandler(e)}
        value={writeState.subtitile}
        />
      <div className="flex justify-between w-full gap-x-2">
        <div className="w-[80%]">
          <Input
            placeholder="Topic i.e Programming or Entertaiment"
            name="topic"
            className="font-bold outline-none  focus-visible:ring-0 border border-black my-2 text-[0.85rem] "
            onChange={(e) => InputHandler(e)}
            value={writeState.topic}
          />
        </div>
        <div className="text-center center float-end flex gap-x-2 bg-[var(--primary)] max-md:w-[25%] md:w-[15%] max-sm:w-[60%] p-2 my-2 rounded text-white">
          {writeState.timeToRead}{" "}
        </div>
      </div>
      {/* // !FollowerOnly */}
      <div className="mt-4">
        <h1 className="font-bold text-xl p-2">Advanced accessiblity options</h1>
      <div className="flex max-lg:flex-col w-full gap-x-4 ">
    <AcessiblityOptions purpose={"FollowerOnly"} description={"blog will only be accessable by your followers"} label={"For followers only"}/>
    <AcessiblityOptions purpose={"Commenting"} description={"Commenting on your post will be disabled"} label={" Commenting"}/>
    <AcessiblityOptions purpose={"likescount"} description={"Total likes count will not be shown your blog"} label={"Likes count"}/>
      </div>
    </div>
      </div>
  );
};

export default AdditionalInfoB;

        function AcessiblityOptions ({purpose,description,label}:{purpose:"FollowerOnly"|"Commenting"|"likescount",description:string,label:string}) {
          let writeState = useAppSelector((state) => state.write);
          let dispatch = useAppDispatch();
          return (
            <div className=" lg:w-[24%]  max-lg:w-[42%] p-2 border max-md:w-[100%] justify-between    items-center  flex space-x-2 flex-row-reverse">
               <Switch
                id=""
                onCheckedChange={(e) =>
                  dispatch(
                    WriteInsertion({
                      [purpose]: e,
                    })
                  )
                }
                className="!bg-[var(--light)] ToggleShadCn     aspect-square"
                checked={writeState[purpose]}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor=""
                  className="flex font-bold leading-none tracking-tight text-md center peer-disabled:cursor-not-allowed peer-disabled:opacity-70 gap-x-3"
                  
                >


                  {label}

                  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
                  <Info size={14}/>
      </TooltipTrigger>
      <TooltipContent>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
                </label>
              </div>
             
            </div>
          );
        }