import React from "react";
import {Link} from "react-router-dom";
import "../../style/navbar.css"

const Navbar = () => {
    return (
        <div id="navbar">
            <Link to={'/'} id="navbar-projectName" className="projectTitle navbar-brand">Reptinote </Link>
            <div className="navbar-verticalLine"/>
            <Link to={'/'} id="navbar-reptile-overview"> Reptilienübersicht</Link>
            <Link to={'breeder'} id="navbar-breeder"> Züchter </Link>
        </div>
    )
}

export default Navbar;