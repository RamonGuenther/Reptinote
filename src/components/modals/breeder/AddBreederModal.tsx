import React from "react";
import "../modal.css"
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider, FormControl,
    TextField
} from "@mui/material";


const AddBreederModal = ({
                             showAddBreederModal,
                             toggleAddBreederModal,
                             handleInputChange,
                             values,
                             submit,
                         }: any) => {

    return (
        <>
            <Dialog open={showAddBreederModal} onClose={toggleAddBreederModal}>
                <DialogTitle className={"modal-title"}>
                    Züchter hinzufügen
                </DialogTitle>
                <Divider/>
                <DialogContent className={"modal-content"} style={{width: "500px"}}>
                    <form>
                        <FormControl fullWidth>
                            <TextField
                                className={"ivonne mt-3"}
                                id={"add-breeder-modal-company"}
                                value={values.companyName}
                                onChange={handleInputChange}
                                name="companyName" //TODO: ohne name Attribut funktioniert es nicht
                                type="text"
                                label={"Firmenname"}
                                placeholder="Name der Firma des Züchters..."
                            />
                            <TextField
                                className={"mt-3"}
                                id={"add-breeder-modal-firstname"}
                                value={values.firstName}
                                onChange={handleInputChange}
                                type="text"
                                label={"Vorname"}
                                name="firstName"
                                placeholder="Vorname des Züchters..."
                                required
                            />
                            <TextField
                                className={"mt-3"}
                                id={"add-breeder-modal-lastname"}
                                value={values.lastName}
                                onChange={handleInputChange}
                                label={"Nachname"}
                                name="lastName"
                                type="text"
                                placeholder="Nachname des Züchters..."
                                required
                            />
                            <TextField
                                className={"mt-3"}
                                id={"add-breeder-modal-street"}
                                value={values.street}
                                label={"Straße"}
                                onChange={handleInputChange}
                                name="street"
                                type="text"
                                placeholder="Straße..."
                            />
                            <TextField
                                className={"mt-3"}
                                id={"add-breeder-modal-postal"}
                                value={values.postal}
                                label={"Postleizahl"}
                                onChange={handleInputChange}
                                name="postal"
                                type="text"
                                placeholder="Postleitzahl..."
                            />
                            <TextField
                                className={"mt-3"}
                                id={"add-breeder-modal-place"}
                                value={values.place}
                                label={"Ort"}
                                onChange={handleInputChange}
                                name="place"
                                type="text"
                                placeholder="Ort..."
                            />
                            <TextField
                                className={"mt-3"}
                                id={"add-breeder-modal-country"}
                                value={values.country}
                                label={"Land"}
                                onChange={handleInputChange}
                                name="country"
                                type="text"
                                placeholder="Land..."
                            />
                            <TextField
                                className={"mt-3"}
                                id={"add-breeder-modal-mail"}
                                value={values.mail}
                                label={"Email"}
                                onChange={handleInputChange}
                                name="mail"
                                type="text"
                                placeholder="Email..."
                            />
                            <TextField
                                className={"mt-3"}
                                id={"add-breeder-modal-phone"}
                                value={values.phone}
                                label={"Telefonnummer"}
                                onChange={handleInputChange}
                                name="phone"
                                type="text"
                                placeholder="Telefonnummer..."
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions className={"modal-actions"}>
                    <Button color='secondary' onClick={toggleAddBreederModal}>
                        Abbrechen
                    </Button>
                    <Button onClick={submit}>Züchter hinzufügen</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default AddBreederModal;
