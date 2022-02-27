import React, {useEffect, useState} from 'react';
import './App.css';
import ReptileOverview from "./pages/ReptileOverview";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ReptileDetails from "./pages/ReptileDetails";
import {Reptile} from "./data/Reptile";
import Feeding from "./data/Feeding";
import NotFound from "./pages/NotFound";
import Note from "./data/Note";
import Weight from "./data/Weight";
import {ToastContainer} from "react-toastify";
import BreederOverview from "./pages/BreederOverview";
import {Breeder} from "./data/Breeder";
import {createExampleBreeders, createExampleReptile} from "./helper/Functions";


function App() {

    /*---------------------------------------------------------------------------------------------------
                                            Reptildaten
    -----------------------------------------------------------------------------------------------------*/
    const [reptiles, setReptiles] = useState<Reptile[]>(() => {
        const items = localStorage.getItem("reptiles");
        if (items != null) {
            let parsed = JSON.parse(items);
            try {
                let reptileList: Reptile[] = [];

                let feedings: Feeding[] = [];
                let weights: Weight[] = [];
                let notes: Note[] = [];

                for (let i = 0; i < parsed.length; i++) {

                    feedings = [];
                    notes = [];
                    weights = [];

                    for (let j = 0; j < parsed[i]._feedings.length; j++) {
                        let newFeeding = new Feeding();
                        newFeeding.setFeeding(parsed[i]._feedings[j]._weight, parsed[i]._feedings[j]._food, parsed[i]._feedings[j]._date)
                        feedings.push(newFeeding);
                    }

                    for (let k = 0; k < parsed[i]._weights.length; k++) {
                        let newWeight = new Weight();
                        newWeight.setWeight(parsed[i]._weights[k]._weight, parsed[i]._weights[k]._date)
                        weights.push(newWeight);
                    }

                    for (let l = 0; l < parsed[i]._notes.length; l++) {
                        let newNote = new Note();
                        newNote.setNote(parsed[i]._notes[l]._note, parsed[i]._notes[l]._date)
                        notes.push(newNote);
                    }


                    let newReptile = new Reptile();
                    newReptile.loadReptile(
                        parsed[i]._name,
                        parsed[i]._birthday,
                        parsed[i]._type,
                        parsed[i]._morph,
                        parsed[i]._gender,
                        parsed[i]._species,
                        parsed[i]._image,
                        feedings,
                        notes,
                        weights
                    );

                    if (parsed[i]._breeder._lastName !== "") {
                        let breeder = new Breeder();
                        breeder.setBreeder(
                            parsed[i]._breeder._companyName,
                            parsed[i]._breeder._firstName,
                            parsed[i]._breeder._lastName,
                            parsed[i]._breeder._street,
                            parsed[i]._breeder._postal,
                            parsed[i]._breeder._place,
                            parsed[i]._breeder._country,
                            parsed[i]._breeder._mail,
                            parsed[i]._breeder._phone,
                        );
                        newReptile.setBreeder(breeder)
                    }

                    reptileList.push(newReptile);
                }
                return reptileList;
            } catch (e) {
                console.log(e)
                return []
            }
        } else {
            return createExampleReptile();
        }
    });

    /*---------------------------------------------------------------------------------------------------
                                         Reptil - Funktionen
    -----------------------------------------------------------------------------------------------------*/


    function saveReptile(newReptile: Reptile): void {
        const newReptiles = [...reptiles, newReptile];
        setReptiles(newReptiles);
    }

    function editReptile(newReptile: Reptile): void {
        const newReptiles = [...reptiles];
        newReptiles[findReptileIndex(newReptile.id)] = newReptile;
        setReptiles(newReptiles);
    }

    function deleteReptile(index: number): void {
        const newReptiles = [...reptiles];
        newReptiles.splice(index, 1);
        setReptiles(newReptiles);
    }

    function saveFeeding(newFeeding: Feeding, index: number): void {
        const newReptiles = [...reptiles];
        newReptiles[index].feedings.push(newFeeding);
        setReptiles(newReptiles);
    }

    function deleteFeeding(index: number, indexFood: number): void {
        const newReptiles = [...reptiles];
        newReptiles[index].feedings.splice(indexFood, 1);
        setReptiles(newReptiles);
    }

    function saveWeight(newWeight: Weight, index: number): void {
        const newReptiles = [...reptiles];
        newReptiles[index].weights.push(newWeight);
        setReptiles(newReptiles);
    }

    function deleteWeight(index: number, indexWeight: number): void {
        const newReptiles = [...reptiles];
        newReptiles[index].weights.splice(indexWeight, 1);
        setReptiles(newReptiles);
    }

    function saveNote(newNote: Note, index: number): void {
        const newReptiles = [...reptiles];
        newReptiles[index].notes.push(newNote);
        setReptiles(newReptiles);
    }

    function deleteNote(index: number, indexNote: number): void {
        const newReptiles = [...reptiles];
        newReptiles[index].notes.splice(indexNote, 1);
        setReptiles(newReptiles);
    }


    function findReptileIndex(id: String): number {
        let index = 0;
        for (let i = 0; i < reptiles.length; i++) {
            if (id === reptiles[i].id) {
                index = i;
            }
        }
        return index;
    }

    /*---------------------------------------------------------------------------------------------------
                                             Züchterdaten
    -----------------------------------------------------------------------------------------------------*/
    const [breeders, setBreeders] = useState<Breeder[]>(() => {

        const items = localStorage.getItem("breeders");
        if (items != null) {
            let parsed = JSON.parse(items);
            try {
                let breederList: Breeder[] = [];

                for (let i = 0; i < parsed.length; i++) {
                    let newBreeder = new Breeder();
                    newBreeder.setBreeder(
                        parsed[i]._companyName,
                        parsed[i]._firstName,
                        parsed[i]._lastName,
                        parsed[i]._street,
                        parsed[i]._postal,
                        parsed[i]._place,
                        parsed[i]._country,
                        parsed[i]._mail,
                        parsed[i]._phone
                    );

                    breederList.push(newBreeder);
                }

                return breederList;
            } catch (e) {
                console.log(e);
                return [];
            }
        } else {
            return createExampleBreeders();
        }
    });

    /*---------------------------------------------------------------------------------------------------
                                         Züchter Funktionen
    -----------------------------------------------------------------------------------------------------*/


    function saveBreeder(newBreeder: Breeder): void {
        const newBreeders = [...breeders, newBreeder];
        setBreeders(newBreeders);
    }

    function editBreeder(newBreeder: Breeder): void {
        const newBreeders = [...breeders];
        newBreeders[findBreederIndex(newBreeder.id)] = newBreeder;
        setBreeders(newBreeders);
    }

    function deleteBreeder(index: number): void {
        const newBreeders = [...breeders];
        newBreeders.splice(index, 1);
        setBreeders(newBreeders);
    }

    function findBreederIndex(id: String): number {
        let index = 0;
        for (let i = 0; i < breeders.length; i++) {
            if (id === breeders[i].id) {
                index = i;
            }
        }
        return index;
    }


    /*---------------------------------------------------------------------------------------------------
                                             Local Storage
    -----------------------------------------------------------------------------------------------------*/


    useEffect(() => {
        if (reptiles.length !== 0) {
            localStorage.setItem("reptiles", JSON.stringify(reptiles))
        } else {
            localStorage.removeItem("reptiles")
        }
    }, [reptiles]);

    useEffect(() => {
        if (breeders.length > 1) {
            localStorage.setItem("breeders", JSON.stringify(breeders))
        } else {
            localStorage.removeItem("breeders")
        }
    }, [breeders]);

    return (
        <div>
            <Router>
                <Navbar/>
                <div className="App">
                    <Routes>
                        <Route path={'/'}
                               element={<ReptileOverview
                                   reptiles={reptiles}
                                   saveReptile={saveReptile}
                                   saveFeeding={saveFeeding}
                                   saveWeight={saveWeight}
                                   saveNote={saveNote}
                                   editReptile={editReptile}
                                   deleteReptile={deleteReptile}
                                   breeders={breeders}
                               />}
                        />
                        <Route path={'reptilienUebersicht'}
                               element={<ReptileOverview
                                   reptiles={reptiles}
                                   saveReptile={saveReptile}
                                   saveFeeding={saveFeeding}
                                   saveWeight={saveWeight}
                                   saveNote={saveNote}
                                   editReptile={editReptile}
                                   deleteReptile={deleteReptile}
                                   breeders={breeders}
                               />}
                        />
                        <Route path={'reptileDetails/:id'}
                               element={<ReptileDetails
                                   reptiles={reptiles}
                                   saveFeeding={saveFeeding}
                                   deleteFeeding={deleteFeeding}
                                   saveWeight={saveWeight}
                                   deleteWeight={deleteWeight}
                                   saveNote={saveNote}
                                   deleteNote={deleteNote}
                                   setReptiles={setReptiles}
                                   editReptile={editReptile}
                                   deleteReptile={deleteReptile}
                                   breeders={breeders}
                               />}
                        />
                        <Route path={'breeder'}
                               element={<BreederOverview
                                   breeders={breeders}
                                   saveBreeder={saveBreeder}
                                   editBreeder={editBreeder}
                                   deleteBreeder={deleteBreeder}
                               />}
                        />
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                </div>
            </Router>
            <ToastContainer/>
        </div>
    )
}

export default App;

