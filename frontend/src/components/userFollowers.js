import useHandleFollowers from "@/app/hooks/usehandleFollower";
import Follow from "./Follow";

export default function User({user}) {
    const { status, handle } = useHandleFollowers(user.id , user.status);
     const handuleClick = async () => {
      await handle();  
    };
  return <>
  <Follow  status={status}   user={user}  handuleClick={handuleClick} />
  </>
}