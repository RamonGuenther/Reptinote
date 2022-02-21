import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
  return(
      <nav
          className="navbar navbar-expand-sm navbar-dark bg-danger">
              <ul className="navbar-nav">
                  <li>
                      <Link to={'/'} className="navbar-brand" >Reptinote </Link>
                  </li>
                  <li>
                      <Link to={'/'} className="navbar-brand" > Reptilienübersicht</Link>
                  </li>
              </ul>
      </nav>
  )
}

export default Navbar;