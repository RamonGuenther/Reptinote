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
import "./reptileOverview.css"
import {Breeder} from "../data/Breeder";
import {useStyles} from "../helper/Functions";


function ReptileOverview({reptiles, setReptiles, saveReptile, saveFeeding, editReptile, breeders}: any) {

    const [reptileValues, setReptileValues] = useState(initialValuesReptile);
    const [feedingValues, setFeedingValues] = useState(initialValuesFeeding);

    const [showAddReptileModal, setShowAddReptileModal] = useState(false);
    const [showAddFeedingModal, setShowAddFeedingModal] = useState(false);
    const [showAddWeightModal, setShowAddWeightModal] = useState(false);
    const [showAddNoteModal, setShowAddNoteModal] = useState(false);

    const [selectedGenderOption, setSelectedGenderOption] = useState("");
    const [selectedSpeciesOption, setSelectedSpeciesOption] = useState("");
    const [selectedBreederOption, setSelectedBreederOption] = useState("");

    //add
    function addReptile(): void {
        if (reptileValues.name === "" || reptileValues.birthday === "" || reptileValues.type === "" || selectedGenderOption === null || selectedSpeciesOption === null) {
            notifyFailure("Bitte alle Pflichtfelder ausfüllen!");
            return;
        }
        let newReptile = reptiles[findReptileId()];
        newReptile.setReptile(reptileValues.name, reptileValues.birthday, reptileValues.type, reptileValues.morph, selectedGenderOption, selectedSpeciesOption, reptileValues.image);

        if (selectedBreederOption !== "") {
            for (let i = 0; i < breeders.length; i++) {
                if (breeders[i].lastName === selectedBreederOption) {
                    let breeder: Breeder = breeders[i];
                    newReptile.setBreeder(breeder);
                    break;
                }
            }
        }

        if (showAddReptileModal) {
            saveReptile(newReptile);
            setReptileValues(initialValuesReptile); //reset
            notifySuccess("Das Reptil " + reptileValues.name + " wurde gespeichert.");
            toggleAddReptileModal();
        }
        if (showEditReptileModal) {
            const newReptiles = [...reptiles];
            newReptiles[findReptileId()] = newReptile;
            setReptiles(newReptiles);
            notifySuccess("Die Änderungen des Reptils " + reptileValues.name + " wurden gespeichert.");
            toggleEditReptileModal();
            setReptileValues(initialValuesReptile);
        }

    }


    function addFeeding(): void { //TODO: onClick={() => {onDeleteReptile(index)}}
        if (feedingValues.type === "" || isNaN(parseInt(feedingValues.weight))) { //TODO: wie validieren
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


    function deleteReptile(): void {
        const newTodos = [...reptiles];
        newTodos.splice(findReptileId(), 1);
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

    const [reptileId, setReptileId] = useState(""); //TODO uuid benutzen

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

    function handleBreederSelect(event: any) {
        setSelectedBreederOption(event.target.value);
    }

    function addNote() {
        if (inputNote === "") { //TODO: wie validieren
            notifyFailure("Bitte alle Felder ausfüllen."); //TODO eigenes
            return;
        }
        const newTodos = [...reptiles];
        let note = new Note();
        note.setNote(inputNote, startDate.toLocaleDateString());
        newTodos[findReptileId()].notes.push(note);
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
        newTodos[findReptileId()].weights.push(weight);
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

        let index = findReptileId();
        let name = reptiles[index].name;
        let birthday = reptiles[index].birthday;
        let type = reptiles[index].type;
        let morph = reptiles[index].morph;
        let image = reptiles[index].image;

        setSelectedGenderOption(reptiles[index].gender);
        setSelectedSpeciesOption(reptiles[index].species);
        setSelectedBreederOption(reptiles[index].breeder.lastName)
        setReptileValues({name: name, birthday: birthday, type: type, morph: morph, image: image});
    }

    function toggleEditReptileModal() {
        setShowEditReptileModal(!showEditReptileModal);
    }


    const [searchValue, setSearchValue] = useState("");

    //TODO: isOptionEqualToValue
    function test(event: any) {
        setSearchValue(event.target.innerText);
        console.log(searchValue);
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


    useEffect(() => {
        initializeEdit();
    }, [showEditReptileModal])


    const classes = useStyles();

    return (
        <div className={"mt-3 p-5 container"}>

            <div className={"reptile-overview-search_button"}>

                <TextField
                    variant={"outlined"}
                    type={"text"}
                    value={searchValue}
                    label={"Reptil suchen"}
                    onChange={(e: any) => setSearchValue(e.target.value)}
                    placeholder={"Name des Reptils..."}
                    className={classes.textField}
                    InputLabelProps={{
                        style: { color: '#ffffff'},
                    }}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />

                {/*<Autocomplete*/}
                {/*    options={(reptiles.map((item: any) => item.name))}*/}
                {/*    sx={{width: 300, margin: "auto"}}*/}
                {/*    onChange={test}*/}
                {/*    value={searchValue}*/}
                {/*    renderInput={(params: any) =>*/}
                {/*        <TextField*/}
                {/*            {...params}*/}
                {/*            label="Reptil suchen"*/}
                {/*            sx={{input: {color: 'white'}}}*/}
                {/*            InputLabelProps={{*/}
                {/*                ...params.InputProps,*/}
                {/*                style: {color: '#ffffff'},*/}
                {/*            }}*/}
                {/*            InputProps={{*/}
                {/*                ...params.InputProps,*/}
                {/*                classes: {*/}
                {/*                    root: classes.cssOutlinedInput,*/}
                {/*                    focused: classes.cssFocused,*/}
                {/*                    notchedOutline: classes.notchedOutline*/}
                {/*                }*/}
                {/*            }}/>}*/}
                {/*/>*/}


                <Button id={"reptile-overview-add_reptile_button"} variant="contained" onClick={toggleAddReptileModal}>Reptil
                    hinzufügen</Button>




            </div>

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
                test={test}
                searchValue={searchValue}
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
                selectedBreederOption={selectedBreederOption}
                handleBreederSelect={handleBreederSelect}
                breeders={breeders}
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