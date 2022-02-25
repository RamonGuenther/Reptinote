import React from "react";
import "./addBreederModal.css"
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider,
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
                <DialogTitle>
                    Züchter bearbeiten
                    <Button className='btn-close' onClick={toggleEditBreederModal}/>
                </DialogTitle>
                <Divider/>
                <DialogContent className={"dialog"}>
                    <form>
                        <div className={"test"}>
                            <div>
                                <TextField
                                    className={"mt-3"}
                                    value={values.companyName}
                                    onChange={handleInputChange}
                                    name="companyName" //TODO: ohne name Attribut funktioniert es nicht
                                    type="text"
                                    label={"Firmenname"}
                                    placeholder="Name der Firma des Züchters..."
                                    required
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
                            </div>
                            <div>
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
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <Divider/>
                <DialogActions>
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
