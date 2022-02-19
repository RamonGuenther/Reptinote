import React from 'react';
import './App.css';
import {MDBNavbar} from "mdb-react-ui-kit";
import ReptileList from "./components/reptile/ReptileList";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Reptile from "./components/reptile/Reptile";
import Navbar from "./components/Navbar";

function App() {
    //
    return (
    <div>
        <Navbar></Navbar>
        <div className={"container"}>


        <Router>
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<ReptileList></ReptileList>}></Route>
                    <Route path={'reptilienUebersicht/'} element={<ReptileList/>}></Route>
                    {/*<Route path="*" element={<NotFound />}></Route>*/}
                </Routes>
            </div>
        </Router>
        </div>
    </div>
)
    ;
}

export default App;

