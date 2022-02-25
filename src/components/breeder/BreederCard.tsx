import React, {useEffect} from "react";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    Typography
} from "@mui/material";
import "./breedercard.css"
import {FiEdit} from "react-icons/fi";
import {MdDelete} from "react-icons/md";


const BreederCard = ({
                         id,
                         companyName,
                         firstName,
                         lastName,
                         street,
                         postal,
                         place,
                         country,
                         mail,
                         phone,
                         toggleEditBreederModal,
                         setBreederId,
                         toggleDeleteDialog,

                     }: any) => {


    return (
        <div className="breeder-card-layout">
            <Card id="breeder-card">

                <CardContent className={"breeder-card-content"}>


                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Name:</span> {lastName + ", " + firstName}
                    </h2>

                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Firma:</span> {companyName}
                    </h2>

                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Adresse:</span> {street}
                    </h2>

                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Ort: </span> {postal + " " + place}
                    </h2>

                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Land: </span> {country}
                    </h2>

                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Email: </span>{mail}
                    </h2>

                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Tel.-Nr.: </span>{phone}
                    </h2>
                </CardContent>
                <CardActions id={"breeder-card-actions"}>
                    <div className={"breeder-card-button_layout"}>
                        <Button size="small" className={"breeder-card-edit_button"} onClick={() => {
                            setBreederId(id);
                            toggleEditBreederModal()
                        }}><FiEdit size={"25px"}/></Button>
                        <Button size="small" className={"breeder-card-delete_button"} onClick={function () {
                            setBreederId(id);
                            toggleDeleteDialog()
                        }}><MdDelete size={"25px"}/></Button>

                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default BreederCard;