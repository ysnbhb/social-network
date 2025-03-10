import { useRef } from "react";
import "../styles/groupsFeed.css";
export default function PopupFollower({showPopup,params , data}) {
    return (
         
            <div  className="content-area">
              {showPopup && (
                <div className="popup-overlay">
                  <div className="popup-content">
                    <div className="popup-header">
                      <h2 className="popup-title">{params}</h2>
                      <button className="popup-close" onClick={Close}  >
                        &times;
                      </button>
                    </div>
                    <div className="popup-form">
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
}