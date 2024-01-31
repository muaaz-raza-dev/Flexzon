import { Route, Routes } from "react-router-dom"
import LoginFile from "./Login/LoginFile"
import RegisterFile from "./Register/RegisterFile"
import OTPFile from "./Login/OTPFile"

const AuthFile = () => {
  return (
        <Routes>
            <Route element={<LoginFile/>} path="/login" />
            <Route element={<RegisterFile/>} path="/register" />
            <Route element={<OTPFile/>} path="/Forgot" />
        </Routes>
  )
}
export default AuthFile
