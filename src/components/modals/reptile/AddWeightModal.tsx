import React from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl, InputAdornment,
    TextField
} from "@mui/material";

import AdapterDateFns from '@mui/lab/AdapterDateFns';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {LocalizationProvider} from "@mui/lab";


const AddWeightModal = ({
                            toggleAddWeightModal,
                            showAddWeightModal,
                            submit,
                            startDate,
                            setStartDate,
                            inputWeight,
                            changeWeight

                        }: any) => {

    return (
        <>
            <Dialog open={showAddWeightModal} onClose={toggleAddWeightModal}>
                <DialogTitle className={"modal-title"}>
                    Gewicht hinzufügen
                </DialogTitle>
                <Divider/>
                <DialogContent className={"modal-content"} style={{width: "400px"}}>
                    <form>
                        <FormControl fullWidth>
                            <TextField
                                className={"mt-2 mb-4"}
                                value={inputWeight}
                                onChange={changeWeight}
                                type="text"
                                label={"Gewicht"}
                                helperText={"Numerische Werte"}
                                placeholder="Aktuelles Gewicht des Reptils..."
                                InputProps={
                                    {endAdornment: <InputAdornment position="end">g</InputAdornment>,}
                                }
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Datum der Messung"
                                    inputFormat="MM/dd/yyyy"
                                    value={startDate}
                                    onChange={setStartDate}
                                    renderInput={(params) => <TextField {...params} required/>}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </form>
                </DialogContent>
                <Divider/>
                <DialogActions className={"modal-actions"}>
                    <Button color='secondary' onClick={toggleAddWeightModal}>
                        Abbrechen
                    </Button>
                    <Button onClick={submit}> Fütterung hinzufügen</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}


export default AddWeightModal;