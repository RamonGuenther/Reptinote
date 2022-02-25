import React, {useState} from "react";
import "./reptileCard.css"
import {MdDelete, MdSearch} from "react-icons/md";
import {IoFastFoodOutline, IoRestaurantOutline} from "react-icons/io5";
import {FiEdit} from "react-icons/fi";
import {FaStickyNote} from "react-icons/fa";
import {GiWeight} from "react-icons/gi";
import {Link} from "react-router-dom";

import {
    Badge,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
} from "@mui/material";
import DeleteDialog from "../modals/DeleteDialog";
import {useStyles} from "../../helper/Constants";

const ReptileCard = ({
                         id,
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

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const toggleDeleteDialog = () => {
        setShowDeleteDialog(!showDeleteDialog);
    };



    return (
        <div>
            <DeleteDialog open={showDeleteDialog} toggleDeleteDialog={toggleDeleteDialog} name={name}
                          action={onDeleteReptile}/>
            <Card id={"reptile-card"}>
                <CardHeader
                    avatar={<Link to={`/reptileDetails/${id}`}> <Chip onClick={() => {
                    }} id={"reptile-card-name_badge"} variant="filled" label={name}/> </Link>}
                />
                <CardContent id={"reptile-card-body"}>
                    {image !== "" ? <CardMedia
                        id={"reptile-card-image"}
                        component={"img"}
                        image={image}

                    /> : <CardMedia
                        id={"reptile-card-image"}
                        component={"img"}
                        image={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/600px-No_image_available_600_x_450.svg.png?20150903195108"}
                    />}

                    <div className={"reptile-card-text"}>
                        <h2 className={"reptile-card-h2"}><span className={"reptile-card-span"}>Name:</span> {name}</h2>
                        <h2 className={"reptile-card-h2"}><span className={"reptile-card-span"}>Geburtstag:</span> {birthday}</h2>
                        <h2 className={"reptile-card-h2"}><span className={"reptile-card-span"}>Geschlecht:</span> {gender}</h2>
                        <h2 className={"reptile-card-h2"}><span className={"reptile-card-span"}>Spezies: </span> {species}</h2>
                        <h2 className={"reptile-card-h2"}><span className={"reptile-card-span"}>Typ: </span> {type}</h2>
                        <h2 className={"reptile-card-h2"}><span className={"reptile-card-span"}>Morph: </span>{morph}
                        </h2>
                        <div className={"reptile-card-badge_layout"}>
                            {weights[weights.length - 1] !== undefined &&
                            <h3><Badge className="reptile-card-last_badge"> <GiWeight size={"25px"}/>
                                {weights[weights.length - 1]._weight}g</Badge></h3>}

                            {feedings[feedings.length - 1] !== undefined &&
                            <h3><Badge className="reptile-card-last_badge"> <IoFastFoodOutline size={"25px"}/>
                                {feedings[feedings.length - 1]._date}</Badge></h3>}

                            {notes[notes.length - 1] !== undefined &&
                            <h3><Badge className="reptile-card-last_badge"> <FaStickyNote size={"25px"}/>
                                {notes[notes.length - 1]._note.substring(0, 30)}...</Badge></h3>}

                        </div>
                    </div>
                </CardContent>

                <CardActions id={"reptile-card-actions"}>

                    <div className={"reptile-card-buttons_Layout"}>
                        <Link to={`/reptileDetails/${id}`}>
                            <Button variant="contained" className={"reptile-card-details_button bg-info"}
                                    onClick={() => {
                                    }}> <MdSearch size={"25px"}/>
                            </Button>

                        </Link>

                        <Button variant="contained" className={"reptile-card-weight_button bg-success"} onClick={() => {
                            toggleWeightModal();
                            setReptileId(id)
                        }}> <GiWeight size={"25px"}/>
                        </Button>


                        <Button variant="contained" className={"reptile-card-note_button bg-success"} onClick={() => {
                            toggleNoteModal();
                            setReptileId(id)
                        }}> <FaStickyNote size={"25px"}/>
                        </Button>

                        <Button variant="contained" className={"reptile-card-feed_button bg-success"} onClick={() => {
                            toggleFeedingModal();
                            setReptileId(id)
                        }}> <IoRestaurantOutline size={"25px"}/>
                        </Button>

                        <div id="verticalLine"/>

                        <Button variant="contained" className={"reptile-card-edit_button"} onClick={() => {
                            setReptileId(id);
                            toggleReptileEditModal();
                        }}> <FiEdit size={"25px"}/>

                        </Button>
                        <Button variant="contained" className={"reptile-card-delete_button bg-danger"} onClick={() => {
                            toggleDeleteDialog()
                        }}> <MdDelete size={"25px"}/>
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default ReptileCard;


