import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import FeedingClass from "../../data/FeedingClass";

const FoodGrid = ({feeding}: any) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell> Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {feeding.map((item: FeedingClass) => (
                        <TableRow
                            key={item.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            {/*<TableCell component="th">{item.id}</TableCell>*/}
                            <TableCell component="th">{item.date}</TableCell>
                            <TableCell align="right">{item.weight} g</TableCell>
                            <TableCell align="right">{item.feeding}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default FoodGrid
