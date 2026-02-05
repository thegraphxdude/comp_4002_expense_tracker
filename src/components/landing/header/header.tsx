import Nav from "../nav/nav";
import "./header.css";

function Header() {
    return (
        <header>
            Expense Tracker {<Nav />}
        </header>
    )
}

export default Header