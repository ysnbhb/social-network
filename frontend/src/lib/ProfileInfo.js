export default async function Profile_Info(){
    try {
        const info_user=await fetch("http://localhost:8080/api/profile")
        if(info_user.ok){
            const data=await info_user.json()
            return data
        }else{
            console.log(response.status);
            throw new Error("error");
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}