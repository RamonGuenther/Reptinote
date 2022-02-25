import React, {useEffect, useState} from "react";
import ReptileCard from "../components/reptile/ReptileCard";
import {Reptile} from "../data/Reptile";
import AddReptileModal from "../components/modals/AddReptileModal";
import 'react-toastify/dist/ReactToastify.css';
import Feeding from "../data/Feeding";
import AddFeedingModal from "../components/modals/AddFeedingModal";
import AddWeightModal from "../components/modals/AddWeightModal";
import AddNoteModal from "../components/modals/AddNoteModal";
import Note from "../data/Note";
import Weight from "../data/Weight";
import EditReptileModal from "../components/modals/EditReptileModal";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {initialValuesFeeding, initialValuesReptile} from "../helper/Constants";
import {notifyFailure, notifySuccess} from "../helper/Toasts";
import {Button} from "@mui/material";
import "./reptileOverview.css"


function ReptileOverview({reptiles, setReptiles, saveReptile, saveFeeding, editReptile}: any) {

    const [reptileValues, setReptileValues] = useState(initialValuesReptile);
    const [feedingValues, setFeedingValues] = useState(initialValuesFeeding);

    const [showAddReptileModal, setShowAddReptileModal] = useState(false);
    const [showAddFeedingModal, setShowAddFeedingModal] = useState(false);
    const [showAddWeightModal, setShowAddWeightModal] = useState(false);
    const [showAddNoteModal, setShowAddNoteModal] = useState(false);

    const [selectedGenderOption, setSelectedGenderOption] = useState("");
    const [selectedSpeciesOption, setSelectedSpeciesOption] = useState("");


    //add
    function addReptile(): void {
        if (reptileValues.name === "" || reptileValues.birthday === "" || reptileValues.type === "" || selectedGenderOption === null || selectedSpeciesOption === null) {
            notifyFailure("Bitte alle Pflichtfelder ausfüllen!");
            return;
        }
        let newReptile = new Reptile();
        newReptile.setReptile(reptileValues.name, reptileValues.birthday, reptileValues.type, reptileValues.morph, selectedGenderOption, selectedSpeciesOption, reptileValues.image);

        saveReptile(newReptile);
        setReptileValues(initialValuesReptile); //reset
        notifySuccess("Das Reptil " + reptileValues.name + " wurde gespeichert.");
        toggleAddReptileModal();
    }


    function addFeeding(): void { //TODO: onClick={() => {onDeleteReptile(index)}}
        if (feedingValues.type === "" || isNaN(parseInt(feedingValues.weight))) { //TODO: wie validieren
            notifyFailure("Bitte alle Felder und im richtigen Format ausfüllen!")
            return;
        }
        let feeding = new Feeding();
        feeding.setFeeding(feedingValues.weight, feedingValues.type, startDate.toLocaleDateString());
        saveFeeding(feeding, reptileId);
        setFeedingValues(initialValuesFeeding)
        setStartDate(new Date());
        notifySuccess("Die Fütterung wurde gespeichert.");
        toggleAddFeedingModal();
    }


    function deleteReptile(): void {
        const newTodos = [...reptiles];
        newTodos.splice(reptileId, 1);
        setReptiles(newTodos);
    }


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

    const [reptileId, setReptileId] = useState(0); //TODO uuid benutzen

    function toggleAddReptileModal(): void {
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


    const [startDate, setStartDate] = useState(new Date());

    const [inputWeight, setInputWeight] = useState("");

    const [inputNote, setInputNote] = useState("");

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

    function addNote() {
        if (inputNote === "") { //TODO: wie validieren
            notifyFailure("Bitte alle Felder ausfüllen."); //TODO eigenes
            return;
        }
        const newTodos = [...reptiles];
        let note = new Note();
        note.setNote(inputNote, startDate.toLocaleDateString());
        newTodos[reptileId].notes.push(note);
        setReptiles(newTodos);
        setInputNote("");
        setStartDate(new Date());
        notifySuccess("Die Notiz wurde gespeichert.");
        toggleAddNoteModal();

    }

    function addWeight() {
        if (isNaN(parseInt(inputWeight))) { //TODO: wie validieren
            notifyFailure("Bitte alle Felder und im richtigen Format ausfüllen!")
            return;
        }
        const newTodos = [...reptiles];
        let weight = new Weight();
        weight.setWeight(inputWeight, startDate.toLocaleDateString());
        newTodos[reptileId].weights.push(weight);
        setReptiles(newTodos);
        setInputWeight("");
        setStartDate(new Date());
        notifySuccess("Das Gewicht wurde gespeichert.");
        toggleAddWeightModal();
    }


    const [showEditReptileModal, setShowEditReptileModal] = useState(false);

    function initializeEdit() {
        if (reptiles.length === 0) {
            return;
        }
        let name = reptiles[reptileId].name;
        let birthday = reptiles[reptileId].birthday;
        let type = reptiles[reptileId].type;
        let morph = reptiles[reptileId].morph;
        let image = reptiles[reptileId].image;
        setSelectedGenderOption(reptiles[reptileId].gender);
        setSelectedSpeciesOption(reptiles[reptileId].species);
        setReptileValues({name: name, birthday: birthday, type: type, morph: morph, image: image})
    }

    function toggleEditReptileModal() {
        setShowEditReptileModal(!showEditReptileModal);
    }


    const [searchValue, setSearchValue] = useState<string>("")

    //TODO: isOptionEqualToValue
    function test(event: any) {

        setSearchValue(event.target.value);
        console.log(searchValue);

    }


    useEffect(() => {
        initializeEdit();
    }, [showEditReptileModal])

    return (
        <div className={" mt-3 rounded p-5 container"}>

            <TextField
                sx={{input: {color: 'white'}}}
                type={"text"}
                value={searchValue}
                label={"Reptil suchen"}
                onChange={(e: any) => setSearchValue(e.target.value)}
                focused
            />

            <Button id={"reptile-overview-add_reptile_button"} variant="outlined" onClick={toggleAddReptileModal}>Reptil
                hinzufügen</Button>

            {/*<Autocomplete*/}
            {/*    options={reptiles.map((item: any) =>{return {label: item.name}})}*/}
            {/*    sx={{ width: 300 }}*/}
            {/*    onChange={(e: any) => test(e)}*/}
            {/*    value={searchValue}*/}
            {/*    isOptionEqualToValue={(option : string, value : string) => true}*/}
            {/*    renderInput={(params:any) => <TextField {...params} label="Reptil suchen" />}*/}
            {/*/>*/}


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

            {reptiles.filter((reptil: { name: string; }) => reptil.name.match(new RegExp(searchValue, "i"))).map((item: any, index: number) => {
                return (
                    <ReptileCard

                        key={index}

                        id={item.id}
                        name={item._name}
                        birthday={item._birthday}
                        type={item._type}
                        morph={item._morph}
                        gender={item._gender}
                        species={item._species}
                        feedings={item._feedings}
                        weights={item._weights}
                        notes={item._notes}
                        image={item.image}
                        index={index}
                        onDeleteReptile={deleteReptile}
                        addFeeding={addFeeding}
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