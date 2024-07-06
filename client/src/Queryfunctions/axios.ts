import axios from "axios";

 let Axios =axios.create({
    baseURL:import.meta.env.VITE_APP_CLOUD || "http://localhost:8000/api",
 })
 
 export default Axios