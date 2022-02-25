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
import Note from "../../data/Note";
import {notifyFailure, notifySuccess} from "../../helper/Toasts";
import AddNoteModal from "../modals/AddNoteModal";
import {MdDelete} from "react-icons/md";

const NotesTable = ({reptiles, setReptiles, index, startDate, setStartDate}: any) => {

    const [tableData, setTableData] = useState<Note[]>(()=>{
       return [...reptiles[index].notes].reverse();
    });

    const [showAddNoteModal, setShowAddNoteModal] = useState(false);
    const [inputNote, setInputNote] = useState("");


    function addNote() {
        if (inputNote === "") { //TODO: wie validieren
            notifyFailure("Bitte alle Felder ausfüllen."); //TODO eigenes
            return;
        }
        const newReptiles = [...reptiles];
        let newNote = new Note();
        newNote.setNote(inputNote, startDate.toLocaleDateString());
        newReptiles[index].notes.push(newNote);
        setReptiles(newReptiles);
        setInputNote("");
        setStartDate(new Date());

        handleDataChange(newReptiles[index].notes)

        notifySuccess("Die Notiz wurde gespeichert.");
        toggleAddNoteModal();
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

    function handleDataChange(newTableData: Note[]) {
        const newReptiles = [...newTableData].reverse();
        setTableData(newReptiles);
    }

    function handleInputChangeNote(event: any) {
        setInputNote(event.target.value)
    }


    function toggleAddNoteModal(): void {
        setShowAddNoteModal(!showAddNoteModal);
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
                toggleAddNoteModal={toggleAddNoteModal}
                showAddNoteModal={showAddNoteModal}
                startDate={startDate}
                setStartDate={setStartDate}
                inputNote={inputNote}
                changeNote={handleInputChangeNote}
                submit={addNote}
            />

            <Button className={"tableAddButton"} variant={"contained"} onClick={toggleAddNoteModal}>Notiz hinzufügen</Button>

            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead style={{background:"grey"}}>
                        <TableRow>
                            <TableCell>Datum</TableCell>
                            <TableCell>Notiz</TableCell>
                            <TableCell>Entfernen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{background:"#a6a1a1"}}>
                        {(rowsPerPage > 0
                                ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : tableData
                        ).map((item: Note) => (
                            <TableRow
                                key={item.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th">{item.date}</TableCell>
                                <TableCell component="th">{item.note}</TableCell>
                                <TableCell component="th"><Button onClick={() => {
                                    deleteNote(item.id)
                                }}><MdDelete size={"25px"} style={{color: "#c54a4a"}}/></Button></TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter style={{background:"#a6a1a1"}}>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10 ]}
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
