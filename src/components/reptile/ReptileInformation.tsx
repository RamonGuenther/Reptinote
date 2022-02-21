import React, {useState} from "react";
import {Badge, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip} from "@mui/material";
import {Link} from "react-router-dom";
import {IoFastFoodOutline, IoRestaurantOutline} from "react-icons/io5";
import {MdDelete, MdSearch} from "react-icons/md";
import {GiWeight} from "react-icons/gi";
import {FaStickyNote} from "react-icons/fa";
import {FiEdit} from "react-icons/fi";

import "./reptileInformation.css"

const ReptileInformation = ({reptile}: any) => {


    return (
        <>

            <Card className={"reptileCardInformation"}>
                <CardContent className={""}>
                    <h2 className={"lel"}>{reptile.name}</h2>

                    <CardMedia
                        className={""}
                        component={"img"}
                        image={reptile.image}
                    />
                    <div className={"cardText"}>
                        <h2><span className={"cardTextSpan"}>Geburtstag:</span> {reptile.birthday}</h2>
                        <h2><span className={"cardTextSpan"}>Geschlecht:</span> {reptile.gender}</h2>
                        <h2><span className={"cardTextSpan"}>Spezies: </span> {reptile.species}</h2>
                        <h2><span className={"cardTextSpan"}>Typ: </span> {reptile.type}</h2>
                        <h2><span className={"cardTextSpan"}>Morph: </span>{reptile.morph}</h2>
                    </div>
                </CardContent>

                <CardActions className={"cardFooter"} >
                        <Button variant="contained" className={"detailsButton bg-info"} onClick={() => {
                        }}> <MdSearch size={"25px"}/>
                        </Button>
                </CardActions>
            </Card>
        </>

    )
}

export default ReptileInformation;