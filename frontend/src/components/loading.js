import { useEffect } from "react";
import style from "../styles/loading.module.css";
export default function Loading(){
    useEffect(() => {
        const loadingContainer = document.querySelector(`.${style["loading-container"]}`);
        const content = document.querySelector(".content");

        if (loadingContainer && content) {
            // Hide the loading container and show the content after 4 seconds
            setTimeout(() => {
                loadingContainer.classList.add("hidden");
                content.style.display = "block";
            }, 4000);
        }
      },[]);
      
    return(
        <div className={style["loading-container"]}>
        <svg className={style["loading-svg"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="55" fill="none" stroke="#1EA1F2" strokeWidth="40" />
            <g transform="translate(80, 80)">
            <circle cx="0" cy="0" r="55" fill="none" stroke="white" strokeWidth="35" strokeDasharray="0, 345" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" begin="0s" dur="0.75s" repeatCount="indefinite" />
                <animate attributeName="strokeDasharray" values="0, 345; 172.5, 172.5; 0, 345" dur="1.5s" repeatCount="indefinite" />
            </circle>
            </g>
        </svg>
        </div>
    )
}