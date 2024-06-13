import { Link } from "react-router-dom"
import '../public/style.scss'

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
            <Link to='/inventory'>
                <h3>Inventory</h3>
            </Link>
        </div>
    )
}

export default Navbar