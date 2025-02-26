
export  async function  Profile_info(){
    try {
        const response= await fetch("http://localhost:8080/api/profile/posts/created",{
            method:"GET",
            credentials: "include"
        })

        if(response.ok){
            let data =await response.json()
           return data
        }
        else {
            console.log(response.status);
            throw new Error("error");
          }
    } catch (error) {
        console.log(error);
        return error;
    }
}