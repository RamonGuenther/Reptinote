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


const AddFeedingModal = ({
                             toggleShow,
                             basicModal,
                             setBasicModal,
                             handleInputChange,
                             values,
                             submit,
                             index,
                             startDate,
                             setStartDate

                         }: any) => {

    return (
        <>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Fütterung hinzufügen</MDBModalTitle>
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
                                    value={values.type}
                                    onChange={handleInputChange}
                                    name="type"
                                    type="text"
                                    label={"Futterart"}
                                    placeholder="Futterart..."
                                />
                                <MDBInput
                                    className={"mt-3"}
                                    value={values.weight}
                                    onChange={handleInputChange}
                                    type="text"
                                    label={"Gewicht"}
                                    name="weight"
                                    placeholder="Gewicht des Futters..."
                                />
                            </form>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Abbrechen
                            </MDBBtn>
                            <MDBBtn onClick={(e: any) => {
                                submit(index, e)
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


export default AddFeedingModal;