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
import Select from "react-select";
import {ToastContainer} from 'react-toastify';

const optionsGender = [
    {label: 'Weiblich'},
    {label: 'Männlich'},
    {label: 'Unbekannt'},
];

const optionsSpecies = [
    {label: 'Schlange'},
    {label: 'Echse'},
    {label: 'Krokodil'},
    {label: 'Schildkröte'},
    {label: 'Amphibie'},
    {label: 'Gliederfüßer'},
    {label: 'Sonstiges'},
]


const EditReptileModal = ({
                             toggleShow,
                             basicModal,
                             setBasicModal,
                             handleInputChange,
                             values,
                             submit,
                             selectedGenderOption,
                             setSelectedGenderOption,
                             selectedSpeciesOption,
                             setSelectedSpeciesOption,
                         }: any) => {
    return (
        <>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Reptil Bearbeiten</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}/>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form>
                                {/*value= textinput = TwoWayDatabinding für das resetten */}

                                {/*<div>*/}
                                {/*    <img src={image}/>*/}
                                {/*    <h1>Select Image</h1>*/}
                                {/*    <input type="file" name="myImage" onChange={onImageChange}/>*/}
                                {/*</div>*/}

                                <MDBInput
                                    className={"mt-3"}
                                    value={values.name}
                                    onChange={handleInputChange}
                                    name="name" //TODO: ohne name Attribut funktioniert es nicht
                                    type="text"
                                    label={"Name"}
                                    placeholder="Name des Reptils..."
                                />
                                <MDBInput
                                    className={"mt-3"}
                                    value={values.birthday}
                                    onChange={handleInputChange}
                                    type="text"
                                    label={"Geburtstag"}
                                    name="birthday"
                                    placeholder="Geburtstag des Reptils..."
                                />
                                <MDBInput
                                    className={"mt-3"}
                                    value={values.type}
                                    onChange={handleInputChange}
                                    label={"Art"}
                                    name="type"
                                    type="text"
                                    placeholder="Art des Reptils..."
                                />
                                <MDBInput
                                    className={"mt-3"}
                                    value={values.morph}
                                    label={"Morph"}
                                    onChange={handleInputChange}
                                    name="morph"
                                    type="text"
                                    placeholder="Morph des Reptils..."
                                />

                                <MDBInput
                                    className={"mt-3"}
                                    value={values.image}
                                    label={"Bild"}
                                    onChange={handleInputChange}
                                    name="image"
                                    type="text"
                                    placeholder="Image Url eingeben"
                                />

                                <Select
                                    className={"mt-3"}
                                    defaultValue={selectedGenderOption}
                                    options={optionsGender}
                                    onChange={setSelectedGenderOption}
                                    placeholder={"Geschlecht auswählen.."}
                                    getOptionValue={(option) => option.label}
                                />

                                <Select
                                    className={"mt-3"}
                                    defaultValue={selectedSpeciesOption}
                                    options={optionsSpecies}
                                    onChange={setSelectedSpeciesOption}
                                    placeholder={"Spezies auswählen.."}
                                    getOptionValue={(option) => option.label}

                                />
                            </form>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Abbrechen
                            </MDBBtn>
                            <MDBBtn onClick={submit}>Reptil Speichern</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <ToastContainer
            />

        </>
    )
}


export default EditReptileModal;