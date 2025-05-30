import { checkUsernameAPI,type checkUsernameProps } from "../services/checkUsername";
import { router } from "@/hooks/router-hook";
import axios from "axios";


export async function checkUsernameHook({username}:checkUsernameProps){
    try{    
    const response=await checkUsernameAPI({username})
            router.navigate({
                to:"/register/step5",
                mask:{
                    to:"/register"
                }
            })
            return {status:true,message: response.available_to_use ? "Username is available" : "Username is not available" }
    }catch(error){
        console.log("Unable to assign username",error)
        let errorMessage = 'Something went wrong!';
            
            if (axios.isAxiosError(error) && error.response) {
              errorMessage = error.response.data?.detail || errorMessage;
            }
            
            return { 
              status: false,
              message: errorMessage
        };
    }
    }