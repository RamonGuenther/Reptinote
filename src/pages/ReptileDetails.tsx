import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import FeedingClass from "../data/FeedingClass";
import {Box, Button, Paper, Tab} from "@mui/material";
import FeedTable from "../components/tables/FeedTable";
import {ReptileClass} from "../data/ReptileClass";
import ReptileInformation from "../components/reptile/ReptileInformation";
import "./reptileDetails.css"
import {TabContext, TabList, TabPanel} from "@mui/lab";
import WeightClass from "../data/WeightClass";
import NoteClass from "../data/NoteClass";
import NotesTable from "../components/tables/NotesTable";
import WeightsTable from "../components/tables/WeightsTable";
/**
 *
 * TODO: Wie Ivonne Löschen und hinzufügen auf dem Tab
 */
const ReptileDetails = ({reptiles}: any) => {

    let {id} = useParams();
    let index: number = 0;


    if (typeof id === "string") {
        index = parseInt(id);
    }

    const [feedings, setFeedings] = useState<FeedingClass[]>(reptiles[index]._feedings);

    const [weights, setWeights] = useState<WeightClass[]>(reptiles[index]._weights);

    const [notes, setNotes] = useState<NoteClass[]>(reptiles[index]._notes);

    const [reptile, setReptile] = useState<ReptileClass>(reptiles[index]);


    function deleteFeeding(){
        const newReptile = reptile;
        let index: number = 0;
        for (let i = 0; i < newReptile.feedings.length; i++) {
            if (id === newReptile.feedings[i].id) {
                index = i;
            }
        }
        newReptile.feedings.splice(index, 1);
        let test : FeedingClass[] = feedings;
        test.splice(index,1);

        setFeedings(test);
        setReptile(newReptile);
    }



    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };



    return (
        <>
            <div className={"reptileDetails"}>

                <section className={"section1"}>

                    <ReptileInformation
                        reptile={reptile}
                    />
                </section>

                <section className="section2">
                    <TabContext value={value}>
                        <TabList variant={"fullWidth"} onChange={handleChange} aria-label="lab API tabs example">
                            <Tab className={"tab"}
                                 label={<span style={{color: 'white'}}>Fütterungen</span>}
                                 value="1"/>
                            <Tab label={<span style={{color: 'white'}}>Notizen</span>}
                                 value="2"/>
                            <Tab label={<span style={{color: 'white'}}>Gewichtsmessungen</span>}
                                 value="3"/>
                        </TabList>
                        <TabPanel value="1">
                            <Button>Hinzufügen</Button>
                            <FeedTable feedData={reptile.feedings}  reptile={reptile} setReptile = {setReptile} deleteFeeding={deleteFeeding}/>
                        </TabPanel>
                        <TabPanel value="2">
                            <NotesTable noteData={notes}/>
                        </TabPanel>
                        <TabPanel value="3">
                            <WeightsTable weightData={weights}/>
                        </TabPanel>
                    </TabContext>
                </section>
            </div>
        </>

    )
}

export default ReptileDetails;