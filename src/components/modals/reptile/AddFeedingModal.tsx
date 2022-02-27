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


const AddFeedingModal = ({
                             toggleAddFeedingModal,
                             showAddFeedingModal,
                             handleInputChange,
                             values,
                             submit,
                             startDate,
                             setStartDate
                         }: any) => {
    return (
        <>
            <Dialog open={showAddFeedingModal} onClose={toggleAddFeedingModal}>
                <DialogTitle className={"modal-title"}>
                    Fütterung hinzufügen
                </DialogTitle>
                <Divider/>
                <DialogContent className={"modal-content"} style={{width: "400px"}}>
                    <form>
                        <FormControl fullWidth>
                            <TextField
                                className={"mt-2"}
                                value={values.type}
                                onChange={handleInputChange}
                                name="type"
                                type="text"
                                label={"Futterart"}
                                placeholder="Futterart..."
                                required
                            />
                            <TextField
                                className={"mt-4 mb-4"}
                                value={values.weight}
                                onChange={handleInputChange}
                                type="text"
                                label={"Gewicht"}
                                name="weight"
                                placeholder="Gewicht des Futters..."
                                helperText={"Numerische Werte"}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">g</InputAdornment>
                                }}
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
                <Divider/>
                <DialogActions className={"modal-actions"}>
                    <Button color='secondary' onClick={toggleAddFeedingModal}>
                        Abbrechen
                    </Button>
                    <Button onClick={submit}>Fütterung hinzufügen</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default AddFeedingModal;