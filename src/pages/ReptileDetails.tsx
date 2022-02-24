import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Tab} from "@mui/material";
import FeedTable from "../components/tables/FeedTable";
import ReptileInformation from "../components/reptile/ReptileInformation";
import "./reptileDetails.css"
import {TabContext, TabList, TabPanel} from "@mui/lab";
import NotesTable from "../components/tables/NotesTable";
import WeightsTable from "../components/tables/WeightsTable";

/**
 *
 * TODO: Wie Ivonne Löschen und hinzufügen auf dem Tab
 */
const ReptileDetails = ({reptiles, setReptiles}: any) => {

    const history = useNavigate();


    let {id} = useParams();

    let index: number = 0;

    for(let i = 0; i< reptiles.length; i++){
        if(reptiles[i].id === id){
            index = i;
        }
    }


    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const [startDate, setStartDate] = useState(new Date());


    function deleteReptile(): void {
        const newTodos = [...reptiles];
        newTodos.splice(index, 1);
        setReptiles(newTodos);
        history("/reptilienUebersicht");
    }


    return (
        <>
            <div className={"reptileDetails"}>

                <section className={"section1"}>

                    <ReptileInformation
                        reptile={reptiles[index]} deleteReptile = {deleteReptile}
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
                            <FeedTable reptiles={reptiles} setReptiles = {setReptiles} index={index} startDate = {startDate} setStartDate={setStartDate}/>
                        </TabPanel>
                        <TabPanel value="2">
                            <NotesTable reptiles={reptiles} setReptiles = {setReptiles} index={index} startDate = {startDate} setStartDate={setStartDate}/>
                        </TabPanel>
                        <TabPanel value="3">
                            <WeightsTable reptiles={reptiles} setReptiles = {setReptiles} index={index} startDate = {startDate} setStartDate={setStartDate}/>
                        </TabPanel>
                    </TabContext>
                </section>
            </div>
        </>

    )
}

export default ReptileDetails;