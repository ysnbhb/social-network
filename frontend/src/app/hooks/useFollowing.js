import { useEffect, useState } from "react"

export default  function useFollowing(params){
    const [follow,setFollow] =useState([])
    const [err,seterr] =useState([])
    const following=async ()=>{
        try {
            const response=await fetch(`/api/userfollowing?username${params}`,
            { credentials:"include"} )
            let data = await response.json()
            if (response.ok){
                setFollow(data|| [])
            }else{
                seterr(data)
            }
        } catch (error) {
            seterr(data)
        }
    }
    useEffect(()=>{
        following
    },[params])
return [follow,err]
}