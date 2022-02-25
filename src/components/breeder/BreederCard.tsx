import React, {useEffect} from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import "./breedercard.css"
import DeleteDialog from "../modals/DeleteDialog";


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
                         toggleEditBreederModal,
                         setBreederId,


                         toggleDeleteDialog,
    showDeleteDialog

                     }: any) => {


    return (
        <div className="breeder-card-layout">

            <DeleteDialog open={showDeleteDialog} toggleDeleteDialog={toggleDeleteDialog} action={deleteBreeder}
                          name={" "}/>

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
                    <Button size="small" onClick={() => {
                        setBreederId(id);
                        toggleDeleteDialog()
                    }}>Löschen</Button>
                    <Button size="small" onClick={() => {
                        setBreederId(id);
                        toggleEditBreederModal()
                    }}>editieren</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default BreederCard;