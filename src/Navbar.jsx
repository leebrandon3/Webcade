import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div>
            <Link to='/'>
                <h3>Home</h3>
            </Link>
            <Link to='/game'>
                <h3>Game</h3>
            </Link>
            <Link to='/casino'>
                <h3>Casino</h3>
            </Link>
            <Link to='/shop'>
                <h3>Point Shop</h3>
            </Link>
        </div>
    )
}

export default Navbar