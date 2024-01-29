import { Route, Routes } from "react-router-dom"
import PersonalInfoFile from "./Personal Information/PersonalInfoFile"
import SettingsSidebar from "./Sidebar/SettingsSidebar"
import ContactInfoFile from "../Pages/ContactInfoFile"

const MainSettingFile = () => {
  return (
    <div className="w-full flex gap-x-8 ">
      <SettingsSidebar/>
      <Routes>
<Route path="/" element={<PersonalInfoFile/>}/>
<Route path="/contact" element={<ContactInfoFile/>}/>
      </Routes>
    </div>
  )
}

export default MainSettingFile
