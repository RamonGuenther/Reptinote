import React from 'react';
import './App.css';
import {MDBNavbar} from "mdb-react-ui-kit";
import ReptileList from "./components/reptile/ReptileList";

function App() {
    return (
        <div className="App">
            <MDBNavbar className={"bg-danger"}> </MDBNavbar>
            <div className={"container"}>
                <ReptileList></ReptileList>
            </div>
        </div>
    );
}

export default App;

