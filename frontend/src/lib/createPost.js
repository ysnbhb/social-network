async function CreatePost(content, postType, img, groupId = 0, UsersSelected) {
  const data = new FormData();
  data.append("content", content);
  data.append("postType", postType);
  if (img) data.append("img", img);
  data.append("groupId", groupId);
  data.append("UsersSelected", UsersSelected);
  try {
    const respons = await fetch("http://localhost:8080/api/create/post", {
      method: "POST",
      credentials: "include",
      body: data,
    });
    if (respons.ok) {
      const responsData = await respons.json();
      return responsData;
    } else {
      console.log(respons.ok);
      const responsData = await respons.json();
      alert(responsData);
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { CreatePost };
