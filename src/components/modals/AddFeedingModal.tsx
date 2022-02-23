import React from "react";
import {ToastContainer} from 'react-toastify';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField} from "@mui/material";

import AdapterDateFns from '@mui/lab/AdapterDateFns';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {LocalizationProvider} from "@mui/lab";


const AddFeedingModal = ({
                             toggleShow,
                             basicModal,
                             handleInputChange,
                             values,
                             submit,
                             index,
                             startDate,
                             setStartDate

                         }: any) => {

    return (
        <>
            <Dialog open={basicModal} onClose={toggleShow}>
                <DialogTitle>
                    Fütterung hinzufügen
                    <Button className='btn-close' onClick={toggleShow}/>
                </DialogTitle>
                <DialogContent>
                    <form>
                        <FormControl fullWidth>

                            <TextField
                                className={"mt-3"}
                                value={values.type}
                                onChange={handleInputChange}
                                name="type"
                                type="text"
                                label={"Futterart"}
                                placeholder="Futterart..."
                                required
                            />
                            <TextField
                                className={"mt-3 mb-3"}
                                value={values.weight}
                                onChange={handleInputChange}
                                type="text"
                                label={"Gewicht"}
                                name="weight"
                                placeholder="Gewicht des Futters..."
                                required
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Fütterungsdatum"
                                    inputFormat="MM/dd/yyyy"
                                    value={startDate}
                                    onChange={setStartDate}
                                    renderInput={(params) => <TextField {...params} required/>}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button color='secondary' onClick={toggleShow}>
                        Abbrechen
                    </Button>
                    <Button onClick={submit}>Fütterung hinzufügen</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default AddFeedingModal;