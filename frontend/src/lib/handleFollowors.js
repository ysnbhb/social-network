import { useEffect, useState } from "react";

export default function handleFollowers(param){
      const [status, setStatus] = useState();
      const handle = async () => {
        try {
        const res = await fetch(`/api/follow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            followingId: param,
          }),
        });
        const data = await res.json();
         if (res.ok) {
          setStatus(data);
          console.log("data");
        }else{
            console.log("errr");
            
        }
     } catch (error) {
            console.log(error,"fefr");
            
        }
      };
      useEffect(()=>{
        handle
      },[])
      console.log("hello",param,status);    
  
}

// const [userid, setUser] =useState()
  
//   const handuleClick = async (id) => {
//     setUser(id)
//   };
//   const status = handleFollowers(userid);