import { Route, Routes } from "react-router-dom"
import PersonalInfoFile from "./Personal Information/PersonalInfoFile"
import SettingsSidebar from "./Sidebar/SettingsSidebar"
import ContactInfoFile from "../Pages/ContactInfoFile"
import MainStaticsFile from "./Statitics/MainStaticsFile"
import SettingsNotification from "./Notification/SettingsNotification"

const MainSettingFile = () => {
  return (
    <div className="w-full flex  ">
      <SettingsSidebar/>
      <Routes>
<Route path="/" element={<PersonalInfoFile/>}/>
<Route path="/notifications" element={<SettingsNotification/>}/>
<Route path="/contact" element={<ContactInfoFile/>}/>
<Route path="/stats" element={<MainStaticsFile/>}/>
      </Routes>
    </div>
  )
}

export default MainSettingFile
