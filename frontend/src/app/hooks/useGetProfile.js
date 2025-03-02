import { useEffect, useState } from "react";


export default function useGetProfile() {
    const [profile, setProfile] = useState([])
    const [error, setError] = useState(null)

    const fetchData = async () => {
        try {
            const response= await fetch("http://localhost:8080/api/profile/posts/created",{
                method:"GET",
                credentials: "include"
            })
            
            let data = await response.json()
            if(response.ok){
                setProfile(data || [])
                
            } else {
                console.log(response.status);
               setError(data)
              }
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return [profile, error]
}