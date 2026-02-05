import "./nav.css"
import { Link } from "react-router";

function Nav() {
    return (
        <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/income">Income</Link>
        </nav>
    );
}
export default Nav;