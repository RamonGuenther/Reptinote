import React, {useState} from "react";
import {useParams} from "react-router-dom";
import FeedingClass from "../data/FeedingClass";
import {Box, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import FoodGrid from "../components/tables/FoodGrid";
import {ReptileClass} from "../data/ReptileClass";
import ReptileInformation from "../components/reptile/ReptileInformation";
import "./reptileDetails.css"
import {TabContext, TabList, TabPanel} from "@mui/lab";


const ReptileDetails = ({reptiles, setReptiles}: any) => {

    let {id} = useParams();
    let index: number = 0;


    if (typeof id === "string") {
        index = parseInt(id);
    }

    const [feeding, setFeeding] = useState<FeedingClass[]>(reptiles[index]._feedings);

    const [reptile, setReptile] = useState<ReptileClass>(reptiles[index]);

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
                            <FoodGrid feeding={feeding}/>
                        </TabPanel>
                        <TabPanel value="2">
                            Item Two

                        </TabPanel>
                        <TabPanel value="3">
                            Item Three
                        </TabPanel>
                    </TabContext>
                </section>
            </div>
        </>

    )
}

export default ReptileDetails;