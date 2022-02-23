import React from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow
} from "@mui/material";
import FeedingClass from "../../data/FeedingClass";
import TablePagination from '@mui/material/TablePagination';

const FeedTable = ({feedData,deleteFeeding, index, reptile, setReptile}: any) => {

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // function deleteFeeding2(id : string){
    //     const newReptile = reptile;
    //     let index : number = 0;
    //     for(let i = 0 ; i < newReptile.feedings.length; i++){
    //         if(id === newReptile.feedings[i].id){
    //             index = i;
    //         }
    //     }
    //     newReptile.feedings.splice(index,1);
    //     setReptile(newReptile);
    // }

    const [page, setPage] = React.useState(0);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - feedData.length) : 0;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => {
        setPage(newPage);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 400}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell> Dessert (100g serving)</TableCell>
                        <TableCell>Calories</TableCell>
                        <TableCell>Fat&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? feedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : feedData
                    ).map((item: FeedingClass) => (
                        <TableRow
                            key={item.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            {/*<TableCell component="th">{item.id}</TableCell>*/}
                            <TableCell component="th">{item.date}</TableCell>
                            <TableCell component="th">{item.weight} g</TableCell>
                            <TableCell component="th">{item.feeding} g</TableCell>

                            <TableCell component="th"><Button onClick={e =>{deleteFeeding(item.id)}}> test</Button></TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{height: 53 * emptyRows}}>
                            <TableCell colSpan={6}/>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                            count={feedData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            labelRowsPerPage={"Zeilen pro Seite"}
                            SelectProps={{native: false}}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default FeedTable
