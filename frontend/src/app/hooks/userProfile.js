 import { API_URL } from "@/components/api";
import { useEffect, useState } from "react";

export default function userProfile(params){ 
    const [profile,setProfile] =useState([])
   const [error, setError ] =useState(null)
    
    const fetchProfile=async ()=>{
         const endpoint = params? 
         `${API_URL}/api/profile?username=${params}` 
         :`${API_URL}/api/profile`
        try {
            const response = await fetch(endpoint,{
                credentials:'include'
            })
            let data =await response.json()
            if(response.ok){
                setProfile(data || [])
            }else if (response.status===401){
                window.location.href = '/login';
            }else{
                console.log(data,"here");
                setError(data)
            }
        } catch (error) {
            setError(error.message)
        }
    }
    useEffect(() => {
         fetchProfile();
    }, [params])

    return [profile, error]
}