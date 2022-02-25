import React, {useEffect} from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import "./breedercard.css"


const BreederCard = ({
                         id,
                         companyName,
                         firstName,
                         lastName,
                         street,
                         postal,
                         place,
                         country,
                         email,
                         phone,
                         deleteBreeder,
                         findBreederId,

                     }: any) => {


    return(
        <div className="breeder-card-layout">
            <Card id="breeder-card">
                <CardContent>
                    Firma: {companyName}
                    {firstName}
                    {lastName}
                    {street}
                    {postal}
                    {place}
                    {country}
                    {email}
                    {phone}
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={()=>{deleteBreeder(id)}}>Löschen</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default BreederCard;