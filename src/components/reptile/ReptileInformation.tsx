import React, {useState} from "react";
import {Badge, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip} from "@mui/material";
import {MdDelete, MdSearch} from "react-icons/md";


import "./reptileInformation.css"
import DeleteDialog from "../modals/DeleteDialog";

const ReptileInformation = ({reptile, deleteReptile}: any) => {

    // function Test(){
    //     return(
    //         <h2> lel </h2>
    //     )
    // }

    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

    const toggleDeleteDialog = () => {
        setShowDeleteDialog(!showDeleteDialog);
    };


    return (
        <>
            <DeleteDialog open={showDeleteDialog} toggleDeleteDialog={toggleDeleteDialog} action={deleteReptile}
                          name={reptile.name}/>

            <Card id={"reptile-information-card"}>
                <h2 id={"reptile-information-name"}>{reptile.name}</h2>
                <h2 id={"reptile-information-species_type"}>{reptile.species} | {reptile.type}</h2>

                {/*<CardHeader*/}
                {/*    title="Shrimp and Chorizo Paella"*/}
                {/*    subheader="September 14, 2016"*/}
                {/*>*/}

                {/*</CardHeader>*/}

                <CardContent className={"reptileInfoContent"}>
                    {reptile.image !== "" ? <CardMedia
                        className={"image"}
                        component={"img"}
                        image={reptile.image}

                    /> : <CardMedia
                        className={"image"}
                        component={"img"}
                        image={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/600px-No_image_available_600_x_450.svg.png?20150903195108"}
                    />}
                    <div className={"reptile-information-card-text"}>
                        {/*TODO: WIe ivonne machen einfach und unten Tabelle benutzen für die Beschriftung*/}

                        <div>
                            <h2><span className={"cardTextSpan"}>Geburtstag:</span> {reptile.birthday}</h2>
                            <h2><span className={"cardTextSpan"}>Geschlecht:</span> {reptile.gender}</h2>
                            <h2><span className={"cardTextSpan"}>Morph: </span>{reptile.morph}</h2>
                        </div>

                        <div>
                            <h2><span className={"cardTextSpan"}>Letzte Fütterung: </span> {reptile.birthday}</h2>
                            <h2><span className={"cardTextSpan"}>Gewicht: </span> {reptile.gender}</h2>
                            <h2><span className={"cardTextSpan"}>Aktuellste Notiz:  </span>{reptile.morph}</h2>
                        </div>

                    </div>
                    {/*{!reptile._breeder.name? <Button > Züchter hinzufügen</Button> : ""}*/}

                </CardContent>

                <CardActions className={"reptileInfoActions"}>
                    <Button variant="contained" className={"detailsButton bg-info"} onClick={() => {
                        toggleDeleteDialog()
                    }}> <MdDelete size={"25px"}/>
                    </Button>

                    {}
                </CardActions>
            </Card>
        </>

    )
}

export default ReptileInformation;