import { useEffect, useState } from "react";

export default function userProfile(){
    const [profile,setProfile] =useState([])
    const [error, setError ] =useState(null)

    const fetchProfile=async ()=>{
        try {
            const response = await fetch("/api/profile",{
                credentials:'include'
            })
            let data =await response.json()
            if(response.ok){
                setProfile(data || [])
            }else{
                setError(data)
            }
        } catch (error) {
            setError(error.message)
        }
    }
 useEffect(() => {
    fetchProfile();
    }, [])

    return [profile, error]
}