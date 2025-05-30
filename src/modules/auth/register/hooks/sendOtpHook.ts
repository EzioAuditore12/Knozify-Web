import { sendOTPApi, type sendOTPApiPros } from "../services/sendOTP";
import { router } from "@/hooks/router-hook";
import axios from "axios";

export async function handleSendingOTP ({ phone_no }: sendOTPApiPros){
    try {
      const response = await sendOTPApi({ phone_no });
      router.navigate({
        to: "/register/step2",
        params:response.time_left_seconds,
        mask: {
          to: "/register"
        }
      });
      return { status: true, timeLeft: response.time_left_seconds };
    } catch (error) {
      console.log("Send OTP error", error);
      let errorMessage = 'Something went wrong!';
      
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.detail || errorMessage;
      }
      
      return { 
        status: false,
        message: errorMessage
      };
    }
  };

