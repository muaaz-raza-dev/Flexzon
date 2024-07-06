import TopicDialog from "./TopicDialog"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { AuthInsertion } from "@/app/Slices/AuthSlice";
import { ChangeEvent } from "react";
import AvatarUpload from "./AvatarUpload";
import Username from "./Username";
import { Link } from "react-router-dom";



const RegisterFile = () => {
    let dispatch = useAppDispatch();
    let data=useAppSelector(state=>state.auth)
    function inputHandler(purpose:string,e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
          dispatch(AuthInsertion({purpose,[e.target.name]:e.target.value}))
     
    }
  return (
    <section  className="min-h-[94vh] flex items-stretch text-white  ">
    <div className="lg:flex w-1/2 hidden to-[var(--primary)] from-[var(--secondary)] bg-gradient-to-l  bg-no-repeat bg-cover relative items-center shadow-lg" >
        <div className="absolute inset-0 z-0 bg-black opacity-60"></div>
        <div className="z-10 w-full px-12">
            <h1 className="text-5xl font-bold tracking-wide text-left">Register into world of Flexzon</h1>
            <p className="my-4 text-sm">Step into the world of Flexzon, where every keystroke becomes a symphony of your thoughts. Register now and compose your digital narrative, turning moments into timeless stories on this captivating blogging platform.</p>
        </div>
        
    </div>
    <div className="lg:w-1/2 relative heroShadow overflow-hidden before:absolute before:top-0 before:start-[0%] before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1]    text-black w-full flex items-center justify-center text-center md:px-16 px-0 z-0" >
     
  
        <div className="z-20 w-full py-6 ">
 <h1 className="text-6xl hFont text-transparent bg-clip-text max-md:block md:hidden bg-gradient-to-r from-[var(--primary)]  to-purple-800 text-clip">Join Flexzon </h1>
          
          
            <form  className="sm:[75%] w-full px-2 lg:px-0 mx-auto" onSubmit={(e)=>e.preventDefault()}>
      <AvatarUpload/>
                <div className="pt-2 pb-2">
                    <input type="text" name="Name"  value={data.register.Name} 
                    onChange={(e)=>inputHandler("register",e)} id="email" placeholder="Full Name" className="block w-full p-4 text-lg rounded border-[var(--primary)] border-2 focus:border-black placeholder:text-gray-500 "/>
                </div>
           <Username/>
                <div className="pt-2 pb-2">
                    <input className="block w-full p-4 text-lg rounded border-[var(--primary)] border-2 focus:border-black placeholder:text-gray-500 " type="email" name="email" id="password" value={data.register.email} onChange={(e)=>inputHandler("register",e)} placeholder="Email"/>
                </div>
                <div className="pt-2 pb-2">
                    <input className="block w-full p-4 text-lg rounded border-[var(--primary)] border-2 focus:border-black placeholder:text-gray-500 " type="password" name="password" id="password" value={data.register.password} onChange={(e)=>inputHandler("register",e)}placeholder="Password  " />
                </div>
               

               
                <div className="text-right hover:underline hover:text-gray-100">
      
                </div>
                <div className="px-4 pt-4 pb-2">
                    <button className={`uppercase block w-full p-4 text-lg rounded-full bg-[var(--primary)]  text-white focus:outline-none transition ${
                        ( !data.register.Name||!data.register.email||!data.register.password||!data.register.username)?"grayscale bg-[gray]" :"hover:opacity-90"
                    }`} disabled={( !data.register.Name||!data.register.email||!data.register.password||!data.register.username)} >
<TopicDialog loading={false} title="Register"/>
                    </button>
                </div>

            </form>
                        <Link to={"/auth/login"} className="font-bold text-white underline">Sign in to your account </Link>
        </div>
    </div>
</section>
  )
}

export default RegisterFile
