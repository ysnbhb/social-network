import { API_URL } from "@/components/api";
import { useEffect, useState } from "react";
  export default async  function useEditProfile(data  ) {
    
        try {
            const response = await fetch(`${API_URL}/api/profile/edit`, {
              method: "PUT",
              credentials: "include",
              body:JSON.stringify(data),
            });
            const data_Response = await response.json();
            if (!response.ok) {
             return data_Response
            } 
          } catch (error) {
            console.log("Error during fetch:", error);
          }
   
    return null
}
