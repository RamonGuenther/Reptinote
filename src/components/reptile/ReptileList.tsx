import React, {useEffect, useState} from "react";
import Reptile from "./Reptile";
import {ReptileClass} from "./ReptileClass";
import Modal from "../Modal";

const initialValuesReptile = {
    name: "",
    birthday: "",
    type: "",
    morph: "",
};

//TODO: Statt klassen interfaces???
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
                return [];
            }
        } else {
            return []; //wenn localstorage gelöscht wird crasht es deshalb oder
        }
    });

    const [values, setValues] = useState(initialValuesReptile);
    const [basicModal, setBasicModal] = useState(false);

    const [selectedGenderOption, setSelectedGenderOption] = useState(null);

    const [selectedSpeciesOption, setSelectedSpeciesOption] = useState(null);


    //add
    function submit(event: any): void {
        event.preventDefault();
        if (values.name === "" || values.birthday === "" || values.type === "" || values.morph === "" || selectedGenderOption === null || selectedSpeciesOption === null) {
            return;
        }
        const newReptile = new ReptileClass();
        newReptile.setReptile(values.name, values.birthday, values.type, values.morph, selectedGenderOption, selectedSpeciesOption);
        const newReptiles = [...reptiles, newReptile];
        setReptiles(newReptiles);
        setValues(initialValuesReptile); //reset
        // setSelectedGenderOption(null);
        // setSelectedSpeciesOption(null);
        toggleShow();
    }


    //TODO: Function auch möglich!!!
    //delete
    function deleteReptile(index: number): void {
        const newTodos = [...reptiles];
        newTodos.splice(index, 1);
        setReptiles(newTodos);
    }

    useEffect(() => {
        if (reptiles.length !== 0)
            localStorage.setItem("reptile", JSON.stringify(reptiles))
        else {
            localStorage.removeItem("reptile") //damit definitiv keine Reptilien drinne sind wenn man alle löscht
        }
        console.log(localStorage.getItem("item"));
    }, [reptiles]); //Wenn sich todo an sich selber verändert


    function handleInputChange(e: any): void {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }


    function toggleShow(): void {
        setBasicModal(!basicModal)
    }


    return (
        <div className={" mt-3 rounded p-5"}>


            <Modal
                toggleShow={toggleShow}
                setBasicModal={setBasicModal}
                basicModal={basicModal}
                handleInputChange={handleInputChange}
                values={values}
                submit={submit}
                selectedGenderOption={selectedGenderOption}
                setSelectedGenderOption={setSelectedGenderOption}
                selectedSpeciesOption={selectedSpeciesOption}
                setSelectedSpeciesOption={setSelectedSpeciesOption}
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
                    />
                )
            })}
        </div>
    )
}

export default ReptileList;