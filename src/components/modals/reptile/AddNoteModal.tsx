import React from "react";
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
                          toggleAddNoteModal,
                          showAddNoteModal,
                          submit,
                          startDate,
                          setStartDate,
                          inputNote,
                          changeNote,

                      }: any) => {

    return (
        <>
            <Dialog open={showAddNoteModal} onClose={toggleAddNoteModal}>
                <DialogTitle>
                    Notiz hinzufügen
                </DialogTitle>
                <Divider/>

                <DialogContent>
                    <form>

                        <FormControl fullWidth>

                        <TextField
                            className={"mt-2 mb-4"}
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
                    <Button color='secondary' onClick={toggleAddNoteModal}>
                        Abbrechen
                    </Button>
                    <Button onClick={submit}>Notiz hinzufügen</Button>

                </DialogActions>
            </Dialog>

        </>
    )
}


export default AddNoteModal;