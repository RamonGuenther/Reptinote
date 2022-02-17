import React, {useEffect, useState} from "react";
import Reptile from "./Reptile";
import {ReptileClass} from "./ReptileClass";
import {
    MDBBtn,
    MDBInput,
    MDBModal, MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";

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
                    newReptile.setReptile(parsed[i]._name, parsed[i]._birthday, parsed[i]._type, parsed[i]._morph);
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


    //add
    function submit(event: any): void {
        event.preventDefault();
        // if(values.name === "" || values.birthday === "" || values.type === "" || values.morph === "") {
        //     return;
        // }
        const newReptile = new ReptileClass();
        newReptile.setReptile(values.name, values.birthday, values.type, values.morph);
        const newReptiles = [...reptiles, newReptile];
        setReptiles(newReptiles);
        setValues(initialValuesReptile); //reset
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

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    return (
        <div className={"bg-light mt-3 rounded p-5"}>
            <h1>Reptilien hinzufügen</h1>
            <form>
                {/*value= textinput = TwoWayDatabinding für das resetten */}

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
                    className={"mt-3 , bg-info"}
                    onClick={submit}
                    type="submit"
                    value="Hinzufügen"
                />
            </form>

            <>
                <MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn>
                <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Modal title</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>...</MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={toggleShow}>
                                    Close
                                </MDBBtn>
                                <MDBBtn>Save changes</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </>

            {reptiles.map((item: any, index: number) => { //Statt 3 mal todos.description...
                return (
                    <Reptile
                        name={item._name}
                        birthday={item._birthday}
                        type={item._type}
                        morph={item._morph}
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