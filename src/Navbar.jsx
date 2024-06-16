import { NavLink } from "react-router-dom"
import '../public/style.scss'
import { useState } from "react"

function Navbar() {

    return (
        <div className="sidebar">
            <NavLink to='/' exact='true' activeclassname='active' className="link">
                <h3>Home</h3>
            </NavLink>
            <NavLink to='/game' activeclassname='active' className="link">
                <h3>Game</h3>
            </NavLink>
            <NavLink to='/casino' activeclassname='active' className="link">
                <h3>Casino</h3>
            </NavLink>
            <NavLink to='/shop' activeclassname='active' className="link">
                <h3>Point Shop</h3>
            </NavLink>
            <NavLink to='/inventory' activeclassname='active' className="link">
                <h3>Inventory</h3>
            </NavLink>
            {/* TODO add links to socials (Linkedin, Github, etc.) */}
        </div>
    )
}

export default Navbar