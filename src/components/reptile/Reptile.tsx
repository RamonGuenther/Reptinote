import React from "react";
import "./reptile.css"
import {
    MDBBadge,
    MDBBreadcrumb,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage, MDBFooter,
} from "mdb-react-ui-kit";
import {MdDelete, MdSearch} from "react-icons/md";
import {IoFastFoodOutline, IoRestaurantOutline} from "react-icons/io5";
import {FiEdit} from "react-icons/fi";
import {FaStickyNote} from "react-icons/fa";
import {GiWeight} from "react-icons/gi";

const Reptile = ({
                     name,
                     birthday,
                     type,
                     morph,
                     gender,
                     species,
    feedings,
    weights,
    notes,
                     index,
                     onDeleteReptile,
                     toggleWeightModal,
                     toggleNoteModal,
                     toggleFeedingModal,
                     setReptileId,
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
                        <h3><MDBBadge className={"lastFeedingBadge"}> <IoFastFoodOutline/> Letzte Fütterung: {feedings[feedings.length-1] !== undefined ? feedings[feedings.length-1]._date : " "}
                        </MDBBadge></h3>
                        <h3><MDBBadge className={"lastFeedingBadge"}> <IoFastFoodOutline/> Letztes Gewicht: {weights[weights.length-1] !== undefined ? weights[weights.length-1]._weight : " "}
                        </MDBBadge></h3>
                        <h3><MDBBadge className={"lastFeedingBadge"}> <IoFastFoodOutline/> Letzte Notiz: {notes[notes.length-1] !== undefined ? notes[notes.length-1]._note : " "}
                        </MDBBadge></h3>
                    </div>
                </MDBCardBody>

                <MDBFooter className={"cardFooter"}>
                    <MDBBtn color={"info"} className={"detailsButton"} onClick={() => {
                        onDeleteReptile(index)
                    }}> <MdSearch size={"25px"}/>
                    </MDBBtn>


                    <MDBBtn color={"success"} className={"detailsButton"} onClick={() => {
                        toggleWeightModal() ; setReptileId(index)
                    }}> <GiWeight size={"25px"}/>
                    </MDBBtn>


                    <MDBBtn color={"success"} className={"noteButton"} onClick={() => {
                        toggleNoteModal(); setReptileId(index)
                    }}> <FaStickyNote size={"25px"}/>
                    </MDBBtn>

                    {/*TODO BEI TOGGLE DIE SCHREIBWEISE ÄNDERN */}
                    <MDBBtn color={"success"} className={"feedButton"} onClick={() => {
                        toggleFeedingModal();
                        setReptileId(index)
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
