import React, {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, CardMedia} from "@mui/material";
import {MdDelete} from "react-icons/md";
import "./reptileInformation.css"
import DeleteDialog from "../modals/DeleteDialog";
import EditReptileModal from "../modals/EditReptileModal";
import {initialValuesReptile} from "../../helper/Constants";
import {notifyFailure, notifySuccess} from "../../helper/Toasts";
import {Reptile} from "../../data/Reptile";
import {FiEdit} from "react-icons/fi";


const ReptileInformation = ({reptile, deleteReptile, editReptile}: any) => {

    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
    const [showEditReptileModal, setShowEditReptileModal] = useState(false);
    const [reptileValues, setReptileValues] = useState(initialValuesReptile);

    const [selectedGenderOption, setSelectedGenderOption] = useState("");
    const [selectedSpeciesOption, setSelectedSpeciesOption] = useState("");

    function handleSpeciesSelect(event: any) {
        setSelectedSpeciesOption(event.target.value)
    }

    function handleGenderSelect(event: any) {
        setSelectedGenderOption(event.target.value)
    }

    function handleInputChangeReptile(e: any): void {
        const {name, value} = e.target;

        setReptileValues({
            ...reptileValues,
            [name]: value,
        });
    }

    const toggleDeleteDialog = () => {
        setShowDeleteDialog(!showDeleteDialog);
    };

    function toggleEditReptileModal() {
        setShowEditReptileModal(!showEditReptileModal);
    }

    function addReptile(): void {
        if (reptileValues.name === "" || reptileValues.birthday === "" || reptileValues.type === "" || selectedGenderOption === null || selectedSpeciesOption === null) {
            notifyFailure("Bitte alle Pflichtfelder ausfüllen!");
            return;
        }
        let newReptile = new Reptile();
        newReptile.setReptile(reptileValues.name, reptileValues.birthday, reptileValues.type, reptileValues.morph, selectedGenderOption, selectedSpeciesOption, reptileValues.image);
        editReptile(newReptile, reptile.id)
        setReptileValues(initialValuesReptile); //reset
        notifySuccess("Das Reptil " + reptileValues.name + " wurde bearbeitet.");
        toggleEditReptileModal();
    }


    const feedings = reptile.feedings;
    const notes = reptile.notes;
    const weights = reptile.weights;

    function initializeEdit() {
        let name = reptile.name;
        let birthday = reptile.birthday;
        let type = reptile.type;
        let morph = reptile.morph;
        let image = reptile.image;
        setSelectedGenderOption(reptile.gender);
        setSelectedSpeciesOption(reptile.species);
        setReptileValues({name: name, birthday: birthday, type: type, morph: morph, image: image})
    }


    useEffect(() => {
        initializeEdit();
    }, [showEditReptileModal])


    return (
        <>

            <EditReptileModal
                toggleShow={toggleEditReptileModal}
                basicModal={showEditReptileModal}
                handleInputChange={handleInputChangeReptile}
                values={reptileValues}
                submit={addReptile}
                selectedGenderOption={selectedGenderOption}
                handleGenderSelect={handleGenderSelect}
                selectedSpeciesOption={selectedSpeciesOption}
                handleSpeciesSelect={handleSpeciesSelect}
            />

            <DeleteDialog open={showDeleteDialog} toggleDeleteDialog={toggleDeleteDialog} action={deleteReptile}
                          name={reptile.name}/>

            <Card id={"reptile-information-card"}>
                <h2 id={"reptile-information-name"}>{reptile.name}</h2>
                <h2 id={"reptile-information-species_type"}>{reptile.species} | {reptile.type}</h2>

                <CardContent className={"reptileInfoContent"}>
                    {reptile.image !== "" ? <CardMedia
                        className={"reptile-information-image"}
                        component={"img"}
                        image={reptile.image}

                    /> : <CardMedia
                        className={"reptile-information-image"}
                        component={"img"}
                        image={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/600px-No_image_available_600_x_450.svg.png?20150903195108"}
                    />}
                    <div className={"reptile-information-card-text"}>
                        <div>
                            <h2 className={"reptile-information-h2"}><span
                                className={"reptile-information-span"}>Geburtstag:</span> {reptile.birthday}</h2>
                            <h2 className={"reptile-information-h2"}><span
                                className={"reptile-information-span"}>Geschlecht:</span> {reptile.gender}</h2>
                            <h2 className={"reptile-information-h2"}><span
                                className={"reptile-information-span"}>Morph: </span>{reptile.morph}</h2>
                        </div>

                        <div>
                            {weights[weights.length - 1] !== undefined &&
                            <h2 className={"reptile-information-h2"}><span className={"reptile-information-span"}>
                                Gewicht:</span> {weights[weights.length - 1].weight}g</h2>}

                            {feedings[feedings.length - 1] !== undefined &&
                            <h2 className={"reptile-information-h2"}><span className={"reptile-information-span"}>
                                Letzte Fütterung:</span> {feedings[feedings.length - 1].date}</h2>}

                            {notes[notes.length - 1] !== undefined &&
                            <h2 className={"reptile-information-h2"}><span className={"reptile-information-span"}>
                                Aktuellste Notiz:  </span>{notes[notes.length - 1].note.substring(0, 20)}...</h2>}
                        </div>

                        <h2>Züchter: Krasser Züchter</h2>
                    </div>
                </CardContent>

                <CardActions className={"reptileInfoActions"}>
                    <Button variant="contained" className={"detailsButton bg-info"} onClick={() => {
                        toggleDeleteDialog()
                    }}> <MdDelete size={"25px"}/>
                    </Button>

                    <Button variant="contained" className={"editButton"} onClick={() => {
                        toggleEditReptileModal();
                    }}> <FiEdit size={"25px"}/>
                    </Button>
                </CardActions>
            </Card>
        </>

    )
}

export default ReptileInformation;