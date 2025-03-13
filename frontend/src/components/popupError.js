import { useRouter } from "next/navigation";
import "../styles/popuperror.css";
export default function PopUpError({ message, onClose }) {
  const rooter=useRouter()
  const path = window.location.href;
  console.log(path.includes("profile/"), path.length);
  const url = path.indexOf("profile/");
  const username = path.slice(url - path.length).split("profile/")[1];
  function Gooback (){
    rooter.push("/home")
  }
  return (
    <div>
      <div className="container-popup">
        <div className="popups">
          <div className="popups-header">
            <div className="popups-title">
              <span className="icon">📌</span>
              {/* The username '{username}' does not exist. */}
            </div>
            <span className="close-button" onClick={Gooback}>&times;</span>
          </div>

          <div className="popup-content">
            Please check the spelling and try again.
          </div>

          <div className="popup-button">
            <button className="button" onClick={Gooback}>Go Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
