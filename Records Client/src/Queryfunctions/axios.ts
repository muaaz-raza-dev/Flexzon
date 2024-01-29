import axios from "axios";

 let Axios =axios.create({
    baseURL:import.meta.env.VITE_APP_CLOUD,
    
 })
 export default Axios