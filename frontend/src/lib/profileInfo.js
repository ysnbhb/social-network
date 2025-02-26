export default async function  Profile_info(){
    try {
        const response= await fetch("/api/profile/posts/created")
        if(response.ok){
            let data =await response.json()
            console.log(data);
            
        }
        else {
            throw new Error("error");
          }
    } catch (error) {
        console.log(err);
        return err;
    }
}