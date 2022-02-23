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
import NoteClass from "../../data/NoteClass";

const NotesTable = ({noteData}: any) => {

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [page, setPage] = React.useState(0);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - noteData.length) : 0;

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
                            ? noteData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : noteData
                    ).map((item: NoteClass) => (
                        <TableRow
                            key={item.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            {/*<TableCell component="th">{item.id}</TableCell>*/}
                            <TableCell component="th">{item.date}</TableCell>
                            <TableCell component="th">{item.note} g</TableCell>
                            <TableCell component="th"><Button> test</Button></TableCell>
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
                            count={noteData.length}
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

export default NotesTable
