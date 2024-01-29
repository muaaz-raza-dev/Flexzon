import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../ReduxHooks";

import {  useNavigate } from "react-router-dom";
import { insertion } from "../Slices/LandingSlice";

export function LoginAskModal() {
  let dispatch = useAppDispatch();
  let Close = () => {
    dispatch(insertion({ ValidModal: false }));
  };
  let navigate = useNavigate()
  return (
    <div className="w-screen h-screen absolute z-[999] backdrop-blur-md center">
      <div
        className="flex fixed p-8 rounded-md center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
md:w-[40vw] max-md:w-[80vw]  bg-white z-[999] flex-col gap-y-6
"
      >
        <h1 className="text-center hFont text-2xl">Login to your account</h1>
        <p>Access your account to enjoy all our features </p>
        <div className="flex gap-x-2">
          <button
            className="p-2 primary rounded text-white px-5  active:scale-95 transition-transform"
       onClick={()=>{Close()
      navigate("/auth/login")
      }}
          >
            Login
          </button>
          <button
            className="p-2 primary rounded  text-white px-5 active:scale-95 transition-transform"
            onClick={()=>{Close()
            navigate("/auth/register")
            }}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

const CreditsGuard: FC<{ children: ReactNode }> = ({ children }) => {
  let Credits = useAppSelector((state) => state.credits);
  let navigate = useNavigate();
  useEffect(() => {
      if (!Credits.isLogined) {
        navigate("/auth/login");
      }
  }, [Credits]);
  if (Credits.isLogined) {
    return <main>{ children}</main>;
  }
};

export default CreditsGuard;
