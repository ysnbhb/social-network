import { useEffect, useState } from "react";

export default function useFollowing( ) {
  const [Following, setFollowing] = useState([]);
  const [error, setError] = useState(null);
  const dataFollowing = async () => {
    try {
      const response = await fetch(`/api/userfollowing`, {
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
  }, [ ]);

  return [Following, error];
}
