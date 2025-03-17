"use client";
import { useRouter } from "next/navigation";
import "../styles/NotFound.css";

const NotFound = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className="container">
      <div className="error-content">
        <h1>404</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <a href="#" onClick={handleRedirect}>
          Go to Homepage
        </a>
      </div>
    </div>
  );
  
};

export default NotFound;
