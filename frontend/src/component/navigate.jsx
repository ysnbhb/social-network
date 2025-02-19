import Image from "next/image"
import style from "./nav.module.css"
import logout from "./logout.svg"
import logo from "./image.png"
export default function Navigate() {
    return (
        <nav className={style.sidebar}>
            <Image src={logo} alt="logo" className={style.logo} />
            <ul className={style.navlist}>
                <li className={style.navitem}>
                    Dashboard
                </li>
                <li className={style.navitem}>
                    People
                </li>
                <li className={style.navitem}>
                    Finances
                </li>
                <li className={style.navitem}>
                    Statistics
                </li>
                <li className={style.navitem}>
                    Documents
                </li>
                <li className={style.navitem}>
                    Calendar
                </li>
                <li className={style.navitem}>
                    Support
                </li>
            </ul>
            <Image src={logout} alt="logout" className={style.logout} type="button" />
        </nav>
    )
}