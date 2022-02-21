import React from "react";

import {ToastContainer} from 'react-toastify';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField} from "@mui/material";

import AdapterDateFns from '@mui/lab/AdapterDateFns';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {LocalizationProvider} from "@mui/lab";


const AddWeightModal = ({
                            toggleShow,
                            basicModal,
                            setBasicModal,
                            submit,
                            index,
                            startDate,
                            setStartDate,
                            inputWeight,
                            changeWeight

                        }: any) => {

    return (
        <>
            <Dialog open={basicModal} onClose={toggleShow}>
                <DialogTitle>
                    Gewicht hinzufügen
                    <Button className='btn-close' onClick={toggleShow}/>
                </DialogTitle>
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
                        />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Datum der Messung"
                                    inputFormat="MM/dd/yyyy"
                                    value={startDate}
                                    onChange={setStartDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                            </LocalizationProvider>
                        </FormControl>
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button color='secondary' onClick={toggleShow}>
                        Abbrechen
                    </Button>
                    <Button onClick={(e: any) => {
                        submit(e, index)
                    }}>Fütterung hinzufügen</Button>


                </DialogActions>
            </Dialog>
            <ToastContainer
            />

        </>
    )
}


export default AddWeightModal;