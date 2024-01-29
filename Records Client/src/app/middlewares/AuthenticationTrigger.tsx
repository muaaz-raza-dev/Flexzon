import React, { FC } from "react"
import { useAppSelector } from "../ReduxHooks"
import { useNavigate } from "react-router-dom"
interface Iparent {
  children:React.ReactNode
}
const AuthenticationComponent:FC<Iparent> = ({children}) => {
  let data = useAppSelector(state=>state.credits)
  let navigate =useNavigate()
  if (data.isLogined) {
 return (
      <div>
      {children}
    </div>
  )
}
else{
navigate("/auth/login")
}
}

export default AuthenticationComponent
