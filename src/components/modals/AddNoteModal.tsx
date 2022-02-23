import React from "react";
import {ToastContainer} from 'react-toastify';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    TextField
} from "@mui/material";

import AdapterDateFns from '@mui/lab/AdapterDateFns';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {LocalizationProvider} from "@mui/lab";


const AddNoteModal = ({
                          toggleShow,
                          basicModal,
                          submit,
                          startDate,
                          setStartDate,
                          inputNote,
                          changeNote,

                      }: any) => {

    return (
        <>
            <Dialog open={basicModal} onClose={toggleShow}>
                <DialogTitle>
                    Notiz hinzufügen
                    <Button className='btn-close' onClick={toggleShow}/>
                </DialogTitle>
                <Divider/>

                <DialogContent>
                    <form>

                        <FormControl fullWidth>

                        <TextField
                            className={"mt-3 mb-3"}
                            value={inputNote}
                            onChange={changeNote}
                            name="type"
                            type="text"
                            label={"Notiz"}
                            placeholder="Notiz eingeben..."
                            required
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Notizdatum"
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
                    <Button color='secondary' onClick={toggleShow}>
                        Abbrechen
                    </Button>
                    <Button onClick={submit}>Notiz hinzufügen</Button>

                </DialogActions>
            </Dialog>

        </>
    )
}


export default AddNoteModal;