import { Route, Routes } from "react-router-dom"
import LoginFile from "./Login/LoginFile"
import RegisterFile from "./Register/RegisterFile"

const AuthFile = () => {
  return (
        <Routes>
            <Route element={<LoginFile/>} path="/login" />
            <Route element={<RegisterFile/>} path="/register" />
        </Routes>
  )
}
export default AuthFile
