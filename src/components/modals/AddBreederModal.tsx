import React from "react";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select as MuiSelect, TextField
} from "@mui/material";
import {optionsGender, optionsSpecies} from "../../helper/Constants";


const AddBreederModal = ({
                             toggleShow,
                             basicModal,
                             handleInputChange,
                             values,
                             submit,
                             selectedGenderOption,
                             handleGenderSelect,
                             selectedSpeciesOption,
                             handleSpeciesSelect,
                         }: any) => {
    return (
        <>
            <Button variant="outlined" onClick={toggleShow}>Reptil hinzufügen</Button>

            <Dialog  open={basicModal} onClose={toggleShow}>
                <DialogTitle>
                    Reptil hinzufügen
                    <Button className='btn-close' onClick={toggleShow}/>
                </DialogTitle>
                <Divider/>
                <DialogContent className={"dialog"}>
                    <form>
                        <FormControl fullWidth>
                            <TextField
                                className={"mt-3"}
                                value={values.name}
                                onChange={handleInputChange}
                                name="name" //TODO: ohne name Attribut funktioniert es nicht
                                type="text"
                                label={"Name"}
                                placeholder="Name des Reptils..."
                                required
                            />
                            <TextField
                                className={"mt-3"}
                                value={values.birthday}
                                onChange={handleInputChange}
                                type="text"
                                label={"Geburtstag"}
                                name="birthday"
                                placeholder="Geburtstag des Reptils..."
                                required
                            />
                            <TextField
                                className={"mt-3"}
                                value={values.type}
                                onChange={handleInputChange}
                                label={"Art"}
                                name="type"
                                type="text"
                                placeholder="Art des Reptils..."
                                required
                            />
                            <TextField
                                className={"mt-3"}
                                value={values.morph}
                                label={"Morph"}
                                onChange={handleInputChange}
                                name="morph"
                                type="text"
                                placeholder="Morph des Reptils..."
                            />
                            <TextField
                                className={"mt-3"}
                                value={values.image}
                                label={"Bild"}
                                onChange={handleInputChange}
                                name="image"
                                type="text"
                                placeholder="Image Url eingeben"
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button color='secondary' onClick={toggleShow}>
                        Abbrechen
                    </Button>
                    <Button onClick={submit}>Reptil hinzufügen</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default AddBreederModal;
