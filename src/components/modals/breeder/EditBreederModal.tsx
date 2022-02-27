import React from "react";
import "../modal.css"
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider, FormControl,
    TextField
} from "@mui/material";


const EditBreederModal = ({
                              showEditBreederModal,
                              toggleEditBreederModal,
                              handleInputChange,
                              values,
                              submit,
                          }: any) => {
    return (
        <>
            <Dialog open={showEditBreederModal} onClose={toggleEditBreederModal}>
                <DialogTitle className={"modal-title"}>
                    Züchter bearbeiten
                </DialogTitle>
                <Divider/>
                <DialogContent className={"modal-content"} style={{width: "500px"}}>
                    <form>
                        <FormControl fullWidth>
                            <TextField
                                className={"mt-3"}
                                value={values.companyName}
                                onChange={handleInputChange}
                                name="companyName" //TODO: ohne name Attribut funktioniert es nicht
                                type="text"
                                label={"Firmenname"}
                                placeholder="Name der Firma des Züchters..."
                            />
                            <TextField
                                className={"mt-3"}
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
                                value={values.street}
                                label={"Straße"}
                                onChange={handleInputChange}
                                name="street"
                                type="text"
                                placeholder="Straße..."
                            />
                            <TextField
                                className={"mt-3"}
                                value={values.postal}
                                label={"Postleizahl"}
                                onChange={handleInputChange}
                                name="postal"
                                type="text"
                                placeholder="Postleitzahl..."
                            />
                            <TextField
                                className={"mt-3"}
                                value={values.place}
                                label={"Ort"}
                                onChange={handleInputChange}
                                name="place"
                                type="text"
                                placeholder="Ort..."
                            />
                            <TextField
                                className={"mt-3"}
                                value={values.country}
                                label={"Land"}
                                onChange={handleInputChange}
                                name="country"
                                type="text"
                                placeholder="Land..."
                            />
                            <TextField
                                className={"mt-3"}
                                value={values.mail}
                                label={"Email"}
                                onChange={handleInputChange}
                                name="mail"
                                type="text"
                                placeholder="Email..."
                            />
                            <TextField
                                className={"mt-3"}
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
                <Divider/>
                <DialogActions className={"modal-actions"}>
                    <Button color='secondary' onClick={toggleEditBreederModal}>
                        Abbrechen
                    </Button>
                    <Button onClick={submit}>Züchter hinzufügen</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default EditBreederModal;
