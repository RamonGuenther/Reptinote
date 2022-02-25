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


const EditReptileModal = ({
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
            <Dialog open={basicModal} onClose={toggleShow}>
                <DialogTitle>
                    Reptil Bearbeiten
                    <Button className='btn-close' onClick={toggleShow}/>
                </DialogTitle>
                <Divider/>

                <DialogContent style={{width: "500px"}}>
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
                            />
                            <TextField
                                className={"mt-3"}
                                value={values.birthday}
                                onChange={handleInputChange}
                                type="text"
                                label={"Geburtstag"}
                                name="birthday"
                                placeholder="Geburtstag des Reptils..."
                            />
                            <TextField
                                className={"mt-3"}
                                value={values.type}
                                onChange={handleInputChange}
                                label={"Art"}
                                name="type"
                                type="text"
                                placeholder="Art des Reptils..."
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
                        <FormControl className={"mt-3"} fullWidth>
                            <InputLabel>Geschlecht</InputLabel>
                            <MuiSelect
                                value={selectedGenderOption ? selectedGenderOption : ""}
                                label="Geschlecht"
                                onChange={handleGenderSelect}
                            >
                                <MenuItem value={optionsGender[0]}>{optionsGender[0]}</MenuItem>
                                <MenuItem value={optionsGender[1]}>{optionsGender[1]}</MenuItem>
                                <MenuItem value={optionsGender[2]}>{optionsGender[2]}</MenuItem>
                            </MuiSelect>
                        </FormControl>

                        <FormControl className={"mt-3"} fullWidth>
                            <InputLabel>Spezies</InputLabel>
                            <MuiSelect
                                value={selectedSpeciesOption ? selectedSpeciesOption : ""}
                                label="Spezies"
                                onChange={handleSpeciesSelect}
                            >
                                <MenuItem value={optionsSpecies[0]}>{optionsSpecies[0]}</MenuItem>
                                <MenuItem value={optionsSpecies[1]}>{optionsSpecies[1]}</MenuItem>
                                <MenuItem value={optionsSpecies[2]}>{optionsSpecies[2]}</MenuItem>
                                <MenuItem value={optionsSpecies[3]}>{optionsSpecies[3]}</MenuItem>
                                <MenuItem value={optionsSpecies[4]}>{optionsSpecies[4]}</MenuItem>
                                <MenuItem value={optionsSpecies[5]}>{optionsSpecies[5]}</MenuItem>
                                <MenuItem value={optionsSpecies[6]}>{optionsSpecies[6]}</MenuItem>

                            </MuiSelect>
                        </FormControl>
                    </form>
                </DialogContent>
                <Divider/>

                <DialogActions>
                    <Button color='secondary' onClick={toggleShow}>
                        Abbrechen
                    </Button>
                    <Button onClick={submit}>Reptil Speichern</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}


export default EditReptileModal;