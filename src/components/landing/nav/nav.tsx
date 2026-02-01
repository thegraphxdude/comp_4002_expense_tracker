import "./nav.css"
import { Link } from "react-router";

function Nav() {
    return (
        <nav>
            <div id="navigation">
                <Link to="/">Dashboard</Link>
                <Link to="/expenses">Expenses</Link>
                <Link to="/income">Income</Link>
            </div>
        </nav>
    );
}
export default Nav;