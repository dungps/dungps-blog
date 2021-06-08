import React from "react"
import { Link } from "react-router-dom"
import style from './style.module.scss'

const menus = [
    {
        to: "/",
        label: "Home"
    },
    {
        to: "/blog",
        label: "Blog"
    }
]

const DefaultLayout = ({ children }: React.PropsWithChildren<any>) => {
    const ifTrue = (condition: boolean, then: any, orElse: any) => {
        if (condition) {
            return then
        }

        return orElse
    }

    return (
        <main className="main-content">
            <header className={style.header}>
                <div className={style.navbarSticky}>
                    <div className={style.navbarInner}>
                        <div>
                            <Link to="/" className={style.navbarLogo}>Kevin Pham</Link>
                        </div>
                        <div className={style.navbarCenter}>
                            <div className="container">
                                <nav>
                                    <ul className={style.menu}>
                                        {menus.map((menu, key) => (
                                            <li className={style.menuItem}>
                                                <Link to={menu.to} className={ifTrue(key > 0, style.menuItemA + " " + style.margin, style.menuItemA)}>{menu.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {children}
        </main>
    )
}

export default DefaultLayout
