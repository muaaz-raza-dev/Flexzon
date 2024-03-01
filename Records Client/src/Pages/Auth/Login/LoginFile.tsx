import  { LightLoader } from "@/Essentials/Loader";
import Login from "@/Queryfunctions/Auth/Login";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { AuthInsertion } from "@/app/Slices/AuthSlice";
import { Credits, CreditsInsertion } from "@/app/Slices/CredentialSlice";
import { insertion } from "@/app/Slices/LandingSlice";
import Cookies from "js-cookie";
import { ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";


const LoginFile = () => {
  let dispatch = useAppDispatch();
  let dataAuth=useAppSelector(state=>state.auth)
  let navigate= useNavigate()
  let {mutate,isLoading}= useMutation({mutationKey:"Login",mutationFn:()=>Login(dataAuth.login),onSuccess:(data)=>{
 if (data.success===true) {
        toast.success("Logined to your account")
        Cookies.set("Records_session",data.token,{expires: new Date(Date.now() + 2.628e9)})
        dispatch(CreditsInsertion({isLogined:true,Info:{...Credits.Info,...data.payload}}))
        dispatch(insertion({tabs:data.payload.interests}))
        navigate("/")
      }
      else{
        toast.error(data.msg)
      }
  } ,onError(){
    toast.error("Invalid credentials")
  }})
function inputHandler(purpose:string,e:ChangeEvent<HTMLInputElement>) {
        dispatch(AuthInsertion({purpose,[e.target.name]:e.target.value}))
  }

  return (
    <section className="min-h-[94vh] flex items-stretch text-white ">
      <div className="lg:flex w-1/2 hidden to-[var(--primary)] from-[var(--secondary)] bg-gradient-to-t  bg-no-repeat bg-cover relative items-center shadow-lg">
        <div className="absolute inset-0 z-0 bg-black opacity-60"></div>
        <div className="z-10 w-full px-12">
          <h1 className="text-5xl font-bold tracking-wide text-left">
            Keep it special
          </h1>
          <p className="my-4 text-sm">
            Unlock the power of words and let your thoughts take flight. Welcome
            to our blogging community, where every login is a step towards
            sharing your story with the world. Embrace the journey of
            self-expression and connect through the art of words on our platform
          </p>
        </div>
      </div>
      <div className="lg:w-1/2 l relative heroShadow overflow-hidden before:absolute before:top-0 before:start-[0%] before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1]    text-black w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-[var(--bg)] ">
      
        <div className="z-20 w-full py-6">
          <h1 className="text-5xl hFont text-transparent bg-clip-text my-4 bg-gradient-to-r from-[var(--primary)]  to-purple-700 text-clip">Login to Flexzon</h1>

          <form onSubmit={(e)=>{
            e.preventDefault()
          mutate()
          }} className="sm:w-[75%] w-full px-4 lg:px-0 mx-auto">
            <div className="">
            <div className="pt-4 pb-2">
              <input
              value={dataAuth.login.username}
                type="text"
                name="username"
                onChange={(e) => inputHandler("login",e)}
                id="email"
                placeholder="username or email"
                className="block w-full p-4 text-lg rounded border-[var(--secondary)] border-2 focus:border-black "
              />
            </div>
            <div className="pt-4 pb-2">
              <input
                className="block w-full p-4 text-lg rounded border-[var(--secondary)] border-2 focus:border-black "
                onChange={(e) =>
                  inputHandler("login",e)
                }
                value={dataAuth.login.password}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-between w-full text-right">
              <Link to={"/auth/register"} className="underline">Create new account</Link>
              <Link to={"/auth/Forgot"} className="cursor-pointer">Forgot password?</Link>
              </div>
              </div>


            <div className="px-4 pt-4 pb-2">
              <button className="uppercase block w-full p-4 text-lg rounded-full bg-[var(--primary)] hover:bg-[black] text-white transition-colors focus:outline-none">
            {
            isLoading?
            <LightLoader/>
            :    "Login"
            }
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default LoginFile;
