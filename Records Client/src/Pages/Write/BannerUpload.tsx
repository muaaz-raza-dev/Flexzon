import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { FileUploader } from "react-drag-drop-files"
import {useState,useRef} from "react"
import { WriteInsertion } from "@/app/Slices/WriteSlice";
import {useEffect} from "react"
const BannerUploadB = () => {
  const writeState =useAppSelector(state=>state.write)
const [ImageURI, setImageURI] = useState<{sample:string,blob?:Blob|null}>({sample:writeState.Banner});
useEffect(() => {
  if(localStorage.getItem("Banner_Post"))setImageURI({sample:localStorage.getItem("Banner_Post")||""})
}, []);
let fileRef =useRef()
  let dispatch = useAppDispatch()
  return (
    <section className="flex flex-col items-center w-full gap-y-4">
        <div className="max-md:w-[90%] md:w-[75%] center ">
          {
            ImageURI.sample &&
          <div className="max-w-lg max-h-96 ">

<div className={`${!ImageURI.sample&&"bg-gray-500"} aspect-w-4  aspect-h-3 rounded p-2 object-contain flex items-center justify-center text-white  `}>
            {
              !ImageURI.sample?
              " Your Banner will be showing here."
              :
             ["mp3","mp4"].includes(ImageURI?.blob?.type.split("/")[1]||"") ?
             <video src={ImageURI.sample} autoPlay controls loop/>:
             <img src={ImageURI.sample} alt="" className="w-full h-full"  />
            }
        </div>
        </div>
}
        </div>
<div className="flex flex-col items-center p-2 overflow-hidden max-md:w-full gap-y-2">
<div className="text-xs text-gray-500 font-bold">
Dimension 4:3 . File size must be less than 10 mb 
</div>
<FileUploader className={"!w-[34px] !h-4"}  multiple={false} ref={fileRef} label="Upload your post banner"  file={true} handleChange={(file:Blob)=>{
  setImageURI({sample:URL.createObjectURL(file),blob:file})
  dispatch(WriteInsertion({BannerBlob:file}))
  
}} types={["PNG","JPG","JPEG"]} maxSize={10485760}  />
</div>

    </section>
  )
}

export default BannerUploadB
