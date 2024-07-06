import { InitialCreditsState } from '@/app/middlewares/functions/InitialCreditsState';
import { CreditsInsertion } from '@/app/Slices/CredentialSlice';
import Cookies from 'js-cookie'; // Assuming you are using js-cookie library
import { useDispatch } from 'react-redux'; // Assuming you are using Redux for state management

const useLogout =  () => {
    const dispatch = useDispatch();
const logout = async()=>{
        try {
            // Remove session cookie
            Cookies.remove("Records_session");
            // Dispatch action to update state (Redux example)
  dispatch(CreditsInsertion({ isLogined: false, Info: InitialCreditsState }));
  location.pathname = "/"
            // Navigate to the homepage or any other desired route
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle error if dispatch or cookie removal fails
        }
    }
    return logout;
};


export default useLogout