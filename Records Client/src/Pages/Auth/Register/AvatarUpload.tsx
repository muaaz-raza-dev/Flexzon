import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { AuthInsertion } from "@/app/Slices/AuthSlice";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { LegacyRef, useRef, useState } from "react"
interface IfileType{
uri:string;
file?:Blob;
loading?:boolean;
}
const AvatarUpload = () => {
    let data=useAppSelector(state=>state.auth)
    const [File, setFile] = useState<IfileType>({uri:data.register.avatar||"",loading:false})
    let dispatch = useAppDispatch()
    let ref:LegacyRef<HTMLInputElement> = useRef(null)
  return (
      <div className={`pb-2 pt-4  w-full p-2 px-6 text-lg rounded border-[var(--primary)] center  focus:border-black flex items-center justify-between ${File.loading===true&&"animate-pulse"}`}>
        <div className=" relative">

                <Avatar onClick={()=>ref.current?.click()}  className="w-28 h-28 aspect-sqaure text-xs bg-gray-200 flex items-center justify-center text-white object-contain tracking-tighter border-gray-100 border-2 ">
                    <AvatarImage src={File.uri||"/images/anonymous.png"} className=" object-cover"  />
                    {/* <p>Profile picture</p> */}
                    </Avatar>
                    <label htmlFor="avatar" className="absolute cursor-pointer bottom-0 right-0 bg-[var(--primary)] text-white rounded-full w-6 h-6 flex items-center justify-center">
    +
  </label>
        </div>
                    {/* <div className="flex gap-x-3">
      { 
                data.register.avatar==""?      <label htmlFor="avatar"     className=" cursor-pointer text-green-500  font-bold">
            {
                File.uri==""?"Select Image":"Change"}
            </label> : <p>{data.register.username&& `@${data.register.username}`}</p> }
          
                    </div> */}
                    <input ref={ref} type="file" multiple={false} onChange={(e)=>{
                        if (e?.target?.files) {
                            
                            let imageURl= URL.createObjectURL(e.target.files[0])
                            dispatch(AuthInsertion({purpose:"register",avatarBlob:e.target.files[0]}))
                            setFile({uri:imageURl})
                        }
                    }} size={1000} accept="image/*"  name="email" id="avatar" hidden placeholder="Full Name" className=" w-full p-4 text-lg rounded border-[var(--secondary)] border-2 focus:border-black hidden"/>
                </div>    
  )
}

export default AvatarUpload
