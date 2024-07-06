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
import {useEffect, useState} from "react"
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
import InputInterests from "./InputInterests"
import { InitialCreditsState } from "@/app/middlewares/functions/InitialCreditsState"



const PersonalInfoFile = () => {
  let {Info} = useAppSelector(state=>state.credits)
const [ImageState, setImageState] = useState<{uri:string,blob?:any}>({uri:Info.avatar,});
  const [InputState, setInputState] = useState({
    Name:"",
    username:"",
    email:"",
    contact:{value:"",display:false},
    bio:"",
    website:{url:"",altText:""},
    Links:{fb:"",insta:"",linkedIn:""},
    gender:{value:"",display:false},
    dob:{value:"",display:false},
  });
  useEffect(() => {
    let payload ={Name:Info.Name,
      username:Info.username,
      email:Info.email,
      contact:Info.contact||{value:"",display:false},
      bio:Info.bio,
      website:Info.website||{url:"",altText:""},
      Links:Info.Links||{fb:"",insta:"",linkedIn:''},
      gender:Info.gender||{value:"",display:false},
      dob:Info.dob||{value:"",display:false},}
    setInputState(payload)
  }, [Info]);

  let dispatch = useAppDispatch()
  let {avatar} =Info
  const [loading, setloading] = useState(false)
  let {username,email,bio,Name,contact,dob,website,gender,Links}=InputState
  let {mutate,isLoading} =useMutation({mutationKey:"Save",mutationFn:()=>EditInfo({Name,username,bio,email,avatar,contact,dob,website,gender,Links,interests:Info.interests}) ,
onSuccess() {
  toast.success("Credentials updated")
  
},})
function ChangeHandler <T>({e,payload}:IchangeHandlerInput<T>){
  if (payload&&["gender","dob","website","Links","contact"].includes(payload.Header)) {
    setInputState({...InputState,[payload.Header]:payload.data})
  }
  else{
    if (e) {
      setInputState({...InputState,[e.target.name]:e.target.value})
    }
  }
}
  return (
    <div className="flex justify-center w-full  py-12 ">
        <div className="md:w-[90%] max-md:px-4 flex flex-col gap-y-8">
      <h1 className="text-3xl hFont"> Edit Profile</h1>
      <section className="flex flex-col gap-x-4">
    <div className="bg-gray-200   md:w-[85%] justify-between p-4 rounded flex gap-x-6 items-center ">
        <div className="flex items-center gap-x-2">

        <Avatar className="w-16 h-16 ">
            <AvatarImage src={ImageState.uri} className="object-cover bg-[var(--primary)] w-full h-full"/>
            </Avatar>
            <input type="file" hidden id="ImageUpload" onChange={(e)=>{
              if (e.target.files) {
               let ImageURI =URL.createObjectURL(e.target.files[0])
               setImageState({uri:ImageURI,blob:e.target.files[0]})
              }
            }}/>
            <input onChange={(e)=>ChangeHandler({e})} className="p-1 font-bold bg-transparent border-black outline-none md:text-xl max-md:text-sm focus:border-b "  name="Name" defaultValue={Info.Name}/>
        </div>
        <div className="flex gap-x-1">

          <Button  className="bg-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white text-white">
               <label htmlFor="ImageUpload" className="w-full h-full cursor-pointer">
                 Change Photo
                </label>
  </Button>
        {
          ImageState.uri!=Info.avatar&&
          <Button  disabled={loading} className="bg-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white text-white" onClick={()=>
            {setloading(true)
              UploadImage(ImageState.blob).then(data=>{
          dispatch(CreditsInsertion({avatar:data.url})) 
          setImageState({uri:data.url,blob:""})
        }
      ).finally(()=>{
        setloading(false)
        mutate()
      })
    }
          }>
            {loading? <LightLoader/>:
         "Upload Photo"
            }
</Button>
            }
            </div>
    </div>
      </section>

      <section className="flex flex-col gap-x-4 ">
        <label htmlFor="email" className="py-2 text-xl hFont" >Username </label>
        <div className="md:w-[80%]  flex  flex-col gap-y0.5 justify-center">
<Input onChange={(e)=>ChangeHandler({e})} type="text" id="email" className="border focus-visible:ring-0 focus-visible:border-black" name="username" placeholder="username" defaultValue={Info.username}/>
        </div>
      </section>
{/* //!Email */}
      <section className="flex flex-col gap-x-4 ">
        <label htmlFor="email" className="py-2 text-xl hFont" >Email</label>
        <div className="md:w-[80%]  flex  flex-col gap-y0.5 justify-center">
<Input onChange={(e)=>ChangeHandler({e})} type="email" id="email" className="border focus-visible:ring-0 focus-visible:border-black" name="email" placeholder="Email" defaultValue={Info.email}/>
        </div>
      </section>

{/* //!Contact */}
<ContactNumberDetails ChangeHandler={ChangeHandler}/>
{/* //!Gender */}
<GenderDetails ChangeHandler={ChangeHandler}/>
<WebsiteDetails ChangeHandler={ChangeHandler}/>
<SocialMediaDetails ChangeHandler={ChangeHandler}/>
<InputInterests/>

{/* //! Bio */}
      <section className="flex flex-col gap-x-4 ">
        <label htmlFor="email"  className="py-2 text-xl hFont" >About</label>
        <div className="md:w-[80%]  flex  flex-col gap-y0.5 justify-center">
<Textarea placeholder="write about you" name="bio" className="border focus-visible:ring-0 focus-visible:border-black" defaultValue={Info.bio} onChange={(e)=>ChangeHandler({e})}/>
        </div>
      </section>

      <Button className={`w-[20%]  text-md  bg-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white text-white
         ${" grayscale-0"} `} variant={"outline"}   onClick={()=>mutate()}>
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
    <div className="flex justify-between p-2 border text-start max-md:flex-col gap-y-2 md:items-center">
    <div className="flex flex-col gap-y-1">
<button className="flex items-center text-xl font-semibold text-red-500 gap-x-1">
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
      dispatch(CreditsInsertion({isLogined:false,Info: InitialCreditsState}))
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
      <Button className="text-white hover:text-white" variant={"destructive"}>Delete account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete your account</DialogTitle>
          <DialogDescription>
          Permanently delete your account will also erase all of your content. This action is unrecoverable , Are you sure!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 gap-y-2">
          
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
