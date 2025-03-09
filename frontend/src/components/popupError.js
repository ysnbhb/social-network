import "../styles/popuperror.css";
export default function PopUpError() {
  const path = window.location.href;
  const body = document.body;
  body.style.background = "black";
  console.log(path.includes("profile/"), path.length);
  const url = path.indexOf("profile/");
  const username = path.slice(url - path.length).split("profile/")[1];

  return (
    <div>
      <div className="container-popup">
        <div className="popups">
          <div className="popups-header">
            <span className="close-btn">&times;</span>
            <div className="popups-title">
              <span className="icon">📌</span>
              The username '{username}' does not exist.
            </div>
          </div>

          <div className="popup-content">
            Please check the spelling and try again.
          </div>

          <div className="popup-button">
            <button className="button">Goo Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
