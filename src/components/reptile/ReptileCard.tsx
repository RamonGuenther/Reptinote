import React from "react";
import "./reptile.css"
import {MdDelete, MdSearch} from "react-icons/md";
import {IoFastFoodOutline, IoRestaurantOutline} from "react-icons/io5";
import {FiEdit} from "react-icons/fi";
import {FaStickyNote} from "react-icons/fa";
import {GiWeight} from "react-icons/gi";
import {Link} from "react-router-dom";

import {
    Avatar,
    Badge,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Divider
} from "@mui/material";

const ReptileCard = ({
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
                         image,
                         toggleReptileEditModal
                     }: any) => {


    return (
        <div>
            <Card className={"reptileCard"}>
                <CardHeader
                    avatar={<Link to={`/reptileDetails/${index}`}> <Chip onClick={() => {
                    }} className={"nameBadge"} variant="outlined" label={name}/> </Link>}
                />
                {/*<MDBCardImage className={"image"} src='https://mdbootstrap.com/img/new/standard/nature/182.webp'*/}
                {/*              alt='...'/>*/}

                <CardContent className={"cardBody"}>
                    <CardMedia
                        className={"image"}
                        component={"img"}
                        image={image}
                    />
                    <div className={"cardText"}>
                        <h2><span className={"cardTextSpan"}>Name:</span> {name}</h2>
                        <h2><span className={"cardTextSpan"}>Geburtstag:</span> {birthday}</h2>
                        <h2><span className={"cardTextSpan"}>Geschlecht:</span> {gender}</h2>
                        <h2><span className={"cardTextSpan"}>Spezies: </span> {species}</h2>
                        <h2><span className={"cardTextSpan"}>Typ: </span> {type}</h2>
                        <h2><span className={"cardTextSpan"}>Morph: </span>{morph}</h2>
                        <h3><Badge className={"lastFeedingBadge"}> <IoFastFoodOutline/> Letzte
                            Fütterung: {feedings[feedings.length - 1] !== undefined ? feedings[feedings.length - 1]._date : " "}
                        </Badge></h3>
                        <h3><Badge className={"lastFeedingBadge"}> <IoFastFoodOutline/> Letztes
                            Gewicht: {weights[weights.length - 1] !== undefined ? weights[weights.length - 1]._weight : " "}
                        </Badge></h3>
                        <h3><Badge className={"lastFeedingBadge"}> <IoFastFoodOutline/> Letzte
                            Notiz: {notes[notes.length - 1] !== undefined ? notes[notes.length - 1]._note : " "}
                        </Badge></h3>
                    </div>
                </CardContent>

                <CardActions className={"cardFooter"}>

                    <div className={"lel"}>
                        <Link to={`/reptileDetails/${index}`}>
                            <Button variant="contained" className={"detailsButton bg-info"} onClick={() => {
                            }}> <MdSearch size={"25px"}/>
                            </Button>

                        </Link>

                        <Button variant="contained" className={"weightButton bg-success"} onClick={() => {
                            toggleWeightModal();
                            setReptileId(index)
                        }}> <GiWeight size={"25px"}/>
                        </Button>


                        <Button variant="contained" className={"noteButton bg-success"} onClick={() => {
                            toggleNoteModal();
                            setReptileId(index)
                        }}> <FaStickyNote size={"25px"}/>
                        </Button>

                        {/*TODO BEI TOGGLE DIE SCHREIBWEISE ÄNDERN */}
                        <Button variant="contained" className={"feedButton bg-success"} onClick={() => {
                            toggleFeedingModal();
                            setReptileId(index)
                        }}> <IoRestaurantOutline size={"25px"}/>
                        </Button>

                        <div className="verticalLine"/>

                        <Button variant="contained" className={"editButton"} onClick={() => {
                            setReptileId(index);
                            toggleReptileEditModal(index);
                        }}> <FiEdit size={"25px"}/>

                        </Button>
                        <Button variant="contained" className={"deleteButton bg-danger"} onClick={() => {
                            onDeleteReptile(index)
                        }}> <MdDelete size={"25px"}/>
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default ReptileCard;


// <h1>{done ? "Erledigt" : "Nicht erledigt"}</h1>
