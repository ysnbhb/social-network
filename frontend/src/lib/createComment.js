import { API_URL } from "@/components/api";


async function CreateComment(content, target,img ,  groupId = 0) {
  const formData = new FormData();
  formData.append("content", content);
  formData.append("groupId", groupId);
  formData.append("targetId", parseInt(target, 10));
  formData.append("image", img);


  try {
    const response = await fetch(`${API_URL}/api/create/comment`, {
      method: "POST",
      credentials: "include",
      body: formData, // Use FormData instead of JSON
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const responseData = await response.json();

      alert(responseData)
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { CreateComment };
