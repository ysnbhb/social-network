 import { useEffect, useState } from "react";

export default function userProfile(params){ 
    const [profile,setProfile] =useState([])
   const [error, setError ] =useState(null)
    
    const fetchProfile=async ()=>{
         const endpoint = params? 
         `/api/profile?username=${params}` 
         :"/api/profile"
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