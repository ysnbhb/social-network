// import { useEffect, useState } from "react";

// export default function usehandleFollowers(param){
//       const [status, setStatus] = useState( );
//       const handle = async () => {
//         const res = await fetch(`/api/follow`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             followingId: param,
//           }),
//         });
//         const data = await res.json();
//          if (res.ok) {
//           setStatus(data.status);
//         }
//       };
//       useEffect(()=>{
//         handle
//       },[param])
//       console.log("hello",param,status);    
// return [status]
// }

// // const [userid, setUser] =useState()
  
// //   const handuleClick = async (id) => {
// //     setUser(id)
// //   };
// //   const status = handleFollowers(userid);