import React from "react";
import {
    MDBBtn, MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {ToastContainer} from 'react-toastify';
import {TextField} from "@mui/material";

import AdapterDateFns from '@mui/lab/AdapterDateFns';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {LocalizationProvider} from "@mui/lab";


const AddNoteModal = ({
                          toggleShow,
                          basicModal,
                          setBasicModal,
                          submit,
                          index,
                          startDate,
                          setStartDate,
                          inputNote,
                          changeNote,

                      }: any) => {

    return (
        <>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Notiz hinzufügen</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}/>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Fütterungsdatum"
                                        inputFormat="MM/dd/yyyy"
                                        value={startDate}
                                        onChange={setStartDate}
                                        renderInput={(params) => <TextField {...params} />}
                                    />

                                </LocalizationProvider>

                                <MDBInput
                                    className={"mt-3"}
                                    value={inputNote}
                                    onChange={changeNote}
                                    name="type" //TODO: ohne name Attribut funktioniert es nicht
                                    type="text"
                                    label={"type"}
                                    placeholder="Name des Reptils..."
                                />
                            </form>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Abbrechen
                            </MDBBtn>
                            <MDBBtn onClick={(e: any) => {
                                submit(e, index)
                            }}>Fütterung hinzufügen</MDBBtn>


                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <ToastContainer
            />

        </>
    )
}


export default AddNoteModal;