import React from "react";
import "./reptile.css"
import {
    MDBBadge,
    MDBBreadcrumb,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage, MDBCardText, MDBFooter,
    MDBNavbar
} from "mdb-react-ui-kit";
import {MdDelete, MdSearch, MdAdd} from "react-icons/md";
import {IoFastFoodOutline} from "react-icons/io5";
import {FiEdit} from "react-icons/fi";

// const Todo = (props) =>{
const Reptile = ({name, birthday, type, morph, gender, species, index, onDeleteReptile}: any) => {
    return (
        <div>
            <MDBCard className={"reptileCard"}>
                {/*TODO: PILL vllt woanders noch nutzen */}

                <MDBCardHeader>
                    <MDBBadge className={"reptileBadge"}>
                        {name}
                    </MDBBadge>
                </MDBCardHeader>

                {/*<MDBCardImage className={"image"} src='https://mdbootstrap.com/img/new/standard/nature/182.webp'*/}
                {/*              alt='...'/>*/}

                <MDBCardBody className={"cardBody"}>
                    <MDBCardImage className={"image"}
                                  src='https://www.naturaufnahmen-witt.de/s/cc_images/cache_2451202484.jpg?t=1438706632'
                                  alt='...'/>
                    <MDBCardText className={"cardText"}>
                        <h2>Name: {name}</h2>
                        <h2>Geburtstag: {birthday}</h2>
                        <h2>Geschlecht: {gender}</h2>
                        <h2>Spezies: {species}</h2>
                        <h2>Typ: {type}</h2>
                        <h2>Morph: {morph}</h2>
                        <h3><MDBBadge className={"bg-danger"}> <IoFastFoodOutline/> Letzte Fütterung: 12.2 </MDBBadge>
                        </h3>
                    </MDBCardText>
                </MDBCardBody>

                <MDBFooter className={"cardFooter"}>
                    <MDBBtn color={"info"} className={"detailsButton"} onClick={() => {
                        onDeleteReptile(index)
                    }}> Details <MdSearch size={"25px"}/>
                    </MDBBtn>
                    <MDBBtn color={"success"} className={"noteButton"} onClick={() => {
                        onDeleteReptile(index)
                    }}> Notiz <MdAdd size={"25px"}/>
                    </MDBBtn>
                    <MDBBtn color={"success"} className={"feedButton"} onClick={() => {
                        onDeleteReptile(index)
                    }}> Füttern <MdAdd size={"25px"}/>
                    </MDBBtn>

                    <div className="verticalLine"></div>
                    <MDBBtn color={"primary"} className={"deleteButton"} onClick={() => {
                        onDeleteReptile(index)
                    }}> <FiEdit size={"25px"}/>
                    </MDBBtn>
                    <MDBBtn color={"danger"} className={"deleteButton"} onClick={() => {
                        onDeleteReptile(index)
                    }}> <MdDelete size={"25px"}/>
                    </MDBBtn>
                </MDBFooter>

                {/*Letztes Gewicht anzeigen*/}


            </MDBCard>

        </div>
    )
}

export default Reptile;


// <h1>{done ? "Erledigt" : "Nicht erledigt"}</h1>
