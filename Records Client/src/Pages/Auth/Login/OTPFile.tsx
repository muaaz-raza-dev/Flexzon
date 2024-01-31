import { LightLoader } from "@/Essentials/Loader"
import {  useAppSelector } from "@/app/ReduxHooks"
import OTP from "./OTP";
import { useState } from "react";
import useOtpRequest from "./hooks/useOtpRequest";
import useOtpVerify from "./hooks/useOtpVerify";

const OTPFile = () => {
  const [Inputs, setInputs] = useState({email:"",newPassword:"",otp:""});
  let credits = useAppSelector(state=>state.credits);
  let ReqOTP =useOtpRequest(Inputs)
  let VerifyOTP = useOtpVerify(Inputs)
    const InputHandler= (purpose:"email"|"newPassword"|"otp",e:string)=>{
      setInputs({...Inputs,[purpose]:e})
    }
    const FormHandler= ()=>{
      if (!credits.OTPRequest) {
        ReqOTP.mutate()
      }
      else{
VerifyOTP.mutate()
      }
    }
  return (
    <section className="min-h-[94vh] flex items-stretch text-white ">
    <div className="w-full bg-[var(--bg)] text-black  flex items-center justify-center text-center md:px-16 px-0 z-0">
      <div className="w-full py-6 z-20">
        <h1 className="my-6 text-4xl hFont">OTP Request</h1>
        <form onSubmit={(e)=>{
          e.preventDefault()
          FormHandler()
        }} className="sm:w-[75%] w-full px-4 lg:px-0 mx-auto">
          <div className="">
     
          {
            credits.OTPRequest?
            <>
            <OTP InputHandler={InputHandler}/>
          <div className="pb-2 pt-4">
            <input
              className="block w-full p-4 text-lg rounded border-[var(--secondary)] border-2 focus:border-black"
              onChange={(e)=>InputHandler("newPassword",e.target.value)}
           value={Inputs.newPassword}
              type="password"
              name="password"
              id="password"
              placeholder="New Password"
              disabled={!credits.OTPRequest}
            />
          </div> 
          </>:
               <div className="pb-2 pt-4">
               <input
               onChange={(e)=>InputHandler("email",e.target.value)}
                 value={Inputs.email}
                 type="email"
                 name="username"
                 id="email"
                 placeholder="Enter your email"
                 className="block w-full p-4 text-lg rounded border-[var(--secondary)] border-2 focus:border-black"
               />
             </div>
          }
            </div>


          <div className="px-4 pb-2 pt-4">
            <button className="uppercase block w-full p-4 text-lg rounded-full bg-[var(--primary)] hover:bg-[black] text-white transition-colors focus:outline-none">
          {
         (ReqOTP.isLoading||VerifyOTP.isLoading) ?
          <LightLoader/>
          :    "Confirm"
          }
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
  )
}

export default OTPFile
