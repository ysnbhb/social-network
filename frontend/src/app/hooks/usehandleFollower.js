import { useState } from 'react';
import { sendFollow } from '@/websocket/notification';

export default function useHandleFollowers(param) {
  const [status, setStatus] = useState(null);

  const handle = async () => {
    try {
      console.log("test");

      const res = await fetch(`/api/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          followingId: param,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(data.status);
        sendFollow(data.followingId+"");
      } else {
        console.log("errr");
      }
    } catch (error) {
      console.log(error, "fefr");
    }
  };
console.log(status);

  return { status, handle };
}