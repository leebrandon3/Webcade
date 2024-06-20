import { NavLink } from "react-router-dom"
import '../public/style.scss'
import { useState } from "react"

function Navbar() {

    return (
        <div className="sidebar">
            <div className="button">
                <NavLink to='/' exact='true' activeclassname='active' className="link">
                </NavLink>
                <h3 className="oswald">Home</h3>
            </div>
            <div className="button">
                <NavLink to='/game' activeclassname='active' className="link">
                </NavLink>
                <h3 className="oswald">Game</h3>
            </div>
            <div className="button">
                <NavLink to='/casino' activeclassname='active' className="link">
                </NavLink>
                <h3 className="oswald">Casino</h3>
            </div>
            <div className="button">
                <NavLink to='/shop' activeclassname='active' className="link">
                </NavLink>
                <h3 className="oswald">Coin Shop</h3>
            </div>
            <div className="button">
                <NavLink to='/inventory' activeclassname='active' className="link">
                </NavLink>
                <h3 className="oswald">Inventory</h3>
            </div>
            <div className="socials">
                <a href="https://www.linkedin.com/in/brandonslee3/">
                    <img src='../public/assets/CSS/LinkedIn-Logos/LI-In-Bug.png'/>
                </a>
                <a href="https://github.com/leebrandon3">
                    <img src='../public/assets/CSS/github-mark/github-mark-white.png'/>
                </a>
            </div>
        </div>
    )
}

export default Navbar