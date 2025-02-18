import Image from "next/image"
import style from "./nav.module.css"
import logout from "./logout.svg"
export default function Navigate() {
    return (
        <div className={style.usersection}>
            <p>groups</p>
            <p>profile</p>
            <button>
                <Image src={logout} alt="logout" width="30" />
            </button>
        </div>
    )
}