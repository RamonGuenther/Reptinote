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


const AddReptileModal = ({
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
                        {/*value= textinput = TwoWayDatabinding für das resetten */}

                        {/*<div>*/}
                        {/*    <img src={image}/>*/}
                        {/*    <h1>Select Image</h1>*/}
                        {/*    <input type="file" name="myImage" onChange={onImageChange}/>*/}
                        {/*</div>*/}
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
                        <FormControl className={"mt-3"}  fullWidth>
                            <InputLabel id="demo-simple-select-label" required>Geschlecht</InputLabel>
                            <MuiSelect
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedGenderOption ? selectedGenderOption : ""}
                                label="Geschlecht"
                                onChange={handleGenderSelect}

                            >
                                <MenuItem value={optionsGender[0]}>{optionsGender[0]}</MenuItem>
                                <MenuItem value={optionsGender[1]}>{optionsGender[1]}</MenuItem>
                                <MenuItem value={optionsGender[2]}>{optionsGender[2]}</MenuItem>
                            </MuiSelect>
                        </FormControl>

                        <FormControl className={"mt-3"}  fullWidth>
                            <InputLabel id="demo-simple-select-label" required>Spezies</InputLabel>
                            <MuiSelect
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
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
                    <Button onClick={submit}>Reptil hinzufügen</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default AddReptileModal;


//.dialog{
//     width: 600px;
//     background-color: #9a8e8e;
// }