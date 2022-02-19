import React, {useEffect, useState} from "react";
import Reptile from "./Reptile";
import {ReptileClass} from "./ReptileClass";
import AddReptileModal from "../modals/AddReptileModal";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeedingClass from "../entities/FeedingClass";
import AddFeedingModal from "../modals/AddFeedingModal";

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
    weight: 1,
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
                    newReptile.setReptile(parsed[i]._name, parsed[i]._birthday, parsed[i]._type, parsed[i]._morph, parsed[i]._gender, parsed[i]._species);
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
                reptile1.setReptile(reptilesExample[i].name, reptilesExample[i].geburtsdatum, reptilesExample[i].art, reptilesExample[i].morph, reptilesExample[i].geschlecht, reptilesExample[i].ordnung)
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


    function addFeeding(event: any, index: number): void {
        event.preventDefault();
        if (feedingValues.type === "") { //TODO: wie validieren
            notify(); //TODO eigenes
            return;
        }
        const newTodos = [...reptiles];
        let feeding = new FeedingClass();
        feeding.setFoody(feedingValues.weight, feedingValues.type);
        newTodos[index].feedings.push(feeding);
        setReptiles(newTodos);
        setFeedingValues(initialValuesFeeding)
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


    function toggleReptileModal(): void {
        setReptileModal(!reptileModal);
    }

    function toggleFeedingModal(): void {
        setFeedingModal(!feedingModal);
    }

    useEffect(() => {
        if (reptiles.length !== 0)
            localStorage.setItem("reptile", JSON.stringify(reptiles))
        else {
            localStorage.removeItem("reptile") //damit definitiv keine Reptilien drinne sind wenn man alle löscht
        }
        console.log(localStorage.getItem("item"));
    }, [reptiles]); //Wenn sich todo an sich selber verändert



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
                        key={index}
                        index={index}
                        // onChangeTodo={changeTodo} //Funktion der anderen Seite geben
                        onDeleteReptile={deleteReptile}
                        addFeeding={addFeeding}
                        toggleShow={toggleFeedingModal}
                    />
                )
            })}
        </div>
    )
}

export default ReptileList;