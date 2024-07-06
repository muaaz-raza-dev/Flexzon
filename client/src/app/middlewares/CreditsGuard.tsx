import { FC, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../ReduxHooks";

import { Navigate, useNavigate } from "react-router-dom";
import { insertion } from "../Slices/LandingSlice";

export function LoginAskModal() {
  let dispatch = useAppDispatch();
  let Close = () => {
    dispatch(insertion({ ValidModal: false }));
  };
  let navigate = useNavigate();
  return (
    <div className="w-screen h-screen fixed top-0 z-[999] backdrop-blur-md center">
      <div
        className="flex fixed p-8 rounded-md center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
md:w-[40vw] max-md:w-[80vw]  bg-white z-[999]  flex-col gap-y-6"
      >
        <h1 className="text-2xl text-center hFont">Login to your account</h1>
        <p>Access your account to enjoy all our features </p>
        <div className="flex gap-x-2">
          <button
            className="p-2 px-5 text-white transition-transform rounded primary active:scale-95"
            onClick={() => {
              Close();
              navigate("/auth/login");
            }}
          >
            Login
          </button>
          <button
            className="p-2 px-5 text-white transition-transform rounded primary active:scale-95"
            onClick={() => {
              Close();
              navigate("/auth/register");
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

  if (Credits.isLogined) {
    return <main>{children}</main>;
  }
  else{
   return <Navigate to={"/auth/login"}/>
  }
};

export const CreditsValidatorComp: FC<{ children: ReactNode }> = ({ children }) => {
  let Credits = useAppSelector((state) => state.credits);
  if (Credits.isLogined) {
    return <main>{children}</main>;
  }
  else{return <LoginAskModal/>}
};
export default CreditsGuard;
