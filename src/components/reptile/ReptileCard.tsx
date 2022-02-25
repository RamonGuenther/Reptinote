import React from "react";
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

    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

    const toggleDeleteDialog = () => {
        setShowDeleteDialog(!showDeleteDialog);
    };


    return (
        <div>
            <DeleteDialog open={showDeleteDialog} toggleDeleteDialog={toggleDeleteDialog} name ={name} action = {onDeleteReptile}/>
            <Card id={"reptile-card"}>
                <CardHeader
                    avatar={<Link to={`/reptileDetails/${id}`}> <Chip onClick={() => {
                    }} className={"nameBadge"} variant="outlined" label={name}/> </Link>}
                />
                <CardContent id={"reptile-card-body"}>
                    {image !== "" ? <CardMedia
                        className={"image"}
                        component={"img"}
                        image={image}

                    /> : <CardMedia
                        className={"image"}
                        component={"img"}
                        image={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/600px-No_image_available_600_x_450.svg.png?20150903195108"}
                    />}

                    <div className={"reptile-card-text"}>
                        <h2><span className={"cardTextSpan"}>Name:</span> {name}</h2>
                        <h2><span className={"cardTextSpan"}>Geburtstag:</span> {birthday}</h2>
                        <h2><span className={"cardTextSpan"}>Geschlecht:</span> {gender}</h2>
                        <h2><span className={"cardTextSpan"}>Spezies: </span> {species}</h2>
                        <h2><span className={"cardTextSpan"}>Typ: </span> {type}</h2>
                        <h2><span className={"cardTextSpan"}>Morph: </span>{morph}</h2>
                        <div className={"badgeLayout"}>
                            {weights[weights.length - 1] !== undefined &&
                            <h3><Badge className={"lastWeightBadge"}> <GiWeight size={"25px"}/>
                                {weights[weights.length - 1]._weight}g</Badge></h3>}

                            {feedings[feedings.length - 1] !== undefined &&
                            <h3><Badge className={"lastFeedingBadge"}> <IoFastFoodOutline size={"25px"}/>
                                {feedings[feedings.length - 1]._date}</Badge></h3>}

                            {notes[notes.length - 1] !== undefined &&
                            <h3><Badge className={"lastNoteBadge"}> <FaStickyNote size={"25px"}/>
                                {notes[notes.length - 1]._note.substring(0, 30)}...</Badge></h3>}

                        </div>
                    </div>
                </CardContent>

                <CardActions className={"cardFooter"}>

                    <div className={"buttonsLayout"}>
                        <Link to={`/reptileDetails/${id}`}>
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


