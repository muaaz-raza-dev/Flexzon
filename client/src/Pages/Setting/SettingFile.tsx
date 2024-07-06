import { Route,  Routes } from "react-router-dom"
import MainSettingFile from "./Main Setting/MainSettingFile"

const SettingFile = () => {
  return (
    <Routes>
      <Route path="/settings/*" element={<MainSettingFile/>}/>
    </Routes>
  )
}

export default SettingFile
