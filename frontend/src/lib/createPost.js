async function CreatePost( content, postType, img, groupId = 0 ) {
    // console.log(content, postType, img, groupId);

  const data = new FormData();
  data.append("content", content);
  data.append("postType", postType);
  if (img) data.append("img", img);
  console.log(img);
  
  data.append("groupId", groupId);
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
      throw new Error("error");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

export { CreatePost };
