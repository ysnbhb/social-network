import { useEffect, useState } from "react";

export default function userProfile(params) {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const fetchProfile = async () => {
    const endpoint = params
      ? `/api/profile?username=${params}`
      : "/api/profile";
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
      });
      let data = await response.json();
      if (response.ok) {
        setProfile(data || []);
      } else {
        console.log(data, response.status, "here");
        setError(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [params]);

  return [profile, error];
}
