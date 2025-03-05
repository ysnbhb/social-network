import { useEffect, useState } from "react";
 

export default function useGetProfile(searchParam) {  
     const [profile, setProfile] = useState([])
    const [error, setError] = useState(null)
  
    const fetchData = async () => {
        try {
            const endpoint = searchParam
            ? `api/profile/posts/created?id=${searchParam}` 
              : "api/profile/posts/created" ;
            const response= await fetch(endpoint,{
                method:"GET",
                credentials: "include"
            })
            
            let data = await response.json()
            if(response.ok){
                setProfile(data || [])
            } else {
                console.log(response.status);
                console.log(data,"here");
                
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