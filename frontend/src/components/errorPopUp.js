import style from "@/styles/errorPopUp.module.css";
export default function ErrorPopUp({showPopUp,error,classes={}}){
    return (
        <div>
          <div className={`${style["container-popup"]} ${classes?.style|| ""}`}  >
            <div className={style.popupError}>
              <div className={style["error-icon"]}></div>
              <h2 className={style["error-title"]}>Error</h2>
              <p className={style["error-message"]}>{error}</p>
              <button
                onClick={() => showPopUp(false)}
                className={style["try-again-btn"]}>
                Try again
              </button>
            </div>
          </div>
        </div>
    )
}