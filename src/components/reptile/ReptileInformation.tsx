import React, {useState} from "react";
import {Badge, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip} from "@mui/material";
import {MdDelete, MdSearch} from "react-icons/md";


import "./reptileInformation.css"

const ReptileInformation = ({reptile}: any) => {

    // function Test(){
    //     return(
    //         <h2> lel </h2>
    //     )
    // }

    return (
        <>

            <Card className={"reptileCardInformation"}>
                    <h2 className={"reptilName"}>{reptile.name}</h2>
                    <h2 className={"reptileSpeciesType"}>{reptile.species} | {reptile.type}</h2>

                {/*<CardHeader*/}
                {/*    title="Shrimp and Chorizo Paella"*/}
                {/*    subheader="September 14, 2016"*/}
                {/*>*/}

                {/*</CardHeader>*/}
                <CardMedia
                    className={"img"}
                    component={"img"}
                    image={reptile.image}
                />
                <CardContent className={""}>
                    <div className={"cardText"}>
                        {/*TODO: WIe ivonne machen einfach und unten Tabelle benutzen für die Beschriftung*/}

                        <h2><span className={"cardTextSpan"}>Geburtstag:</span> {reptile.birthday}</h2>
                        <h2><span className={"cardTextSpan"}>Geschlecht:</span> {reptile.gender}</h2>
                        <h2><span className={"cardTextSpan"}>Morph: </span>{reptile.morph}</h2>
                        <h2><span className={"cardTextSpan"}>Letzte Fütterung: </span> {reptile.birthday}</h2>
                        <h2><span className={"cardTextSpan"}>Gewicht: </span> {reptile.gender}</h2>
                        <h2><span className={"cardTextSpan"}>Aktuellste Notiz:  </span>{reptile.morph}</h2>

                    </div>
                </CardContent>

                {!reptile._breeder.name? <Button> Züchter hinzufügen</Button> : ""}
                <CardActions className={"cardFooter"} >
                        <Button variant="contained" className={"detailsButton bg-info"} onClick={() => {
                        }}> <MdSearch size={"25px"}/>
                        </Button>

                    {}
                </CardActions>
            </Card>
        </>

    )
}

export default ReptileInformation;