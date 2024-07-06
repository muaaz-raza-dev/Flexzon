import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import {useState} from "react"
import { WriteInsertion } from "@/app/Slices/WriteSlice";
import {useEffect} from "react"
import {useDropzone} from 'react-dropzone';
const BannerUploadB = () => {
  const writeState =useAppSelector(state=>state.write)
const [ImageURI, setImageURI] = useState<{sample:string,blob?:Blob|null}>({sample:writeState.Banner});
const { getRootProps, getInputProps} = useDropzone({accept: {'image/*': ["png","jpeg","jpg"]} ,multiple:false , 
maxSize:1024*1024*1024*5,
onDrop(file) {
  if(file){
    setImageURI({sample:URL.createObjectURL(file[0]),blob:file[0]})
    dispatch(WriteInsertion({BannerBlob:file[0]}))
  }
},
});
useEffect(() => {
  if(localStorage.getItem("Banner_Post"))setImageURI({sample:localStorage.getItem("Banner_Post")||""})
}, []);
  let dispatch = useAppDispatch()
  return (
    <section className="flex flex-col items-center w-full gap-y-2">
        <div className="max-md:w-[90%] md:w-[75%] center ">
         

<div {...getRootProps({className: `dropzone rounded p-2 object-contain flex items-center justify-center h-[26rem] w-[58.5rem]
     ${ !ImageURI.sample&&" bg-[var(--primary)] text-white"} cursor-pointer  `})} >
        <input {...getInputProps()} />
    
            {
              !ImageURI.sample?
              "Upload your Banner"
              :
             <img src={ImageURI.sample} alt="" className="  object-cover h-full w-full"  />
            }
        </div>

        </div>
<div className="flex flex-col items-center  overflow-hidden max-md:w-full gap-y-2">
<div className="text-xs text-gray-500 font-bold">
Dimension 4:3 . File size must be less than 10 mb 
</div>
</div>

    </section>
  )
}

export default BannerUploadB
