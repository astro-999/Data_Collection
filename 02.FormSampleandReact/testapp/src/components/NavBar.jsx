import "../css/NavBar.css"

function NavBar(){
    return(
        <nav className="navbar">
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/age-calculator">Age Calculator</a></li>
                <li><a href="/crude-operations">Crud Operations</a></li>
                <li><a href="/student-details">Student Details</a></li>
            </ul>
        </nav>
    )
}

export default NavBar;