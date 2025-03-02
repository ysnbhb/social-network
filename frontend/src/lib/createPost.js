"use server";

import { cookies } from "next/headers";

async function CreatePost( content, postType, img, groupId = 0 ) {  
  const data = new FormData();
  data.append("content", content);
  data.append("postType", postType);
  if (img) data.append("img", img);
   data.append("groupId", groupId);
  console.log(img);
  const cookieStore = cookies();
  const userSession = cookieStore.get("session_id")?.value || ""; 
  
  data.append("groupId", groupId);
  try {
    const respons = await fetch("http://localhost:8080/api/create/post", {
      method: "POST",
      headers: {
        Cookie: `session_id=${userSession}`,
      },
      credentials: "include",
      body: data,
    });
    if (respons.ok) {
      const responsData = await respons.json();
      return responsData;
    } else {
      console.log(respons.ok);
      
      return false
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { CreatePost };
