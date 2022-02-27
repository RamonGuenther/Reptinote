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

const ReptileCard = ({

                         reptile,
                         onDeleteReptile,
                         toggleWeightModal,
                         toggleNoteModal,
                         toggleFeedingModal,
                         setReptileId,
                         toggleReptileEditModal
                     }: any) => {

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const toggleDeleteDialog = () => {
        setShowDeleteDialog(!showDeleteDialog);
    };


    return (
        <div>
            <DeleteDialog open={showDeleteDialog} toggleDeleteDialog={toggleDeleteDialog} name={reptile.name}
                          action={onDeleteReptile}/>
            <Card id={"reptile-card"}>
                <CardHeader
                    avatar={<Link to={`/reptileDetails/${reptile.id}`}> <Chip onClick={() => {
                    }} id={"reptile-card-name_badge"} variant="filled" label={reptile.name}/> </Link>}
                />
                <CardContent id={"reptile-card-body"}>
                    {reptile.image !== "" ? <CardMedia
                        id={"reptile-card-image"}
                        component={"img"}
                        image={reptile.image}

                    /> : <CardMedia
                        id={"reptile-card-image"}
                        component={"img"}
                        image={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/600px-No_image_available_600_x_450.svg.png?20150903195108"}
                    />}

                    <div className={"reptile-card-text"}>
                        <h2 className={"reptile-card-h2"}><span className={"reptile-card-span"}>Name:</span> {reptile.name}</h2>
                        <h2 className={"reptile-card-h2"}><span
                            className={"reptile-card-span"}>Geburtstag:</span> {reptile.birthday}</h2>
                        <h2 className={"reptile-card-h2"}><span
                            className={"reptile-card-span"}>Geschlecht:</span> {reptile.gender}</h2>
                        <h2 className={"reptile-card-h2"}><span
                            className={"reptile-card-span"}>Spezies: </span> {reptile.species}</h2>
                        <h2 className={"reptile-card-h2"}><span className={"reptile-card-span"}>Typ: </span> {reptile.type}</h2>
                        <h2 className={"reptile-card-h2"}><span className={"reptile-card-span"}>Morph: </span>{reptile.morph}
                        </h2>
                        <div className={"reptile-card-badge_layout"}>
                            {reptile.weights[reptile.weights.length - 1] !== undefined &&
                            <h3><Badge className="reptile-card-last_badge"> <GiWeight size={"25px"}/>
                                {reptile.weights[reptile.weights.length - 1]._weight}g</Badge></h3>}

                            {reptile.feedings[reptile.feedings.length - 1] !== undefined &&
                            <h3><Badge className="reptile-card-last_badge"> <IoFastFoodOutline size={"25px"}/>
                                {reptile.feedings[reptile.feedings.length - 1]._date}</Badge></h3>}

                            {reptile.notes[reptile.notes.length - 1] !== undefined &&
                            <h3><Badge className="reptile-card-last_badge"> <FaStickyNote size={"25px"}/>
                                {reptile.notes[reptile.notes.length - 1]._note.substring(0, 30)}...</Badge></h3>}

                        </div>
                    </div>
                </CardContent>

                <CardActions id={"reptile-card-actions"}>

                    <div className={"reptile-card-buttons_Layout"}>

                        <Link to={`/reptileDetails/${reptile.id}`}>
                            <Button variant="contained" className={"reptile-card-buttons bg-info"}
                                    onClick={() => {
                                    }}> <MdSearch size={"25px"}/>
                            </Button>

                        </Link>

                        <Button variant="contained" className={"reptile-card-buttons bg-success"} onClick={() => {
                            toggleWeightModal();
                            setReptileId(reptile.id)
                        }}> <GiWeight size={"25px"}/>
                        </Button>


                        <Button variant="contained" className={"reptile-card-buttons bg-success"} onClick={() => {
                            toggleNoteModal();
                            setReptileId(reptile.id)
                        }}> <FaStickyNote size={"25px"}/>
                        </Button>

                        <Button variant="contained" className={"reptile-card-buttons bg-success"} onClick={() => {
                            toggleFeedingModal();
                            setReptileId(reptile.id)
                        }}> <IoRestaurantOutline size={"25px"}/>
                        </Button>

                        <div id="verticalLine"/>

                        <Button variant="contained" className={"reptile-card-buttons"} onClick={() => {
                            setReptileId(reptile.id);
                            toggleReptileEditModal();
                        }}> <FiEdit size={"25px"}/>

                        </Button>
                        <Button variant="contained" className={"reptile-card-buttons bg-danger"} onClick={() => {
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


