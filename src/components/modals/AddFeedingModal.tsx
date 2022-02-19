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

const AddFeedingModal = ({
                             toggleShow,
                             basicModal,
                             setBasicModal,
                             handleInputChange,
                             values,
                             submit,

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
                                <MDBInput
                                    className={"mt-3"}
                                    value={values.type}
                                    onChange={handleInputChange}
                                    name="type" //TODO: ohne name Attribut funktioniert es nicht
                                    type="text"
                                    label={"type"}
                                    placeholder="Name des Reptils..."
                                />
                                <MDBInput
                                    className={"mt-3"}
                                    value={values.weight}
                                    onChange={handleInputChange}
                                    type="number"
                                    label={"Geburtstag"}
                                    name="weight"
                                    placeholder="Geburtstag des Reptils..."
                                />
                            </form>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Abbrechen
                            </MDBBtn>
                            <MDBBtn onClick={submit}>Fütterung hinzufügen</MDBBtn>
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