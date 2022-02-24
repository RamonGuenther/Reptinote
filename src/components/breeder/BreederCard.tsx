import React from "react";
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
                         index

                     }: any) => {

    return(
        <div className="breeder-card-layout">
            <Card sx={{ maxWidth: 345 }}>
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
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default BreederCard;