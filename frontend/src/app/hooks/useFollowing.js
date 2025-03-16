import { API_URL } from "@/components/api";
import { useEffect, useState } from "react";

export default function useFollowing( params) {
   
  const [Following, setFollowing] = useState([]);
  const [error, setError] = useState(null);
  const dataFollowing = async () => {
    try {
      const endpoint = params? 
      `${API_URL}/api/userfollowing?current_username=${params}` 
      :`${API_URL}/api/userfollowing`
      const response = await fetch(endpoint, {
        credentials: "include",
      });
      let data = await response.json();

      if (response.ok) {
        setFollowing(data || []);
      } else {
        setError(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    dataFollowing();
  }, []);

  return [Following, error];
}
