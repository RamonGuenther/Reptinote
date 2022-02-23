import React, {useEffect, useState} from "react";
import ReptileCard from "../components/reptile/ReptileCard";
import {ReptileClass} from "../data/ReptileClass";
import AddReptileModal from "../components/modals/AddReptileModal";
import 'react-toastify/dist/ReactToastify.css';
import FeedingClass from "../data/FeedingClass";
import AddFeedingModal from "../components/modals/AddFeedingModal";
import AddWeightModal from "../components/modals/AddWeightModal";
import AddNoteModal from "../components/modals/AddNoteModal";
import NoteClass from "../data/NoteClass";
import WeightClass from "../data/WeightClass";
import EditReptileModal from "../components/modals/EditReptileModal";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {initialValuesFeeding, initialValuesReptile} from "../helper/Constants";
import {notifyFailure, notifySuccess} from "../helper/Toasts";



//TODO: Statt klassen interfaces??? // WAHrscheinlich keine neuen States
function ReptileOverview({reptiles, setReptiles, saveReptile, saveFeeding, editReptile}: any) {

    const [reptileValues, setReptileValues] = useState(initialValuesReptile);
    const [feedingValues, setFeedingValues] = useState(initialValuesFeeding);

    const [reptileModal, setReptileModal] = useState(false);
    const [feedingModal, setFeedingModal] = useState(false);
    const [weightModal, setWeightModal] = useState(false);
    const [noteModal, setNoteModal] = useState(false);

    const [selectedGenderOption, setSelectedGenderOption] = useState("");
    const [selectedSpeciesOption, setSelectedSpeciesOption] = useState("");


    //add
    function addReptile(event: any): void {
        event.preventDefault();
        if (reptileValues.name === "" || reptileValues.birthday === "" || reptileValues.type === "" || reptileValues.morph === "" || selectedGenderOption === null || selectedSpeciesOption === null) {
            notifyFailure("Bitte alle Pflichtfelder ausfüllen!");
            return;
        }
        let newReptile = new ReptileClass();
        newReptile.setReptile(reptileValues.name, reptileValues.birthday, reptileValues.type, reptileValues.morph, selectedGenderOption, selectedSpeciesOption, reptileValues.image);

        if (reptileModal) {
            saveReptile(newReptile);
            setReptileValues(initialValuesReptile); //reset
            notifySuccess("Das Reptil " + reptileValues.name +" wurde gespeichert.");
            toggleReptileModal();
        } else if (reptileEditModal) {
            editReptile(newReptile, reptileId)
            setReptileValues(initialValuesReptile); //reset
            notifySuccess("Das Reptil " + reptileValues.name + " wurde bearbeitet.");
            toggle();
        }
    }


    function addFeeding(index: number, event: any): void { //TODO: onClick={() => {onDeleteReptile(index)}}
        event.preventDefault();
        console.log(index)
        if (feedingValues.type === "" || feedingValues.weight === " ") { //TODO: wie validieren
            notifyFailure("Bitte alle Felder füllen")
            return;
        }
        let feeding = new FeedingClass();
        feeding.setFoody(feedingValues.weight, feedingValues.type, startDate.toLocaleDateString());
        saveFeeding(feeding, index);
        setFeedingValues(initialValuesFeeding)
        setStartDate(new Date());
        notifySuccess("Fütterung gespeichert");
        toggleFeedingModal();
    }


    function deleteReptile(index: number): void {
        const newTodos = [...reptiles];
        newTodos.splice(index, 1);
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


    const [reptileId, setReptileId] = useState(0);

    function toggleReptileModal(): void {
        setReptileValues(initialValuesReptile);
        setReptileModal(!reptileModal);
    }

    function toggleFeedingModal(): void {
        setFeedingModal(!feedingModal);
    }

    function toggleWeightModal(): void {
        setWeightModal(!weightModal);
    }

    function toggleNoteModal(): void {
        setNoteModal(!noteModal);
    }


    const [startDate, setStartDate] = useState(new Date());

    const [inputWeight, setInputWeight] = useState("");

    const [inputNote, setInputNote] = useState("");

    function changeWeight(event: any) {
        setInputWeight(event.target.value)
    }

    function changeNote(event: any) {
        setInputNote(event.target.value)
    }

    function handleSpeciesSelect(event : any){
        setSelectedSpeciesOption(event.target.value)
    }

    function handleGenderSelect(event : any){
        setSelectedGenderOption(event.target.value)
    }

    function submitNote(event: any, index: number) {
        event.preventDefault();
        console.log(index)
        // if (feedingValues.type === "" || feedingValues.weight ===" ") { //TODO: wie validieren
        //     notify(); //TODO eigenes
        //     return;
        // }
        const newTodos = [...reptiles];
        let note = new NoteClass();
        note.setNote(inputNote, startDate.toLocaleDateString());
        newTodos[index].notes.push(note);
        setReptiles(newTodos);
        setInputNote("");
        setStartDate(new Date());
        toggleNoteModal();

    }

    function submitWeight(event: any, index: number) {
        event.preventDefault();
        console.log(index)
        // if (feedingValues.type === "" || feedingValues.weight ===" ") { //TODO: wie validieren
        //     notify(); //TODO eigenes
        //     return;
        // }
        const newTodos = [...reptiles];
        let weight = new WeightClass();
        weight.setWeight(inputWeight, startDate.toLocaleDateString());
        newTodos[index].weights.push(weight);
        setReptiles(newTodos);
        setInputWeight("");
        setStartDate(new Date());
        toggleWeightModal();
    }


    const [reptileEditModal, setReptileEditModal] = useState(false);

    //TODO: Verzögert
    function initializeEdit() {
        let name = reptiles[reptileId].name;
        let birthday = reptiles[reptileId].birthday;
        let type = reptiles[reptileId].type;
        let morph = reptiles[reptileId].morph;
        let image = reptiles[reptileId].image;
        setSelectedGenderOption(reptiles[reptileId].gender);
        setSelectedSpeciesOption(reptiles[reptileId].species);
        setReptileValues({name: name, birthday: birthday, type: type, morph: morph, image: image})
        console.log(reptileId + " aufruf");
    }

    function toggle(){
        setReptileEditModal(!reptileEditModal);
    }


    const [searchValue, setSearchValue] = useState("")

    function test(event:any){

        setSearchValue(event.target.value);
        console.log(searchValue);

    }

    //TODO: Ivonne zeigen wie behindert das schon wieder ist
    useEffect(()=>{
        initializeEdit();
    },[reptileEditModal])

    return (
        <div className={" mt-3 rounded p-5 container"}>

            {/*<Autocomplete*/}
            {/*    disablePortal*/}
            {/*    options={reptiles.map((item: any, index: number) =>{return {label: item.name}})}*/}
            {/*    sx={{ width: 300 }}*/}
            {/*    onChange={(e: any) => test(e)}*/}
            {/*    value={searchValue}*/}
            {/*    renderInput={(params:any) => <TextField {...params} label="Reptil suchen" />}*/}
            {/*/>*/}

            <TextField
                type={"text"}
                value={searchValue}
                label={"Reptil suchen"}
                onChange={(e: any) => setSearchValue(e.target.value)}
            />


            <AddReptileModal
                toggleShow={toggleReptileModal}
                basicModal={reptileModal}
                handleInputChange={handleInputChangeReptile}
                values={reptileValues}
                submit={addReptile}
                selectedGenderOption={selectedGenderOption}
                handleGenderSelect={handleGenderSelect}
                selectedSpeciesOption={selectedSpeciesOption}
                handleSpeciesSelect={handleSpeciesSelect}
            />

            <AddFeedingModal
                toggleShow={toggleFeedingModal}
                setBasicModal={setFeedingModal}
                basicModal={feedingModal}
                values={feedingValues}
                handleInputChange={handleInputChangeFeeding}
                submit={addFeeding}
                index={reptileId}
                startDate={startDate}
                setStartDate={setStartDate}
            />

            <AddWeightModal
                toggleShow={toggleWeightModal}
                basicModal={weightModal}
                startDate={startDate}
                setStartDate={setStartDate}
                inputWeight={inputWeight}
                changeWeight={changeWeight}
                submit={submitWeight}
                index={reptileId}
            />

            <AddNoteModal
                toggleShow={toggleNoteModal}
                setBasicModal={setNoteModal}
                basicModal={noteModal}
                startDate={startDate}
                setStartDate={setStartDate}
                inputNote={inputNote}
                changeNote={changeNote}
                submit={submitNote}
                index={reptileId}
            />

            <EditReptileModal
                toggleShow={toggle}
                basicModal={reptileEditModal}
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

                        item={item}

                        reptileList={reptiles}
                        key={index}
                        index={index}
                        // onChangeTodo={changeTodo} //Funktion der anderen Seite geben
                        onDeleteReptile={deleteReptile}
                        addFeeding={addFeeding}
                        toggleFeedingModal={toggleFeedingModal}
                        toggleWeightModal={toggleWeightModal}
                        toggleNoteModal={toggleNoteModal}
                        toggleReptileEditModal={toggle}
                        setReptileId={setReptileId}
                    />
                )
            })}
        </div>
    )
}

export default ReptileOverview;