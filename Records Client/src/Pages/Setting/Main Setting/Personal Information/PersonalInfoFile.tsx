import { LightLoader } from "@/Essentials/Loader"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {useState} from "react"
import EditInfo from "@/Queryfunctions/Auth/EditInfo"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { CreditsInsertion } from "@/app/Slices/CredentialSlice"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Trash } from "lucide-react"
import { toast } from "react-hot-toast"
import { useMutation } from "react-query"
import UploadImage from "@/app/middlewares/functions/ImageUploader"

import DeleteAccount from "@/Queryfunctions/Auth/verifyPassword"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import ContactNumberDetails, { GenderDetails, IchangeHandlerInput, SocialMediaDetails, WebsiteDetails } from "./InputDetails"



const PersonalInfoFile = () => {
  let {Info} = useAppSelector(state=>state.credits)
  const [InputState, setInputState] = useState({
    Name:"",
    username:"",
    email:"",
    contact:{value:"",display:false},
    bio:"",
    website:{url:"",altText:""},
    Links:[],
    gender:{value:"",display:false},
    dob:{value:"",display:false},
  });
const [ImageState, setImageState] = useState<{uri:string,blob?:any}>({uri:"",});
  let dispatch = useAppDispatch()
  let {username,email,bio,avatar,Name}=Info
  let {mutate,isLoading} =useMutation({mutationKey:"Save",mutationFn:()=>EditInfo({Name,username,bio,email,avatar}) ,
onSuccess() {
  toast.success("Credentials updated")
},})
function ChangeHandler <T>({e,payload}:IchangeHandlerInput<T>){
  if (payload&&["gender","dob","webiste"].includes(payload.Header)) {
    setInputState({...InputState,[payload.Header]:payload.data})
  }
  else{
    if (e) {
      setInputState({...InputState,[e.target.name]:e.target.value})
    }
    // dispatch(CreditsInsertion({[e.target.name]:e.target.value}))
  }
}
  return (
    <div className=" w-full py-12 flex justify-center ">
        <div className="md:w-[90%] flex flex-col gap-y-8">

      <h1 className="text-3xl hFont"> Edit Profile</h1>
      <section className="">
    <div className="bg-gray-200   md:w-[85%] justify-between p-4 rounded flex gap-x-6 items-center ">
        <div className="flex gap-x-2 items-center">

        <Avatar className=" w-16 h-16">
            <AvatarImage src={ImageState.uri||avatar} className=" object-fill w-full "/>
            </Avatar>
            <input type="file" hidden id="ImageUpload" onChange={(e)=>{
              if (e.target.files) {
               let ImageURI =URL.createObjectURL(e.target.files[0])
               setImageState({uri:ImageURI,blob:e.target.files[0]})
              }
            }}/>
            <input onChange={(e)=>ChangeHandler({e})} className="md:text-xl max-md:text-sm border-black bg-transparent p-1 focus:border-b  outline-none "  name="Name" defaultValue={Name}/>
        </div>
        <div className="flex gap-x-1">

          <Button  className="bg-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white text-white">
               <label htmlFor="ImageUpload" className="w-full h-full cursor-pointer">
                 Change Photo
                </label>
  </Button>
        {
          ImageState.uri&&
          <Button  className="bg-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white text-white" onClick={()=>UploadImage(ImageState.blob).then(data=>{
          dispatch(CreditsInsertion({avatar:data.url})) 
          setImageState({uri:"",blob:""})}
          )}>

         Upload Photo
  
</Button>
            }
            </div>
    </div>
      </section>

      <section className="flex gap-x-4 flex-col ">
        <label htmlFor="email" className="hFont text-xl py-2" >Username </label>
        <div className="md:w-[80%]  flex  flex-col gap-y0.5 justify-center">
<Input onChange={(e)=>ChangeHandler({e})} type="text" id="email" className=" focus-visible:ring-0 focus-visible:border-black border" name="username" placeholder="username" defaultValue={username}/>
        </div>
      </section>
{/* //!Email */}
      <section className="flex gap-x-4 flex-col ">
        <label htmlFor="email" className="hFont text-xl py-2" >Email</label>
        <div className="md:w-[80%]  flex  flex-col gap-y0.5 justify-center">
<Input onChange={(e)=>ChangeHandler({e})} type="email" id="email" className=" focus-visible:ring-0 focus-visible:border-black border" name="email" placeholder="Email" defaultValue={email}/>
  <p className="text-xs  text-gray-500 tracking-tighter">This won't visible on your profile</p>
        </div>
      </section>

{/* //!Contact */}
<ContactNumberDetails ChangeHandler={ChangeHandler}/>
{/* //!Gender*/}
<GenderDetails ChangeHandler={ChangeHandler}/>
<WebsiteDetails ChangeHandler={ChangeHandler}/>
<SocialMediaDetails ChangeHandler={ChangeHandler}/>
{/* //! Bio */}
      <section className="flex gap-x-4 flex-col ">
        <label htmlFor="email"  className="hFont text-xl py-2" >About</label>
        <div className="md:w-[80%]  flex  flex-col gap-y0.5 justify-center">
<Textarea placeholder="write about you" name="bio" className=" focus-visible:ring-0 focus-visible:border-black border" defaultValue={bio} onChange={(e)=>ChangeHandler({e})}/>
        </div>
      </section>


      <Button className="w-[20%]  text-md  bg-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white text-white" variant={"outline"} onClick={()=>mutate()}>
{isLoading?<LightLoader/>:"Save"}
  </Button>
  <Separator/>

<DeleleProfileBlock/>
      
        </div>
    </div>
  )
}

