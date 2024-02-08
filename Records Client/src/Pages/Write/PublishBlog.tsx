import {  useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { LightLoader } from "@/Essentials/Loader";
import useUploadPost from "./Hooks/useUploadPost";
import UploadImage from "@/app/middlewares/functions/ImageUploader";
import { WriteInsertion } from "@/app/Slices/WriteSlice";
const PublishBlog = () => {
  let writeState = useAppSelector((state) => state.write);
  let dispatch=useAppDispatch()
  let { mainContent, title,  Banner, topic } = writeState;
  let {mutate,isLoading}=useUploadPost()
  let DialogRef = useRef<any>(null);
  const [Loading, setLoading] = useState<Boolean>(false);
  let validateInputs = () => {
    if (mainContent.length == 0 || title.length == 0 || topic.length == 0) {
      toast.error("Main Content, Title and Topic can't be empty ");
    }
      else 
       {
        if (Banner.length==0) {
          setLoading(true)
          writeState.BannerBlob&&UploadImage(writeState?.BannerBlob).then(data=>{ 
            dispatch(WriteInsertion({Banner:data.url}))
            DialogRef?.current?.click();
          })
          .catch(()=>{
            toast.error("Something went wrong try again later!")
          }).finally(()=>{setLoading(false)})}
          else{
            DialogRef?.current?.click();
          }
        }
  };

  return (
    <>
          <Button
            onClick={validateInputs}
            className="bg-[var(--primary)] hover:bg-[var(--primary)] active:scale-95 transition-colors"
          >
            {Loading?<LightLoader/>:
            "Publish"
            }
          </Button>
      <Dialog>
        <DialogTrigger className="w-full" ref={DialogRef}>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>sumbit your post </DialogTitle>
            <DialogDescription>
              <div className={`flex flex-wrap w-full my-4 items-center gap-3 ${writeState.FollowerOnly&&"grayscale  cursor-default "} `}>
                <button
                  disabled={writeState.FollowerOnly}
                  onClick={()=>{
                    mutate(true)
                   }}
                  className={` block w-full p-1 text-lg rounded-full bg-[var(--primary)] hover:bg-[black] text-white transition-colors focus:outline-none ${writeState.FollowerOnly&&"grayscale  cursor-not-allowed "} `}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger >{!isLoading?"👽 Post Anonymously":<LightLoader/>} 
                      </TooltipTrigger>
                      <TooltipContent className="" >
                        <p>
                          It will hide all of your user information, not reaveal
                          the yours ID
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </button>
              </div>
              <button
                onClick={() =>{
                mutate(false)

               
                }}
                className=" block w-full p-1 text-lg rounded-full bg-[var(--primary)] hover:bg-[black] text-white transition-colors focus:outline-none"
              >
                {isLoading?<LightLoader/>:"Post normally"}
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default PublishBlog;
