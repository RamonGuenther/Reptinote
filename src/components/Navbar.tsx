import React from "react";

import {MDBNavbar, MDBNavbarBrand} from "mdb-react-ui-kit";

const Navbar = () => {
  return(
      <nav
          className="navbar navbar-expand-sm navbar-dark bg-danger">
          <a className="navbar-brand" href="/ee"> Reptinote</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                  <li><a className="nav-link active" aria-current="page" href="shoppingCart.xhtml">
                      Warenkorb</a></li>
              </ul>
          </div>
      </nav>
  )
}

export default Navbar;