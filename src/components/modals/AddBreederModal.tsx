import React from "react";
import "./addBreederModal.css"
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider, FormControl,
    TextField
} from "@mui/material";
import {useStyles} from "../../helper/Constants";


const AddBreederModal = ({
                             showAddBreederModal,
                             toggleAddBreederModal,
                             handleInputChange,
                             values,
                             submit,
                         }: any) => {

    const classes = useStyles();

    return (
        <>
            <Dialog open={showAddBreederModal} onClose={toggleAddBreederModal}>
                <DialogTitle className={"add-breeder-modal-title"}>
                    Züchter hinzufügen
                </DialogTitle>
                <DialogContent className={"add-breeder-modal-content"}>
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
                            required
                            InputLabelProps={{
                                style: { color: '#ffffff'},
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
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
                <DialogActions className={"add-breeder-modal-actions"}>
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
