import React, {useState} from "react";
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
import TablePagination from '@mui/material/TablePagination';
import NoteClass from "../../data/NoteClass";
import {notifyFailure, notifySuccess} from "../../helper/Toasts";
import AddNoteModal from "../modals/AddNoteModal";

const NotesTable = ({reptiles, setReptiles, index, startDate, setStartDate}: any) => {

    const [tableData, setTableData] = useState<NoteClass[]>(reptiles[index].notes);
    const [noteModal, setNoteModal] = useState(false);
    const [inputNote, setInputNote] = useState("");


    function addNote() {
        if (inputNote === "") { //TODO: wie validieren
            notifyFailure("Bitte alle Felder ausfüllen."); //TODO eigenes
            return;
        }
        const newReptiles = [...reptiles];
        let newNote = new NoteClass();
        newNote.setNote(inputNote, startDate.toLocaleDateString());
        newReptiles[index].notes.push(newNote);
        setReptiles(newReptiles);
        setInputNote("");
        setStartDate(new Date());

        handleDataChange(newReptiles[index].notes)

        notifySuccess("Die Notiz wurde gespeichert.");
        toggleNoteModal();
    }

    function deleteNote(id: string) {
        const newReptile = [...reptiles];
        let indexNote: number = 0;
        for (let i = 0; i < newReptile[index].notes.length; i++) {
            if (id === newReptile[index].notes[i].id) {
                indexNote = i;
            }
        }
        newReptile[index].notes.splice(indexNote, 1);
        setReptiles(newReptile);
        handleDataChange(newReptile[index].notes);
    }

    function handleDataChange(newTableData: NoteClass[]) {
        const newReptiles = [...newTableData];
        setTableData(newReptiles);
    }

    function handleInputChangeNote(event: any) {
        setInputNote(event.target.value)
    }


    function toggleNoteModal(): void {
        setNoteModal(!noteModal);
    }


    /**
     * TODO: TABELLENSHIT
     */

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [page, setPage] = React.useState(0);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => {
        setPage(newPage);
    };

    return (
        <div>

            <AddNoteModal
                toggleShow={toggleNoteModal}
                setBasicModal={setNoteModal}
                basicModal={noteModal}
                startDate={startDate}
                setStartDate={setStartDate}
                inputNote={inputNote}
                changeNote={handleInputChangeNote}
                submit={addNote}
            />

            <Button variant={"contained"} onClick={toggleNoteModal}>Hinzufügen</Button>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 400}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell> Dessert (100g serving)</TableCell>
                            <TableCell>Calories</TableCell>
                            <TableCell>Fat (g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : tableData
                        ).map((item: NoteClass) => (
                            <TableRow
                                key={item.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th">{item.date}</TableCell>
                                <TableCell component="th">{item.note} g</TableCell>
                                <TableCell component="th"><Button onClick={() => {
                                    deleteNote(item.id)
                                }}> test</Button></TableCell>
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
                                count={tableData.length}
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
        </div>
    )
}

export default NotesTable
