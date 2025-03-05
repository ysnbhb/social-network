 import { useEffect, useState } from "react";

export default function userProfile(id){ 
    const [profile,setProfile] =useState([])
   const [error, setError ] =useState(null)
    
    const fetchProfile=async ()=>{
         const endpoint = id
        ? `/api/profile?id=${id}` 
        : '/api/profile';
        try {
            const response = await fetch(endpoint,{
                credentials:'include'
            })
            let data =await response.json()
            if(response.ok){
                setProfile(data || [])
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
    }, [id])

    return [profile, error]
}