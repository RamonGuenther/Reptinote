import React, {useEffect, useState} from 'react';
import './App.css';
import ReptileOverview from "./pages/ReptileOverview";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ReptileDetails from "./pages/ReptileDetails";
import {ReptileClass} from "./data/ReptileClass";
import FeedingClass from "./data/FeedingClass";
import NotFound from "./pages/NotFound";
import NoteClass from "./data/NoteClass";
import WeightClass from "./data/WeightClass";
import {reptilesExample} from "./helper/Constants";
import {ToastContainer} from "react-toastify";
import BreederOverview from "./pages/BreederOverview";



//TODO: Dummy daten auch für feedings und notes machen
function App() {

    // function loadReptileData(reptil: ReptileClass, feeding: FeedingClass[], note: NoteClass[], weight: WeightClass[]) {
    //
    //
    // }

    const [reptiles, setReptiles] = useState<ReptileClass[]>(() => {
        const items = localStorage.getItem("reptile");
        if (items != null) {
            let parsed = JSON.parse(items);
            try {
                let reptileList: ReptileClass[] = [];

                let feedings: FeedingClass[] = [];
                let weights: WeightClass[] = [];
                let notes: NoteClass[] = [];

                for (let i = 0; i < parsed.length; i++) {

                    feedings = [];
                    notes = [];
                    weights = [];

                    for (let j = 0; j < parsed[i]._feedings.length; j++) {
                        let newFeeding = new FeedingClass();
                        newFeeding.setFoody(parsed[i]._feedings[j]._weight, parsed[i]._feedings[j]._feeding, parsed[i]._feedings[j]._date)
                        feedings.push(newFeeding);
                    }

                    for (let k = 0; k < parsed[i]._weights.length; k++) {
                        let newWeight = new WeightClass();
                        newWeight.setWeight(parsed[i]._weights[k]._weight, parsed[i]._weights[k]._date)
                        weights.push(newWeight);
                    }

                    for (let l = 0; l < parsed[i]._notes.length; l++) {
                        let newNote = new NoteClass();
                        newNote.setNote(parsed[i]._notes[l]._note, parsed[i]._notes[l]._date)
                        notes.push(newNote);
                    }

                    let newReptile = new ReptileClass();
                    newReptile.loadReptile(parsed[i]._name, parsed[i]._birthday, parsed[i]._type, parsed[i]._morph, parsed[i]._gender, parsed[i]._species, feedings, notes, weights, parsed[i]._image);
                    reptileList.push(newReptile);
                }
                return reptileList;
            } catch (e) {
                console.log(e)
                return []
            }
        } else {
            let reptileList: ReptileClass[] = [];

            for (let i = 0; i < reptilesExample.length; i++) {
                let reptile1 = new ReptileClass();
                reptile1.loadReptile(reptilesExample[i].name, reptilesExample[i].geburtsdatum, reptilesExample[i].art, reptilesExample[i].morph, reptilesExample[i].geschlecht, reptilesExample[i].ordnung, [], [], [], reptilesExample[i].image)
                reptileList.push(reptile1);
            }
            return reptileList;
        }
    });

    function saveReptile(newReptile: ReptileClass): void {
        const newReptiles = [...reptiles, newReptile];
        setReptiles(newReptiles);
    }

    function editReptile(newReptile: ReptileClass, index: number): void {
        const newReptiles = [...reptiles];
        newReptiles[index] = newReptile;
        setReptiles(newReptiles);
    }

    function saveFeeding(newFeeding: FeedingClass, index: number) {
        const newReptiles = [...reptiles];
        newReptiles[index].feedings.push(newFeeding);
        setReptiles(newReptiles);
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
        <div>
            <Router>
                <Navbar/>
                <div className="App">
                    <Routes>

                        document.title = 'Your page title here';
                        <Route  path={'/'} element={<ReptileOverview reptiles={reptiles} setReptiles={setReptiles}
                                                                    saveReptile={saveReptile} saveFeeding={saveFeeding}
                                                                    editReptile={editReptile}/>}/>
                        <Route path={'reptilienUebersicht'}
                               element={<ReptileOverview reptiles={reptiles} setReptiles={setReptiles}
                                                         saveReptile={saveReptile} saveFeeding={saveFeeding}
                                                         editReptile={editReptile}/>}/>
                        <Route path={'reptileDetails/:id'}
                               element={<ReptileDetails reptiles={reptiles} setReptiles={setReptiles} />}/>

                        <Route path={'breeder'}
                               element={<BreederOverview />}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                </div>
            </Router>
            <ToastContainer/>
        </div>
    )
}

export default App;

