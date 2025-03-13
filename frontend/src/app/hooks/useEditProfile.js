import { API_URL } from "@/components/api";
  export default function useEditProfile(data  ) {
  console.log(data);
  
     const update=async ()=>{
        try {
            const response = await fetch(`${API_URL}/api/profile/edit`, {
              method: "PUT",
              credentials: "include",
              body:JSON.stringify(data),
            });
            const data_Response = await response.json();
            if (response.ok) {
                setNewData(data_Response)
            }else{
                console.log("Error updating profile:", data_Response);
            }
          } catch (error) {
            console.log("Error during fetch:", error);
          }
    }
    update()
   
}
