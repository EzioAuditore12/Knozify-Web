import { 
    suggestUsernameAPI,
    type suggestUsernameProps,
} from "../services/suggestUsername";
import axios from "axios";
import {router} from "@/hooks/router-hook"

export async function suggestUsernames({first_name,last_name,birth_date}:suggestUsernameProps): Promise<{
  status: boolean;
  message?: string;
}> {
    try{    
    const response=await suggestUsernameAPI({first_name,last_name,birth_date})
    router.navigate({
      to:"/register/step4",
      mask:{
        to:"/register"
      }
    })
    return {status:true,message:response.suggested_user_name}
    }catch(error){
        console.log("Unable to suggest usernames",error)
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