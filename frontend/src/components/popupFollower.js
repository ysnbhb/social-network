import "../styles/groupsFeed.css";
export default function PopupFollower(showPopup) {
    console.log(showPopup);
    
    return (
         
            <div className="content-area">
              <div className="group-creator">
                <div className="creator-header">
                  <div className="creator-title">Create a New Group</div>
                  
                </div>
              </div>
        
              
              {showPopup && (
                <div className="popup-overlay">
                  <div className="popup-content">
                    <div className="popup-header">
                      <h2 className="popup-title">Create New Event</h2>
                      <button className="popup-close" o >
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