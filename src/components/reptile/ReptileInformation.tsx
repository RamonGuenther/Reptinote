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

    const [open, setOpen] = React.useState(false);

    const toggleDeleteDialog = () => {
        setOpen(!open);
    };




    return (
        <>
            <DeleteDialog open={open} toggleDeleteDialog={toggleDeleteDialog} action = {deleteReptile} name ={reptile.name} />

            <Card id={"reptile-information-card"}>
                    <h2 id={"reptile-information-name"}>{reptile.name}</h2>
                    <h2 id={"reptile-information-species_type"}>{reptile.species} | {reptile.type}</h2>

                {/*<CardHeader*/}
                {/*    title="Shrimp and Chorizo Paella"*/}
                {/*    subheader="September 14, 2016"*/}
                {/*>*/}

                {/*</CardHeader>*/}

                <CardContent className={"reptileInfoContent"}>
                    <CardMedia
                        id={"reptile-information-image"}
                        component={"img"}
                        image={reptile.image}
                    />
                    <div className={"cardText"}>
                        {/*TODO: WIe ivonne machen einfach und unten Tabelle benutzen für die Beschriftung*/}

                        <h2><span className={"cardTextSpan"}>Geburtstag:</span> {reptile.birthday}</h2>
                        <h2><span className={"cardTextSpan"}>Geschlecht:</span> {reptile.gender}</h2>
                        <h2><span className={"cardTextSpan"}>Morph: </span>{reptile.morph}</h2>
                        <h2><span className={"cardTextSpan"}>Letzte Fütterung: </span> {reptile.birthday}</h2>
                        <h2><span className={"cardTextSpan"}>Gewicht: </span> {reptile.gender}</h2>
                        <h2><span className={"cardTextSpan"}>Aktuellste Notiz:  </span>{reptile.morph}</h2>

                    </div>
                    {/*{!reptile._breeder.name? <Button > Züchter hinzufügen</Button> : ""}*/}

                </CardContent>

                <CardActions className={"reptileInfoActions"} >
                        <Button variant="contained" className={"detailsButton bg-info"} onClick={() => {
                         toggleDeleteDialog()}}> <MdDelete size={"25px"}/>
                        </Button>

                    {}
                </CardActions>
            </Card>
        </>

    )
}

export default ReptileInformation;