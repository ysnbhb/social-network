"use client";
import Link from "next/link";
import "../styles/navbar.css";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  initializeWebSocket,
  SendOnlineStatus,
} from "../websocket/websocket.js";
import { useRouter } from "next/navigation";
export default function Navbar() {


  function logout() {
    document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  }


  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    initializeWebSocket()
      .then(() => {
        SendOnlineStatus();
      })
      .catch((error) => {
        router.push("/login");
        //console.error("Failed to initialize websocket:", error);
      });
  }, [pathname]);
  return (
    <nav className="navbar">
      <a href="/home" className="logo">
        ZoneMeet
      </a>
      <div className="nav-icons">
        {/* Home Icon */}
        <Link href="/home" className={pathname === "/home" ? "active" : ""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            id="home"
          >
            <path
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6.65721519,18.7714023 L6.65721519,15.70467 C6.65719744,14.9246392 7.29311743,14.2908272 8.08101266,14.2855921 L10.9670886,14.2855921 C11.7587434,14.2855921 12.4005063,14.9209349 12.4005063,15.70467 L12.4005063,15.70467 L12.4005063,18.7809263 C12.4003226,19.4432001 12.9342557,19.984478 13.603038,20 L15.5270886,20 C17.4451246,20 19,18.4606794 19,16.5618312 L19,16.5618312 L19,7.8378351 C18.9897577,7.09082692 18.6354747,6.38934919 18.0379747,5.93303245 L11.4577215,0.685301154 C10.3049347,-0.228433718 8.66620456,-0.228433718 7.51341772,0.685301154 L0.962025316,5.94255646 C0.362258604,6.39702249 0.00738668938,7.09966612 0,7.84735911 L0,16.5618312 C0,18.4606794 1.55487539,20 3.47291139,20 L5.39696203,20 C6.08235439,20 6.63797468,19.4499381 6.63797468,18.7714023 L6.63797468,18.7714023"
              transform="translate(2.5 2)"
            />
          </svg>
          Home
        </Link>

        {/* Groups Icon */}
        <Link href="/groups" className={pathname === "/groups" ? "active" : ""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="none"
            viewBox="0 0 128 128"
            id="groups"
          >
            <circle
              cx="63.5"
              cy="39.5"
              r="17.5"
              strokeWidth="7"
              transform="rotate(-90 63.5 39.5)"
            ></circle>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="7"
              d="M92.5038 30.0074C94.4084 29.8751 96.3205 30.1193 98.1308 30.7259 99.9411 31.3326 101.614 32.2899 103.054 33.5431 104.495 34.7963 105.674 36.321 106.525 38.0301 107.376 39.7391 107.883 41.599 108.015 43.5037 108.147 45.4083 107.903 47.3204 107.296 49.1307 106.69 50.941 105.732 52.6141 104.479 54.0544 103.226 55.4947 101.701 56.6741 99.9922 57.5252 98.2832 58.3763 96.4232 58.8825 94.5186 59.0148M35.5185 30.0074C33.6138 29.8751 31.7017 30.1193 29.8915 30.7259 28.0812 31.3326 26.4081 32.2899 24.9677 33.5431 23.5274 34.7963 22.348 36.321 21.4969 38.0301 20.6458 39.7391 20.1397 41.599 20.0074 43.5037 19.8751 45.4083 20.1192 47.3204 20.7259 49.1307 21.3325 50.941 22.2898 52.6141 23.5431 54.0544 24.7963 55.4947 26.321 56.6741 28.03 57.5252 29.739 58.3763 31.599 58.8825 33.5036 59.0148"
            />
            <path
              strokeLinejoin="round"
              strokeWidth="7"
              d="M32 88.2378C32 98.0476 39.9524 106 49.7622 106H76.1575C86.0116 106 94 98.0116 94 88.1575V88.1575C94 76.1531 82.3842 67.5738 70.9106 71.1038L68.2949 71.9086C64.5812 73.0512 60.6077 73.0363 56.9026 71.866L55.1122 71.3005C43.6638 67.6843 32 76.2319 32 88.2378V88.2378Z"
            />
          </svg>
          Groups
        </Link>

        {/* Chat Icon */}
        <Link href="/chat" className={pathname === "/chat" ? "active" : ""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            id="chat"
          >
            <g
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              transform="translate(2 2)"
            >
              <path d="M10.0568181,-3.37507799e-14 C6.54686532,-0.0141015786 3.28556632,1.80703838 1.46050022,4.80034679 C-0.364565872,7.7936552 -0.487081058,11.5223413 1.13756771,14.6286303 L1.33789312,15.0191059 C1.50209106,15.3263704 1.53643729,15.6864194 1.43328617,16.0191043 C1.14742034,16.7783674 0.908488743,17.5544276 0.71783828,18.3429101 C0.71783828,18.7429095 0.832309942,18.9714806 1.26157868,18.9619568 C2.02189879,18.7940564 2.77067506,18.5777416 3.5033154,18.3143388 C3.81886183,18.2274425 4.15437035,18.2475403 4.45724592,18.3714815 C4.73388577,18.5048146 5.29670478,18.8476712 5.31578339,18.8476712 C8.99153503,20.7804333 13.4807954,20.2472199 16.5997521,17.5074142 C19.7187087,14.7676084 20.8198838,10.3899785 19.3676078,6.50403406 C17.9153318,2.6180896 14.211089,0.0305307279 10.0568181,-3.37507799e-14 L10.0568181,-3.37507799e-14 Z" />
              <circle cx="5.287" cy="10" r="1" fill="#200E32"></circle>
              <circle cx="10.057" cy="10" r="1" fill="#200E32"></circle>
              <circle cx="14.826" cy="10" r="1" fill="#200E32"></circle>
            </g>

            <circle
              id="notification-badge-message"
              cx="18"
              cy="5"
              r="8"
              fill="#FF3B30"
              stroke="white"
              strokeWidth="1"
              style={{ display: "none" }}
            />
            <text
              id="notification-count-message"
              x="18"
              y="6"
              textAnchor="middle"
              fill="white"
              fontSize="12px"
              dy=".35em"
              style={{ display: "block" }}
            ></text>
          </svg>
          Chat
        </Link>

        {/* Notification Icon */}
        <Link
          href="/notification"
          className={pathname === "/notification" ? "active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            id="notification"
          >
            <g
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              transform="translate(3.5 2)"
            >
              <path d="M.00082545485 11.7871203L.00082545485 11.568135C.0329512746 10.9202451.240598836 10.2924906.602355621 9.74960514 1.20450201 9.09746185 1.61670318 8.29830554 1.79571385 7.43597814 1.79571385 6.76950123 1.79571385 6.09350321 1.85392645 5.4270263 2.15469153 2.21841601 5.32727806 3.37507799e-14 8.46105618 3.37507799e-14L8.53867298 3.37507799e-14C11.6724511 3.37507799e-14 14.8450376 2.21841601 15.1555048 5.4270263 15.2137174 6.09350321 15.1555048 6.76950123 15.2040153 7.43597814 15.3854338 8.30030508 15.7972211 9.10194449 16.3973735 9.75912624 16.7618363 10.2972046 16.9698126 10.9226612 16.9989037 11.568135L16.9989037 11.7775992C17.0205591 12.6480449 16.720769 13.4968208 16.1548211 14.167395 15.4069586 14.9514753 14.392113 15.4392693 13.3024038 15.5384332 10.1069938 15.8812057 6.8830333 15.8812057 3.68762325 15.5384332 2.59914366 15.4349924 1.58575794 14.9479001.835206008 14.167395.278 13.496309-.0177593319 12.6525831.00082545485 11.7871203zM6.05493552 18.8517756C6.55421005 19.478449 7.28739599 19.8840184 8.09222803 19.978725 8.89706007 20.0734316 9.70716835 19.8494655 10.3432635 19.3563938 10.5389031 19.2105605 10.7149406 19.0410062 10.8671768 18.8517756" />
            </g>
            <circle
              id="notification-badge"
              cx="18"
              cy="6"
              r="8"
              fill="#FF3B30"
              stroke="white"
              strokeWidth="1"
              style={{ display: "none" }}
            ></circle>
            <text
              id="notification-count"
              x="18"
              y="6"
              textAnchor="middle"
              fill="white"
              fontSize="10px"
              dy=".35em"
              style={{ display: "block" }}
            ></text>
          </svg>
          Notification
        </Link>
      </div>
      <div className="logout-Btn" onClick={logout} >
      <button className="Btn">
        <div className="sign">
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
          </svg>
        </div>

        <div className="text">Logout</div>
      </button>
      </div>

    </nav>
  );
}

