import React, {useEffect, useState} from "react";
import Reptile from "./Reptile";
import {ReptileClass} from "./ReptileClass";
import AddReptileModal from "../modals/AddReptileModal";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeedingClass from "../../data/FeedingClass";
import AddFeedingModal from "../modals/AddFeedingModal";
import AddWeightModal from "../modals/AddWeightModal";
import {BiNote} from "react-icons/all";
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
};

const initialValuesFeeding = {
    type: "",
    weight: "",
}

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


const reptilesExample = [
    {
        id: 1,
        name: 'Hubert',
        geburtsdatum: 'NZ20',
        geschlecht: optionsGender[1],
        ordnung: optionsSpecies[0],
        art: 'Westliche Hakennasennatter',
        morph: 'Superconda het. Toxic',
        feedings: []
    },
    {
        id: 2,
        name: 'Tifa',
        geburtsdatum: 'NZ21',
        geschlecht: optionsGender[0],
        ordnung: optionsSpecies[0],
        art: 'Boa Constrictor Imperator',
        morph: 'IMG het. Leopard',
        feedings: []
    },
    {
        id: 3,
        name: 'Hektor',
        geburtsdatum: 'NZ21',
        geschlecht: optionsGender[1],
        ordnung: optionsSpecies[0],
        art: 'Boa Constrictor Constrictor',
        morph: 'Classic',
        feedings: []
    },
];

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
function ReptileList() {

    const [reptiles, setReptiles] = useState<ReptileClass[]>(() => {
        const items = localStorage.getItem("reptile");
        if (items != null) {
            let parsed = JSON.parse(items);
            try {
                let array: ReptileClass[] = [];
                console.log(parsed[0]._description)
                for (let i = 0; i < parsed.length; i++) {
                    let newReptile = new ReptileClass();
                    newReptile.loadReptile(parsed[i]._name, parsed[i]._birthday, parsed[i]._type, parsed[i]._morph, parsed[i]._gender, parsed[i]._species, parsed[i]._feedings, parsed[i]._notes, parsed[i]._weights);
                    array.push(newReptile);
                }
                return array;
            } catch (e) {
                return []
            }
        } else {
            console.log("APFEL")

            let array: ReptileClass[] = [];

            console.log(reptilesExample[1].geschlecht);

            for (let i = 0; i < reptilesExample.length; i++) {
                let reptile1 = new ReptileClass();
                reptile1.loadReptile(reptilesExample[i].name, reptilesExample[i].geburtsdatum, reptilesExample[i].art, reptilesExample[i].morph, reptilesExample[i].geschlecht, reptilesExample[i].ordnung, [], [], [])
                array.push(reptile1);
            }

            // let feeding = new FeedingClass();
            //
            // array[0].feedings.push(feeding);

            console.log(array[0]);

            return array;
        }
    });

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
        newReptile.setReptile(reptileValues.name, reptileValues.birthday, reptileValues.type, reptileValues.morph, selectedGenderOption, selectedSpeciesOption);
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

    useEffect(() => {
        if (reptiles.length !== 0)
            localStorage.setItem("reptile", JSON.stringify(reptiles))
        else {
            localStorage.removeItem("reptile") //damit definitiv keine Reptilien drinne sind wenn man alle löscht
        }
        console.log(localStorage.getItem("item"));
    }, [reptiles]); //Wenn sich todo an sich selber verändert


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


    return (


        <div className={" mt-3 rounded p-5"}>

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


            {reptiles.map((item: any, index: number) => { //Statt 3 mal todos.description...
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