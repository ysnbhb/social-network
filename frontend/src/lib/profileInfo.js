export default async function  Profile_info(){
    try {
        const response= await fetch("http://localhost:8080/api/profile/posts/created")
        if(response.ok){
            let data =await response.json()
            console.log(data,"hellooooo");
            
        }
        else {
            throw new Error("error");
          }
    } catch (error) {
        console.log(error);
        return error;
    }
}