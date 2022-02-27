import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Tab} from "@mui/material";
import FeedTable from "../components/tables/FeedTable";
import ReptileInformation from "../components/reptile/ReptileInformation";
import "./reptileDetails.css"
import {TabContext, TabList, TabPanel} from "@mui/lab";
import NotesTable from "../components/tables/NotesTable";
import WeightsTable from "../components/tables/WeightsTable";


const ReptileDetails = ({
                            reptiles,
                            editReptile,
                            deleteReptile,
                            breeders,
                            saveFeeding,
                            deleteFeeding,
                            saveWeight,
                            deleteWeight,
                            saveNote,
                            deleteNote,
                        }: any) => {

    let {id} = useParams();

    let index: number = 0;

    for (let i = 0; i < reptiles.length; i++) {
        if (reptiles[i].id === id) {
            index = i;
        }
    }

    const [value, setValue] = useState("1");
    const [startDate, setStartDate] = useState(new Date());

    const history = useNavigate();

    function removeReptile(): void {
        deleteReptile(index);
        history("/reptilienUebersicht");
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <div className={"reptileDetails"}>
                <section className={"reptile-details-section1"}>
                    <ReptileInformation
                        reptile={reptiles[index]} deleteReptile={removeReptile} editReptile={editReptile}
                        breeders={breeders}
                    />
                </section>
                <section className="reptile-details-section2">
                    <TabContext value={value}>
                        <TabList variant={"fullWidth"} onChange={handleTabChange} aria-label="lab API tabs example">
                            <Tab className={"tab"}
                                 label={<span style={{color: 'white'}}>Fütterungen</span>}
                                 value="1"/>
                            <Tab label={<span style={{color: 'white'}}>Notizen</span>}
                                 value="2"/>
                            <Tab label={<span style={{color: 'white'}}>Gewichtsmessungen</span>}
                                 value="3"/>
                        </TabList>
                        <TabPanel value="1">
                            <FeedTable reptiles={reptiles}  saveFeeding={saveFeeding} deleteFeeding={deleteFeeding}
                                       index={index} startDate={startDate} setStartDate={setStartDate}/>
                        </TabPanel>
                        <TabPanel value="2">
                            <NotesTable reptiles={reptiles} saveNote={saveNote} index={index} deleteNote={deleteNote}
                                        startDate={startDate} setStartDate={setStartDate}/>
                        </TabPanel>
                        <TabPanel value="3">
                            <WeightsTable reptiles={reptiles}  saveWeight={saveWeight} deleteWeight={deleteWeight}
                                          index={index} startDate={startDate} setStartDate={setStartDate}/>
                        </TabPanel>
                    </TabContext>
                </section>
            </div>
        </>
    )
}

export default ReptileDetails;