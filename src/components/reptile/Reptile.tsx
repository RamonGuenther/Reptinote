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
import {IoFastFoodOutline, IoRestaurantOutline} from "react-icons/io5";
import {FiEdit} from "react-icons/fi";
import {FaStickyNote} from "react-icons/fa";
import AddFeedingModal from "../modals/AddFeedingModal";

// const Todo = (props) =>{
const Reptile = ({
                     name,
                     birthday,
                     type,
                     morph,
                     gender,
                     species,
                     index,
                     onDeleteReptile,
                     addFeeding,
                     toggleShow
                 }: any) => {
    return (

    <div>
            <MDBCard className={"reptileCard"}>

                <MDBCardHeader>
                    <MDBBadge className={"nameBadge"}>
                        {name}
                    </MDBBadge>
                </MDBCardHeader>

                {/*<MDBCardImage className={"image"} src='https://mdbootstrap.com/img/new/standard/nature/182.webp'*/}
                {/*              alt='...'/>*/}

                <MDBCardBody className={"cardBody"}>
                    <MDBCardImage className={"image"}
                                  src='https://www.naturaufnahmen-witt.de/s/cc_images/cache_2451202484.jpg?t=1438706632'
                                  alt='...'/>
                    <div className={"cardText"}>
                        <h2><span className={"cardTextSpan"}>Name:</span> {name}</h2>
                        <h2><span className={"cardTextSpan"}>Geburtstag:</span> {birthday}</h2>
                        <h2><span className={"cardTextSpan"}>Geschlecht:</span> {gender}</h2>
                        <h2><span className={"cardTextSpan"}>Spezies: </span> {species}</h2>
                        <h2><span className={"cardTextSpan"}>Typ: </span> {type}</h2>
                        <h2><span className={"cardTextSpan"}>Morph: </span>{morph}</h2>
                        <h3><MDBBadge className={"lastFeedingBadge"}> <IoFastFoodOutline/> Letzte Fütterung: 12.2
                        </MDBBadge></h3>
                    </div>
                </MDBCardBody>

                <MDBFooter className={"cardFooter"}>
                    <MDBBtn color={"info"} className={"detailsButton"} onClick={() => {
                        onDeleteReptile(index)
                    }}> <MdSearch size={"25px"}/>
                    </MDBBtn>
                    <MDBBtn color={"success"} className={"noteButton"} onClick={() => {
                        onDeleteReptile(index)
                    }}> <FaStickyNote size={"25px"}/>
                    </MDBBtn>
                    <MDBBtn color={"success"} className={"feedButton"} onClick={() => {
                        toggleShow();
                    }}> <IoRestaurantOutline size={"25px"}/>
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
