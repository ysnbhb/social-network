import { useState } from 'react';
import { sendFollow } from '@/websocket/notification';
import { API_URL } from '@/components/api';

export default function useHandleFollowers(param , stat) {
  const [status, setStatus] = useState(stat);

  const handle = async () => {
    try {
      const res = await fetch(`${API_URL}/api/follow`, {
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

  return { status, handle };
}