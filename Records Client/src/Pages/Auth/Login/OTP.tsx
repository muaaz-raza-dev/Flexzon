import { FC, memo, useEffect, useState } from "react";
import OTPInput from "react-otp-input"

const OTP:FC<{InputHandler:(purpose:"email"|"newPassword"|"otp",e:string)=>void}> = ({InputHandler}) => {
    const [otp, setOtp] = useState("");
    useEffect(() => {
        InputHandler("otp",otp)
    }, [otp]);
  return (
    <div className="w-full ">
  
          <OTPInput
      value={otp}
      onChange={(e)=>setOtp(e)}
      numInputs={4}
      renderSeparator={<span>-</span>}
      containerStyle={"w-full justify-between flex  border-2 p-2"}
      inputType="number"
      renderInput={(props) => <input {...props} placeholder="X" className="p-2 py-6 !w-[22%] border border-black text-2xl" />}
    />
    </div>
  )
}

export default memo(OTP)
