"use client"
import {  useSearchParams } from "next/navigation";

export default function NotFound() {
    const searchParams = useSearchParams(); // Use useSearchParams to get query params
    const message = searchParams.get("message"); // Get the 'message' query parameter
  
    return (
      <div className="error-page">
        <h1>Error</h1>
        <p>{decodeURIComponent(message || "An unexpected error occurred.")}</p>
      </div>
    ); 
}
