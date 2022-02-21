import React, {useState} from "react";
import {useParams} from "react-router-dom";
import FeedingClass from "../data/FeedingClass";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import FoodGrid from "../components/tables/FoodGrid";


const ReptileDetails = ({reptiles, setReptiles}: any) => {

    let {id}  = useParams();
    let index: number = 0;

    if (typeof id === "string") {
        index = parseInt(id);
    }

    const [feeding, setFeeding] = useState<FeedingClass[]>(reptiles[index]._feedings);

    return (
        <FoodGrid feeding = {feeding}/>
    )
}

export default ReptileDetails;