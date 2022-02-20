import React, {useEffect, useState} from 'react';
import './App.css';
import {MDBNavbar} from "mdb-react-ui-kit";
import ReptileList from "./components/reptile/ReptileList";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Reptile from "./components/reptile/Reptile";
import Navbar from "./layout/Navbar";
import ReptileOverview from "./pages/ReptileOverview";
import ReptileDetails from "./pages/ReptileDetails";
import NotFound from "./pages/NotFound";
import {ReptileClass} from "./components/reptile/ReptileClass";
import FeedingClass from "./data/FeedingClass";

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
        image: "https://i.ibb.co/T1rggYm/Hubert.png",
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
        image: 'https://i.ibb.co/109Gkpr/Tifa.jpg',
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
        image:'https://i.ibb.co/BLnjXz7/Hektor.jpg',
        feedings: []
    },
];

function App() {


    const [reptiles, setReptiles] = useState<ReptileClass[]>(() => {
        const items = localStorage.getItem("reptile");
        if (items != null) {
            let parsed = JSON.parse(items);
            try {
                let array: ReptileClass[] = [];

                let feeding: FeedingClass[] = [];
                for (let i = 0; i < parsed.length; i++) {

                    for (let j = 0; j < parsed[i]._feedings.length; j++) { //TODO: Notes weights sehen identisch aus vllt iwie dynmaisch auslagern als Funktion
                        feeding = [];
                        let newFeeding = new FeedingClass();
                        newFeeding.setFoody(parsed[i]._feedings[j]._weight, parsed[i]._feedings[j]._feeding, parsed[i]._feedings[j]._date)
                        feeding.push(newFeeding);
                    }
                    let newReptile = new ReptileClass();
                    newReptile.loadReptile(parsed[i]._name, parsed[i]._birthday, parsed[i]._type, parsed[i]._morph, parsed[i]._gender, parsed[i]._species, feeding, parsed[i]._notes, parsed[i]._weights, parsed[i]._urlLink);
                    array.push(newReptile);
                }
                return array;
            } catch (e) {
                console.log(e)
                return []
            }
        } else {
            console.log("APFEL")

            let array: ReptileClass[] = [];

            console.log(reptilesExample[1].geschlecht);

            for (let i = 0; i < reptilesExample.length; i++) {
                let reptile1 = new ReptileClass();
                reptile1.loadReptile(reptilesExample[i].name, reptilesExample[i].geburtsdatum, reptilesExample[i].art, reptilesExample[i].morph, reptilesExample[i].geschlecht, reptilesExample[i].ordnung, [], [], [],  reptilesExample[i].image)
                array.push(reptile1);
            }

            console.log(array[0]);

            return array;
        }
    });

    useEffect(() => {
        if (reptiles.length !== 0)
            localStorage.setItem("reptile", JSON.stringify(reptiles))
        else {
            localStorage.removeItem("reptile") //damit definitiv keine Reptilien drinne sind wenn man alle löscht
        }
        console.log(localStorage.getItem("item"));
    }, [reptiles]); //Wenn sich todo an sich selber verändert

    //
    return (
        <div>


            <Router>
                <Navbar></Navbar>
                <div className={"container"}>

                    <div className="App">
                        <Routes>
                            <Route path={'/'} element={<ReptileList reptiles={reptiles} setReptiles={setReptiles}/>}/>
                            <Route path={'reptilienUebersicht'}
                                   element={<ReptileList reptiles={reptiles} setReptiles={setReptiles}/>}/>
                            {/*<Route path={'reptilienUebersicht/reptileDetails/:id'} element={<ReptileDetails reptiles = {reptiles} setReptiles = {setReptiles}/>}/>*/}
                            <Route path={'reptileDetails/:id'}
                                   element={<ReptileDetails reptiles={reptiles} setReptiles={setReptiles}/>}/>
                        </Routes>
                    </div>
                </div>

            </Router>
        </div>
    )
        ;
}

export default App;

