import TopicDialog from "./TopicDialog"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { AuthInsertion } from "@/app/Slices/AuthSlice";
import { ChangeEvent } from "react";
import AvatarUpload from "./AvatarUpload";
import Username from "./Username";



const RegisterFile = () => {
    let dispatch = useAppDispatch();
    let data=useAppSelector(state=>state.auth)
    function inputHandler(purpose:string,e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
          dispatch(AuthInsertion({purpose,[e.target.name]:e.target.value}))
     
    }
  return (
    <section  className="min-h-[94vh] flex items-stretch text-white ">
    <div className="lg:flex w-1/2 hidden to-[var(--primary)] from-[var(--secondary)] bg-gradient-to-l  bg-no-repeat bg-cover relative items-center shadow-lg" >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-12 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">Step into world of Records</h1>
            <p className="text-sm my-4">Step into the world of Records, where every keystroke becomes a symphony of your thoughts. Register now and compose your digital narrative, turning moments into timeless stories on this captivating blogging platform.</p>
        </div>
        
    </div>
    <div className="lg:w-1/2 bg-[var(--bg)] text-black w-full flex items-center justify-center text-center md:px-16 px-0 z-0" >
     
        <div className="w-full py-6 z-20">
            <h1 className="my-6 text-4xl hFont">
            Register to Blogger
            </h1>
          
            <form  className="sm:[75%] w-full px-2 lg:px-0 mx-auto" onSubmit={(e)=>e.preventDefault()}>
      <AvatarUpload/>
                <div className="pb-2 pt-2">
                    <input type="text" name="Name"  value={data.register.Name} 
                    onChange={(e)=>inputHandler("register",e)} id="email" placeholder="Full Name" className="block w-full p-4 text-lg rounded border-[var(--secondary)] border-2 focus:border-black placeholder:text-gray-500 "/>
                </div>
           <Username/>
                <div className="pb-2 pt-2">
                    <input className="block w-full p-4 text-lg rounded border-[var(--secondary)] border-2 focus:border-black placeholder:text-gray-500 " type="email" name="email" id="password" value={data.register.email} onChange={(e)=>inputHandler("register",e)} placeholder="Email"/>
                </div>
                <div className="pb-2 pt-2">
                    <input className="block w-full p-4 text-lg rounded border-[var(--secondary)] border-2 focus:border-black placeholder:text-gray-500 " type="password" name="password" id="password" value={data.register.password} onChange={(e)=>inputHandler("register",e)}placeholder="Password  " />
                </div>
               

                <div className="pb-2 pt-2">
                    <textarea value={data.register.bio}  onChange={(e)=>inputHandler("register",e)}  className="block w-full p-4 text-lg rounded border-[var(--secondary)] border-2 resize-none focus:border-black placeholder:text-gray-500 "  name="bio" rows={5} id="password" placeholder="Write your profile description" />
                </div>
                <div className="text-right hover:underline hover:text-gray-100">
      
                </div>
                <div className="px-4 pb-2 pt-4">
                    <button className={`uppercase block w-full p-4 text-lg rounded-full bg-[var(--primary)]  text-white transition-colors focus:outline-none ${
                      ( !data.register.Name||!data.register.avatar||!data.register.bio||!data.register.email||!data.register.password||!data.register.username)?"grayscale bg-[gray]" :"hover:bg-[black]"
                    }`} disabled={( !data.register.Name||!data.register.avatar||!data.register.bio||!data.register.email||!data.register.password||!data.register.username)} >
<TopicDialog loading={false} title="Register"/>
                    </button>
                </div>

            </form>
        </div>
    </div>
</section>
  )
}

export default RegisterFile
