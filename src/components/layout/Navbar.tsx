import React from "react";
import {Link} from "react-router-dom";
import "./navbar.css"

const Navbar = () => {
    return (
        <div id="navbar">
            <Link to={'/'} id="navbar-projectName" className="projectTitle navbar-brand">Reptinote </Link>
            <div className="navbar-verticalLine"/>
            <Link to={'/'} id="navbar-reptile-overview"> Reptilienübersicht</Link>
            <Link to={'Breeder'} id="navbar-breeder"> Züchter </Link>
        </div>
    )
}

export default Navbar;