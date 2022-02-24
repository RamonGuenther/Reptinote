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
import {breedersExample, optionsGender, optionsSpecies, reptilesExample} from "./helper/Constants";
import {ToastContainer} from "react-toastify";
import BreederOverview from "./pages/BreederOverview";
import {Breeder} from "./data/Breeder";


//TODO: Dummy daten auch für feedings und notes machen
function App() {

    // function loadReptileData(reptil: Reptile, feeding: Feeding[], note: Note[], weight: Weight[]) {
    //
    //
    // }

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
                        newFeeding.setFeeding(parsed[i]._feedings[j]._weight, parsed[i]._feedings[j]._feeding, parsed[i]._feedings[j]._date)
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
                        feedings,
                        notes,
                        weights,
                        parsed[i]._image);

                    reptileList.push(newReptile);
                }
                return reptileList;
            } catch (e) {
                console.log(e)
                return []
            }
        } else {
            let reptileList: Reptile[] = [];

            for (let i = 0; i < reptilesExample.length; i++) {
                let reptile1 = new Reptile();

                reptile1.loadReptile(
                    reptilesExample[i].name,
                    reptilesExample[i].geburtsdatum,
                    reptilesExample[i].art,
                    reptilesExample[i].morph,
                    reptilesExample[i].geschlecht,
                    reptilesExample[i].ordnung,
                    [],
                    [],
                    [],
                    reptilesExample[i].image);

                reptileList.push(reptile1);
            }
            return reptileList;
        }
    });

    function saveReptile(newReptile: Reptile): void {
        const newReptiles = [...reptiles, newReptile];
        setReptiles(newReptiles);
    }

    function editReptile(newReptile: Reptile, index: number): void {
        const newReptiles = [...reptiles];
        newReptiles[index] = newReptile;
        setReptiles(newReptiles);
    }

    function saveFeeding(newFeeding: Feeding, index: number) {
        const newReptiles = [...reptiles];
        newReptiles[index].feedings.push(newFeeding);
        setReptiles(newReptiles);
    }


    const [breeders, setBreeders] = useState<Breeder[]>(() => {

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
                breedersExample[i].phone);

            breederList.push(newBreeder);
        }
        return breederList;


        // const items = localStorage.getItem("reptiles");
        // if (items != null) {
        //     let parsed = JSON.parse(items);
        //     try {
        //         let reptileList: Reptile[] = [];
        //
        //         let feedings: Feeding[] = [];
        //         let weights: Weight[] = [];
        //         let notes: Note[] = [];
        //
        //         for (let i = 0; i < parsed.length; i++) {
        //
        //             feedings = [];
        //             notes = [];
        //             weights = [];
        //
        //             for (let j = 0; j < parsed[i]._feedings.length; j++) {
        //                 let newFeeding = new Feeding();
        //                 newFeeding.setFoody(parsed[i]._feedings[j]._weight, parsed[i]._feedings[j]._feeding, parsed[i]._feedings[j]._date)
        //                 feedings.push(newFeeding);
        //             }
        //
        //             for (let k = 0; k < parsed[i]._weights.length; k++) {
        //                 let newWeight = new Weight();
        //                 newWeight.setWeight(parsed[i]._weights[k]._weight, parsed[i]._weights[k]._date)
        //                 weights.push(newWeight);
        //             }
        //
        //             for (let l = 0; l < parsed[i]._notes.length; l++) {
        //                 let newNote = new Note();
        //                 newNote.setNote(parsed[i]._notes[l]._note, parsed[i]._notes[l]._date)
        //                 notes.push(newNote);
        //             }
        //
        //             let newReptile = new Reptile();
        //             newReptile.loadReptile(parsed[i]._name, parsed[i]._birthday, parsed[i]._type, parsed[i]._morph, parsed[i]._gender, parsed[i]._species, feedings, notes, weights, parsed[i]._image);
        //             reptileList.push(newReptile);
        //         }
        //         return reptileList;
        //     } catch (e) {
        //         console.log(e)
        //         return []
        //     }
        // } else {
        //     let reptileList: Reptile[] = [];
        //
        //     for (let i = 0; i < reptilesExample.length; i++) {
        //         let reptile1 = new Reptile();
        //         reptile1.loadReptile(reptilesExample[i].name, reptilesExample[i].geburtsdatum, reptilesExample[i].art, reptilesExample[i].morph, reptilesExample[i].geschlecht, reptilesExample[i].ordnung, [], [], [], reptilesExample[i].image)
        //         reptileList.push(reptile1);
        //     }
        //     return reptileList;
        // }
    });


    useEffect(() => {
        if (reptiles.length !== 0) {
            localStorage.setItem("reptiles", JSON.stringify(reptiles))
        } else {
            localStorage.removeItem("reptiles") //damit definitiv keine Reptilien drinne sind wenn man alle löscht
        }
        if (breeders.length !== 0) {
            localStorage.setItem("breeders", JSON.stringify(breeders))
        } else {
            localStorage.removeItem("breeders") //damit definitiv keine Reptilien drinne sind wenn man alle löscht
        }

    }, [reptiles, breeders]); //Wenn sich todo an sich selber verändert


    return (
        <div>
            <Router>
                <Navbar/>
                <div className="App">
                    <Routes>

                        document.title = 'Your page title here';
                        <Route path={'/'} element={<ReptileOverview reptiles={reptiles} setReptiles={setReptiles}
                                                                    saveReptile={saveReptile} saveFeeding={saveFeeding}
                                                                    editReptile={editReptile}/>}/>
                        <Route path={'reptilienUebersicht'}
                               element={<ReptileOverview reptiles={reptiles} setReptiles={setReptiles}
                                                         saveReptile={saveReptile} saveFeeding={saveFeeding}
                                                         editReptile={editReptile}/>}/>
                        <Route path={'reptileDetails/:id'}
                               element={<ReptileDetails reptiles={reptiles} setReptiles={setReptiles}/>}/>

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

