import React, {useEffect, useState} from "react";
import ReptileCard from "../components/reptile/ReptileCard";
import AddReptileModal from "../components/modals/reptile/AddReptileModal";
import 'react-toastify/dist/ReactToastify.css';
import Feeding from "../data/Feeding";
import AddFeedingModal from "../components/modals/reptile/AddFeedingModal";
import AddWeightModal from "../components/modals/reptile/AddWeightModal";
import AddNoteModal from "../components/modals/reptile/AddNoteModal";
import Note from "../data/Note";
import Weight from "../data/Weight";
import EditReptileModal from "../components/modals/reptile/EditReptileModal";
import TextField from '@mui/material/TextField';
import {initialValuesFeeding, initialValuesReptile} from "../helper/Constants";
import {notifyFailure, notifySuccess} from "../helper/Toasts";
import {Button} from "@mui/material";
import "../style/reptileOverview.css"
import {Breeder} from "../data/Breeder";
import {useStyles} from "../helper/Functions";
import {Reptile} from "../data/Reptile";


function ReptileOverview({
                             reptiles,
                             saveReptile,
                             deleteReptile,
                             saveFeeding,
                             saveWeight,
                             saveNote,
                             editReptile,
                             breeders
                         }: any) {

    /*---------------------------------------------------------------------------------------------------
                                             States
    -----------------------------------------------------------------------------------------------------*/
    const [reptileId, setReptileId] = useState("");

    const [feedingValues, setFeedingValues] = useState(initialValuesFeeding);
    const [reptileValues, setReptileValues] = useState(initialValuesReptile);

    const [showAddReptileModal, setShowAddReptileModal] = useState(false);
    const [showAddFeedingModal, setShowAddFeedingModal] = useState(false);
    const [showAddWeightModal, setShowAddWeightModal] = useState(false);
    const [showAddNoteModal, setShowAddNoteModal] = useState(false);
    const [showEditReptileModal, setShowEditReptileModal] = useState(false);

    const [selectedGenderOption, setSelectedGenderOption] = useState("");
    const [selectedSpeciesOption, setSelectedSpeciesOption] = useState("");
    const [selectedBreederOption, setSelectedBreederOption] = useState("");

    const [searchValue, setSearchValue] = useState("");

    const [startDate, setStartDate] = useState(new Date());
    const [inputWeight, setInputWeight] = useState("");
    const [inputNote, setInputNote] = useState("");

    /*---------------------------------------------------------------------------------------------------
                                             Submit-Funktionen
    -----------------------------------------------------------------------------------------------------*/


    function addReptile(): void {
        if (reptileValues.name === "" || reptileValues.birthday === "" || reptileValues.type === "" ||
            selectedGenderOption === null || selectedSpeciesOption === null) {
            notifyFailure("Bitte alle Pflichtfelder ausfüllen!");
            return;
        }
        let newReptile = new Reptile();
        setReptile(newReptile);
        saveReptile(newReptile);
        setReptileValues(initialValuesReptile);
        notifySuccess("Das Reptil " + reptileValues.name + " wurde gespeichert.");
        toggleAddReptileModal();

    }

    function updateReptile(): void {
        if (reptileValues.name === "" || reptileValues.birthday === "" || reptileValues.type === "" ||
            selectedGenderOption === null || selectedSpeciesOption === null) {
            notifyFailure("Bitte alle Pflichtfelder ausfüllen!");
            return;
        }
        let newReptile = reptiles[findReptileId()];
        setReptile(newReptile);
        editReptile(newReptile);
        setReptileValues(initialValuesReptile);
        setSearchValue(reptileValues.name);
        notifySuccess("Die Änderungen des Reptils " + reptileValues.name + " wurden gespeichert.");
        toggleEditReptileModal();

    }


    function removeReptile(): void {
        setSearchValue("");
        deleteReptile(findReptileId());
    }


    function addFeeding(): void {
        if (feedingValues.type === "" || isNaN(parseInt(feedingValues.weight))) {
            notifyFailure("Bitte alle Felder und im richtigen Format ausfüllen!")
            return;
        }
        let feeding = new Feeding();
        feeding.setFeeding(feedingValues.weight, feedingValues.type, startDate.toLocaleDateString());
        saveFeeding(feeding, findReptileId());
        setFeedingValues(initialValuesFeeding)
        setStartDate(new Date());
        notifySuccess("Die Fütterung wurde gespeichert.");
        toggleAddFeedingModal();
    }

    function addNote(): void {
        if (inputNote === "") {
            notifyFailure("Bitte alle Felder ausfüllen.");
            return;
        }
        let note = new Note();
        note.setNote(inputNote, startDate.toLocaleDateString());
        saveNote(note, findReptileId())
        setInputNote("");
        setStartDate(new Date());
        notifySuccess("Die Notiz wurde gespeichert.");
        toggleAddNoteModal();
    }

    function addWeight(): void {
        if (isNaN(parseInt(inputWeight))) {
            notifyFailure("Bitte alle Felder und im richtigen Format ausfüllen!")
            return;
        }
        let weight = new Weight();
        weight.setWeight(inputWeight, startDate.toLocaleDateString());
        saveWeight(weight, findReptileId());
        setInputWeight("");
        setStartDate(new Date());
        notifySuccess("Das Gewicht wurde gespeichert.");
        toggleAddWeightModal();
    }


    function setReptile(newReptile: Reptile): void {
        newReptile.setReptile(
            reptileValues.name,
            reptileValues.birthday,
            reptileValues.type,
            reptileValues.morph,
            selectedGenderOption,
            selectedSpeciesOption,
            reptileValues.image
        );

        if (selectedBreederOption !== "") {
            for (let i = 0; i < breeders.length; i++) {
                if (breeders[i].lastName === selectedBreederOption) {
                    let breeder: Breeder = breeders[i];
                    newReptile.setBreeder(breeder);
                    break;
                }
            }
        }
    }

    function findReptileId(): number {
        let index = 0;
        for (let i = 0; i < reptiles.length; i++) {
            if (reptileId === reptiles[i].id) {
                index = i;
            }
        }
        return index;
    }

    /*---------------------------------------------------------------------------------------------------
                                            Input Change Handler
    -----------------------------------------------------------------------------------------------------*/


    function handleInputChangeReptile(e: any): void {
        const {name, value} = e.target;
        setReptileValues({
            ...reptileValues,
            [name]: value,
        });
    }

    function handleInputChangeFeeding(e: any): void {
        const {name, value} = e.target;
        setFeedingValues({
            ...feedingValues,
            [name]: value,
        });
    }

    function handleInputChangeWeight(event: any) {
        setInputWeight(event.target.value)
    }

    function handleInputChangeNote(event: any) {
        setInputNote(event.target.value)
    }


    function handleSpeciesSelect(event: any) {
        setSelectedSpeciesOption(event.target.value)
    }

    function handleGenderSelect(event: any) {
        setSelectedGenderOption(event.target.value)
    }

    function handleBreederSelect(event: any) {
        setSelectedBreederOption(event.target.value);
    }

    /*---------------------------------------------------------------------------------------------------
                                       Toggle Modal Funktionen
    -----------------------------------------------------------------------------------------------------*/


    function toggleAddReptileModal(): void {
        setSelectedGenderOption("");
        setSelectedSpeciesOption("");
        setSelectedBreederOption("");
        setReptileValues(initialValuesReptile);
        setShowAddReptileModal(!showAddReptileModal);
    }

    function toggleAddFeedingModal(): void {
        setShowAddFeedingModal(!showAddFeedingModal);
    }

    function toggleAddWeightModal(): void {
        setShowAddWeightModal(!showAddWeightModal);
    }

    function toggleAddNoteModal(): void {
        setShowAddNoteModal(!showAddNoteModal);
    }

    function toggleEditReptileModal(): void {
        setShowEditReptileModal(!showEditReptileModal);
    }


    /*---------------------------------------------------------------------------------------------------
                                           Sonstiges
    -----------------------------------------------------------------------------------------------------*/


    function initializeEdit(): void {
        if (reptiles.length === 0 || !showEditReptileModal) {
            return;
        }

        let index = findReptileId();
        let name = reptiles[index].name;
        let birthday = reptiles[index].birthday;
        let type = reptiles[index].type;
        let morph = reptiles[index].morph;
        let image = reptiles[index].image;
        setSelectedGenderOption(reptiles[index].gender);
        setSelectedSpeciesOption(reptiles[index].species);
        setSelectedBreederOption(reptiles[index].breeder.lastName)
        setReptileValues({name, birthday, type, morph, image});
    }

    useEffect(() => {
        initializeEdit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showEditReptileModal])

    const classes = useStyles();

    return (
        <div className={"mt-3 p-5 container"}>

            <AddReptileModal
                toggleAddReptileModal={toggleAddReptileModal}
                showAddReptileModal={showAddReptileModal}
                handleInputChange={handleInputChangeReptile}
                values={reptileValues}
                submit={addReptile}
                selectedGenderOption={selectedGenderOption}
                handleGenderSelect={handleGenderSelect}
                selectedSpeciesOption={selectedSpeciesOption}
                handleSpeciesSelect={handleSpeciesSelect}
                selectedBreederOption={selectedBreederOption}
                handleBreederSelect={handleBreederSelect}
                breeders={breeders}
            />

            <EditReptileModal
                toggleShow={toggleEditReptileModal}
                basicModal={showEditReptileModal}
                handleInputChange={handleInputChangeReptile}
                values={reptileValues}
                submit={updateReptile}
                selectedGenderOption={selectedGenderOption}
                handleGenderSelect={handleGenderSelect}
                selectedSpeciesOption={selectedSpeciesOption}
                handleSpeciesSelect={handleSpeciesSelect}
                selectedBreederOption={selectedBreederOption}
                handleBreederSelect={handleBreederSelect}
                breeders={breeders}
            />

            <AddFeedingModal
                toggleAddFeedingModal={toggleAddFeedingModal}
                showAddFeedingModal={showAddFeedingModal}
                values={feedingValues}
                handleInputChange={handleInputChangeFeeding}
                submit={addFeeding}
                startDate={startDate}
                setStartDate={setStartDate}
            />

            <AddWeightModal
                toggleAddWeightModal={toggleAddWeightModal}
                showAddWeightModal={showAddWeightModal}
                startDate={startDate}
                setStartDate={setStartDate}
                inputWeight={inputWeight}
                changeWeight={handleInputChangeWeight}
                submit={addWeight}
            />

            <AddNoteModal
                toggleAddNoteModal={toggleAddNoteModal}
                showAddNoteModal={showAddNoteModal}
                startDate={startDate}
                setStartDate={setStartDate}
                inputNote={inputNote}
                changeNote={handleInputChangeNote}
                submit={addNote}
            />


            <div className={"reptile-overview-search_button"}>

                <TextField
                    variant={"outlined"}
                    sx={{input: {color: 'white'}}}
                    type={"text"}
                    value={searchValue}
                    label={"Reptil suchen"}
                    onChange={(e: any) => setSearchValue(e.target.value)}
                    placeholder={"Name des Reptils..."}
                    className={classes.textField}
                    InputLabelProps={{
                        style: {color: '#ffffff'},
                    }}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />


                <Button id={"reptile-overview-add_reptile_button"} variant="contained" onClick={toggleAddReptileModal}>
                    Reptil hinzufügen</Button>


            </div>

            {reptiles.filter((reptil: { name: string; }) => reptil.name.match(new RegExp(searchValue, "i"))).map((item: any, index: number) => {
                return (
                    <ReptileCard
                        key={index}
                        reptile={item}
                        onDeleteReptile={removeReptile}
                        toggleFeedingModal={toggleAddFeedingModal}
                        toggleWeightModal={toggleAddWeightModal}
                        toggleNoteModal={toggleAddNoteModal}
                        toggleReptileEditModal={toggleEditReptileModal}
                        setReptileId={setReptileId}
                    />
                )
            })}
        </div>
    )
}

export default ReptileOverview;