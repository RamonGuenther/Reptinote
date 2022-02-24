import React from "react";

import {ToastContainer} from 'react-toastify';
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
                <DialogTitle>
                    Gewicht hinzufügen
                    <Button className='btn-close' onClick={toggleAddWeightModal}/>
                </DialogTitle>
                <Divider/>

                <DialogContent>
                    <form>
                        <FormControl fullWidth>

                        <TextField
                            className={"mt-3 mb-3"}
                            value={inputWeight}
                            onChange={changeWeight}
                            type="text"
                            label={"Gewicht"}
                            placeholder="Aktuelles Gewicht des Reptils..."
                            InputProps={
                                {endAdornment : <InputAdornment position="end">g</InputAdornment>,}
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

                <DialogActions>
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