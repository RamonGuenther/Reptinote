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
import AddNoteModal from "../modals/reptile/AddNoteModal";
import {MdDelete} from "react-icons/md";

const NotesTable = ({reptiles, saveNote, deleteNote, index, startDate, setStartDate}: any) => {

    const [tableData, setTableData] = useState<Note[]>(() => {
        return [...reptiles[index].notes].reverse(); //Damit der aktuellste Wert auch als erstes angezeigt wird
    });

    const [showAddNoteModal, setShowAddNoteModal] = useState(false);
    const [inputNote, setInputNote] = useState("");


    function addNote() {
        if (inputNote === "") {
            notifyFailure("Bitte alle Felder ausfüllen.");
            return;
        }
        let newNote = new Note();
        newNote.setNote(inputNote, startDate.toLocaleDateString());

        saveNote(newNote, index);
        setInputNote("");
        setStartDate(new Date());

        handleDataChange([...reptiles[index].notes])

        notifySuccess("Die Notiz wurde gespeichert.");
        toggleAddNoteModal();
    }

    function removeNote(id: string) {
        let indexNote: number = 0;
        for (let i = 0; i < reptiles[index].notes.length; i++) {
            if (id === reptiles[index].notes[i].id) {
                indexNote = i;
            }
        }
        deleteNote(index, indexNote);
        handleDataChange([...reptiles[index].notes]);
    }

    function handleDataChange(newTableData: Note[]) {
        const newReptiles = [...newTableData].reverse(); //Damit der aktuellste Wert auch als erstes angezeigt wird
        setTableData(newReptiles);
    }

    function handleInputChangeNote(event: any) {
        setInputNote(event.target.value)
    }


    function toggleAddNoteModal(): void {
        setShowAddNoteModal(!showAddNoteModal);
    }


    /*---------------------------------------------------------------------------------------------------
                            Alle benötigten Dinge für die Funktionen der Tabelle
    -----------------------------------------------------------------------------------------------------*/

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void {
        setPage(newPage);
    }

    //Um einen Layout-Sprung zu vermeiden beim Wechseln auf eine Seite die nicht voll gefüllt ist
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;


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

            <Button className={"tableAddButton"} variant={"contained"} onClick={toggleAddNoteModal}>Notiz
                hinzufügen</Button>

            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead style={{background: "grey"}}>
                        <TableRow>
                            <TableCell>Datum</TableCell>
                            <TableCell>Notiz</TableCell>
                            <TableCell>Entfernen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{background: "#a6a1a1"}}>
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
                                    removeNote(item.id)
                                }}><MdDelete size={"25px"} style={{color: "#c54a4a"}}/></Button></TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter style={{background: "#a6a1a1"}}>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10]}
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
