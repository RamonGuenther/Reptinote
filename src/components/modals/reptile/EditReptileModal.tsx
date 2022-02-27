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
import {optionsGender, optionsSpecies} from "../../../helper/Constants";


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
                              selectedBreederOption,
                              handleBreederSelect,
                              breeders,
                          }: any) => {
    return (
        <>
            <Dialog open={basicModal} onClose={toggleShow}>
                <DialogTitle className={"modal-title"}>
                    Reptil Bearbeiten
                </DialogTitle>
                <Divider/>
                <DialogContent className={"modal-content"} style={{width: "500px"}}>
                    <form>
                        <FormControl fullWidth>
                            <TextField
                                className={"mt-3"}
                                value={values.name}
                                onChange={handleInputChange}
                                name="name"
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
                            <InputLabel required>Geschlecht</InputLabel>
                            <MuiSelect
                                value={selectedGenderOption ? selectedGenderOption : ""}
                                label="Geschlecht"
                                onChange={handleGenderSelect}
                            >
                                {optionsGender.map((item: string, index: number) => {
                                    return <MenuItem key={index} value={item}> {item} </MenuItem>
                                })}
                            </MuiSelect>
                        </FormControl>

                        <FormControl className={"mt-3"} fullWidth>
                            <InputLabel required>Spezies</InputLabel>
                            <MuiSelect
                                value={selectedSpeciesOption ? selectedSpeciesOption : ""}
                                label="Spezies"
                                onChange={handleSpeciesSelect}
                            >
                                {optionsSpecies.map((item: string, index: number) => {
                                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                                })}
                            </MuiSelect>
                        </FormControl>

                        <FormControl className={"mt-3"} fullWidth>
                            <InputLabel required>Züchter</InputLabel>
                            <MuiSelect
                                value={selectedBreederOption ? selectedBreederOption : ""}
                                label="Spezies"
                                onChange={handleBreederSelect}
                            >
                                {breeders.map((item: any, index: number) => {
                                    return <MenuItem key={index} value={item.lastName}>
                                        {item.lastName}
                                    </MenuItem>
                                })}
                            </MuiSelect>
                        </FormControl>

                    </form>
                </DialogContent>
                <Divider/>
                <DialogActions className={"modal-actions"}>
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