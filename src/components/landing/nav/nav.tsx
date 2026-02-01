import "./nav.css"

function Nav() {
    return (
        <nav>
            <div id="navigation">
                <a href="/">Dashboard</a>
                <a href="/expenses">Expenses</a>
                <a href="/income">income</a>
            </div>
        </nav>
    );
}
export default Nav;