import React, {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import FeedingClass from "../data/FeedingClass";


const ReptileDetails = ({reptiles, setReptiles}: any) => {


    let {id} = useParams();


    let apfel: number = 0;



    if (typeof id === "string") {
        apfel = parseInt(id);
    }
    const[feeding, setFeeding] = useState<FeedingClass[]>(reptiles[apfel]._feedings);



    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell> ID </TableCell>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {feeding.map((item: FeedingClass) => (
                        <TableRow
                            key={item.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" >{item.id}</TableCell>
                            <TableCell align="right">{item.date}</TableCell>
                            <TableCell align="right">{item.weight} g</TableCell>
                            <TableCell align="right">{item.feeding}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ReptileDetails;