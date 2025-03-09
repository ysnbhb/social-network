 import { API_URL } from "@/components/api";
import { useEffect, useState } from "react";
 

export default function useGetProfile(searchParam) {  
     
    const [profile, setProfile] = useState([])
    const [error, setError] = useState(null)
  
    const fetchData = async () => {
        try {
            const endpoint = searchParam
            ? `${API_URL}/api/profile/posts/created?username=${searchParam}` 
              : `${API_URL}/api/profile/posts/created` ;
            const response= await fetch(endpoint,{
                method:"GET",
                credentials: "include"
            })
            
            let data = await response.json()
            if(response.ok){
                setProfile(data || [])
            }else if (response.status===401){
                window.location.href = '/login';
            } else { 
               setError(data)
              }
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchData();
    }, [searchParam])

    return [profile, error]
}