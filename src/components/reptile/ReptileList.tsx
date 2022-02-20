import React, {useEffect, useState} from "react";
import Reptile from "./Reptile";
import {ReptileClass} from "./ReptileClass";
import AddReptileModal from "../modals/AddReptileModal";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeedingClass from "../../data/FeedingClass";
import AddFeedingModal from "../modals/AddFeedingModal";
import AddWeightModal from "../modals/AddWeightModal";
import AddNoteModal from "../modals/AddNoteModal";
import NoteClass from "../../data/NoteClass";
import WeightClass from "../../data/WeightClass";

/**
 * TODO:
 *      - Neues Modal brauch auch eine ID
 *
 */
const initialValuesReptile = {
    name: "",
    birthday: "",
    type: "",
    morph: "",
    image: ""
};

const initialValuesFeeding = {
    type: "",
    weight: "",
}



const feedings = [
    {
        id: 1,
        date: new Date(),
        type: 'Specki',
        weight: 5.0,
    },
    {
        id: 2,
        date: new Date(),
        type: 'Specki XL',
        weight: 4.0,
    }
];

//TODO: Statt klassen interfaces??? // WAHrscheinlich keine neuen States
function ReptileList({reptiles, setReptiles} :any) {

    const [reptileValues, setReptileValues] = useState(initialValuesReptile);
    const [feedingValues, setFeedingValues] = useState(initialValuesFeeding);


    const [reptileModal, setReptileModal] = useState(false);
    const [feedingModal, setFeedingModal] = useState(false);
    const [weightModal, setWeightModal] = useState(false);
    const [noteModal, setNoteModal] = useState(false);


    const [selectedGenderOption, setSelectedGenderOption] = useState(null);
    const [selectedSpeciesOption, setSelectedSpeciesOption] = useState(null);


    const notify = () => toast.error("Bitte alle Felder ausfüllen! Morph muss nicht bekannt sein.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    //add
    function addReptile(event: any): void {
        event.preventDefault();
        if (reptileValues.name === "" || reptileValues.birthday === "" || reptileValues.type === "" || reptileValues.morph === "" || selectedGenderOption === null || selectedSpeciesOption === null) {
            notify();
            return;
        }
        const newReptile = new ReptileClass();
        newReptile.setReptile(reptileValues.name, reptileValues.birthday, reptileValues.type, reptileValues.morph, selectedGenderOption, selectedSpeciesOption, reptileValues.image);
        const newReptiles = [...reptiles, newReptile];
        setReptiles(newReptiles);
        setReptileValues(initialValuesReptile); //reset
        toggleReptileModal();
    }


    function addFeeding(index: number, event: any): void { //TODO: onClick={() => {onDeleteReptile(index)}}
        event.preventDefault();
        console.log(index)
        if (feedingValues.type === "" || feedingValues.weight === " ") { //TODO: wie validieren
            notify(); //TODO eigenes
            return;
        }
        const newTodos = [...reptiles];
        let feeding = new FeedingClass();
        feeding.setFoody(feedingValues.weight, feedingValues.type, startDate.toLocaleDateString());
        newTodos[index].feedings.push(feeding);

        setReptiles(newTodos);
        setFeedingValues(initialValuesFeeding)
        setStartDate(new Date());
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


    const [searchValue, setSearchValue] = useState("")

    return (
        <div className={" mt-3 rounded p-5"}>
            <input
                type={"text"}
                value={searchValue}
                onChange={ (e:any) => setSearchValue(e.target.value)}
            />

            <AddReptileModal
                toggleShow={toggleReptileModal}
                setBasicModal={setReptileModal}
                basicModal={reptileModal}
                handleInputChange={handleInputChangeReptile}
                values={reptileValues}
                submit={addReptile}
                selectedGenderOption={selectedGenderOption}
                setSelectedGenderOption={setSelectedGenderOption}
                selectedSpeciesOption={selectedSpeciesOption}
                setSelectedSpeciesOption={setSelectedSpeciesOption}
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
                setBasicModal={setWeightModal}
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

            {reptiles.filter((reptil: { name: string; }) => reptil.name.match(new RegExp(searchValue, "i"))).map((item: any, index: number) => {
                return (
                    <Reptile
                        name={item._name}
                        birthday={item._birthday}
                        type={item._type}
                        morph={item._morph}
                        gender={item._gender.label}
                        species={item._species.label}
                        feedings={item._feedings}
                        weights={item._weights}
                        notes={item._notes}
                        image = {item._urlLink}

                        item = {item}

                        reptileList = {reptiles}
                        key={index}
                        index={index}
                        // onChangeTodo={changeTodo} //Funktion der anderen Seite geben
                        onDeleteReptile={deleteReptile}
                        addFeeding={addFeeding}
                        toggleFeedingModal={toggleFeedingModal}
                        toggleWeightModal={toggleWeightModal}
                        toggleNoteModal={toggleNoteModal}
                        setReptileId={setReptileId}
                    />
                )
            })}
        </div>
    )
}

export default ReptileList;