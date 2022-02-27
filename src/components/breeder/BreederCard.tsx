import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
} from "@mui/material";
import "./breedercard.css"
import {FiEdit} from "react-icons/fi";
import {MdDelete} from "react-icons/md";


const BreederCard = ({
                         breeder,
                         toggleEditBreederModal,
                         setBreederId,
                         toggleDeleteDialog,
                     }: any) => {

    return (
        <div className="breeder-card-layout">
            <Card id="breeder-card">

                <CardContent className={"breeder-card-content"}>


                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Name:</span> {breeder.lastName + ", " + breeder.firstName}
                    </h2>

                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Firma:</span> {breeder.companyName}
                    </h2>

                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Adresse:</span> {breeder.street}
                    </h2>

                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Ort: </span> {breeder.postal + " " + breeder.place}
                    </h2>

                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Land: </span> {breeder.country}
                    </h2>

                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Email: </span>{breeder.mail}
                    </h2>

                    <h2 className={"breeder-card-h2"}>
                        <span className={"breeder-card-span"}>Tel.-Nr.: </span>{breeder.phone}
                    </h2>
                </CardContent>
                <CardActions id={"breeder-card-actions"}>
                    <div className={"breeder-card-button_layout"}>
                        <Button size="small" className={"breeder-card-edit_button"} onClick={() => {
                            setBreederId(breeder.id);
                            toggleEditBreederModal()
                        }}><FiEdit size={"25px"}/></Button>
                        <Button size="small" className={"breeder-card-delete_button"} onClick={function () {
                            setBreederId(breeder.id);
                            toggleDeleteDialog()
                        }}><MdDelete size={"25px"}/></Button>

                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default BreederCard;