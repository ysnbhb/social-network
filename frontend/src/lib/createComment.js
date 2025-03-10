"use server";

import { cookies } from "next/headers";

async function CreateComment(content, target, groupId = 0) {
  const formData = new FormData();
  formData.append("content", content);
  formData.append("groupId", groupId);
  formData.append("targetId", parseInt(target, 10));

  const cookieStore = await cookies();
  const userSession = cookieStore.get("session_id")?.value || ""; 

  try {
    const response = await fetch("http://localhost:8080/api/create/comment", {
      method: "POST",
      headers: {
        Cookie: `session_id=${userSession}`,
      },
      credentials: "include",
      body: formData, // Use FormData instead of JSON
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.log(response.status);
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { CreateComment };
