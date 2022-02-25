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
import {breedersExample, feedingExample, noteExample, reptilesExample, weightExample} from "./helper/Constants";
import {ToastContainer} from "react-toastify";
import BreederOverview from "./pages/BreederOverview";
import {Breeder} from "./data/Breeder";

function createExampleReptile(): Reptile[] {
    let feedings: Feeding[] = [];
    let weights: Weight[] = [];
    let notes: Note[] = [];

    for (let j = 0; j < feedingExample.length; j++) {
        let newFeeding = new Feeding();
        newFeeding.setFeeding(feedingExample[j].weight, feedingExample[j].food, feedingExample[j].date)
        feedings.push(newFeeding);
    }

    for (let k = 0; k < weightExample.length; k++) {
        let newWeight = new Weight();
        newWeight.setWeight(weightExample[k].weight, weightExample[k].date)
        weights.push(newWeight);
    }

    for (let l = 0; l < noteExample.length; l++) {
        let newNote = new Note();
        newNote.setNote(noteExample[l].note, noteExample[l].date)
        notes.push(newNote);
    }

    let reptileList: Reptile[] = [];

    for (let i = 0; i < reptilesExample.length; i++) {
        let newReptile = new Reptile();

        newReptile.loadReptile(
            reptilesExample[i].name,
            reptilesExample[i].geburtsdatum,
            reptilesExample[i].art,
            reptilesExample[i].morph,
            reptilesExample[i].geschlecht,
            reptilesExample[i].ordnung,
            reptilesExample[i].image,
            feedings,
            notes,
            weights
        );

        reptileList.push(newReptile);
    }
    return reptileList;
}

function App() {

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


    function saveReptile(newReptile: Reptile): void {
        const newReptiles = [...reptiles, newReptile];
        setReptiles(newReptiles);
    }

    function editReptile(newReptile: Reptile, id: string): void {
        const newReptiles = [...reptiles];
        newReptiles[findBreederId(id)] = newReptile;
        setReptiles(newReptiles);
    }

    function saveFeeding(newFeeding: Feeding, index: number) {
        const newReptiles = [...reptiles];
        newReptiles[index].feedings.push(newFeeding);
        setReptiles(newReptiles);
    }


    function findBreederId(id: String): number {
        let index = 0;
        for (let i = 0; i < breeders.length; i++) {
            if (id === breeders[i].id) {
                index = i;
            }
        }
        return index;
    }


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
            let breederList: Breeder[] = [];

            for (let i = 0; i < breedersExample.length; i++) {
                let newBreeder = new Breeder();
                newBreeder.setBreeder(
                    breedersExample[i].companyName,
                    breedersExample[i].firstName,
                    breedersExample[i].lastName,
                    breedersExample[i].street,
                    breedersExample[i].postal,
                    breedersExample[i].place,
                    breedersExample[i].country,
                    breedersExample[i].email,
                    breedersExample[i].phone
                );

                breederList.push(newBreeder);
            }
            return breederList;
        }
    });


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

                        <Route path={'/'} element={<ReptileOverview reptiles={reptiles} setReptiles={setReptiles}
                                                                    saveReptile={saveReptile} saveFeeding={saveFeeding}
                                                                    editReptile={editReptile}/>}/>
                        <Route path={'reptilienUebersicht'}
                               element={<ReptileOverview reptiles={reptiles} setReptiles={setReptiles}
                                                         saveReptile={saveReptile} saveFeeding={saveFeeding}
                                                         editReptile={editReptile}/>}/>
                        <Route path={'reptileDetails/:id'}
                               element={<ReptileDetails reptiles={reptiles} setReptiles={setReptiles}
                                                        editReptile={editReptile}/>}/>

                        <Route path={'breeder'}
                               element={<BreederOverview breeders={breeders} setBreeders={setBreeders}/>}/>

                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                </div>
            </Router>
            <ToastContainer/>
        </div>
    )
}

export default App;

