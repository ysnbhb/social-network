import style from "../styles/isloading.module.css";

export default function IsLoading(){
        return (
            <div className={style.container}>
            <div className={style.loadingContainer}>
            <div className={style.loadingSpinner}></div>
            <p className={style.loadingText}>Loading...</p>
            </div>
        </div>
        )
}