let DeleleProfileBlock= ()=>{
  return(
    <div className="border text-start max-md:flex-col p-2 gap-y-2 md:items-center flex justify-between">
    <div className="flex flex-col gap-y-1">
<button className="flex gap-x-1 items-center font-semibold   text-xl text-red-500">
<Trash size={20}/>
Delete account

</button>
<p className="text-sm tracking-tight">
Permanently delete your account will also erase all of your content.
</p> 
</div>
<DeleteDialog/>
</div>

  )
}

let DeleteDialog = ()=>{
  const [Password, setPassword] = useState("");
  let navigate= useNavigate()
  let dispatch = useAppDispatch()
  let {isLoading,mutate} =useMutation({mutationKey:"verifyPassword", mutationFn:()=>DeleteAccount(Password) ,
  onSuccess(data) {
    if (data.success===true) {
      
      navigate("/")
      Cookies.remove("Records_session")
      dispatch(CreditsInsertion({isLogined:false,Info: {
        _id:"",
      username:"",
      avatar:"",
      email:"",
      Name:"",
      bio:"",
      followers:[],
      following:[],
      Posts:[],
      saved:[],
      liked:[],
      anonymous:[],
      interests:[],
      registeredDate:"",
    }}))
    }
    else{
      toast.error("Invalid Password entered .")
    }
}, 
} )
  return (
  <>
  <Dialog>
      <DialogTrigger asChild>
      <Button className=" hover:text-white  text-white" variant={"destructive"}>Delete account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete your account</DialogTitle>
          <DialogDescription>
          Permanently delete your account will also erase all of your content. This action is unrecoverable , Are you sure!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2  gap-4">
          
            <Input id="username" value={Password} onChange={(e)=>setPassword(e.target.value)} className="col-span-3" placeholder="Enter your password"/>
          </div>
        <DialogFooter>
          <DialogTrigger>
          <Button variant={"default"} className="primary hover:bg-[var(--primary)]">Cancel</Button>
          </DialogTrigger>
          <Button variant={"destructive"} onClick={()=>mutate()}>{isLoading?<LightLoader/>:"Delete account"} </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}
export default PersonalInfoFile
