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
import Weight from "../../data/Weight";
import AddWeightModal from "../modals/reptile/AddWeightModal";
import {notifyFailure, notifySuccess} from "../../helper/Toasts";
import {MdDelete} from "react-icons/md";

const WeightsTable = ({reptiles, saveWeight, deleteWeight, index, startDate, setStartDate}: any) => {

    const [tableData, setTableData] = useState<Weight[]>(() => {
        return [...reptiles[index].weights].reverse();
    });

    const [showAddWeightModal, setShowAddWeightModal] = useState(false);
    const [inputWeight, setInputWeight] = useState("");



    function addWeight(): void {
        if (isNaN(parseInt(inputWeight))) {
            notifyFailure("Bitte alle Felder und im richtigen Format ausfüllen!")
            return;
        }
        let newWeight = new Weight();
        newWeight.setWeight(inputWeight, startDate.toLocaleDateString());
        saveWeight(newWeight, index);
        setInputWeight("");
        setStartDate(new Date());
        handleDataChange([...reptiles[index].weights])
        notifySuccess("Die Notiz wurde gespeichert.");
        toggleAddWeightModal();
    }


    function removeWeight(id: string): void {
        let indexNote: number = 0;
        for (let i = 0; i < reptiles[index].weights.length; i++) {
            if (id === reptiles[index].weights[i].id) {
                indexNote = i;
            }
        }
        deleteWeight(index, indexNote);
        handleDataChange([...reptiles[index].weights]);
    }

    function handleDataChange(newTableData: Weight[]): void {
        const newReptiles = [...newTableData].reverse();
        setTableData(newReptiles);
    }

    function handleInputChangeWeight(event: any): void {
        setInputWeight(event.target.value)
    }


    function toggleAddWeightModal(): void {
        setShowAddWeightModal(!showAddWeightModal);
    }


    /*---------------------------------------------------------------------------------------------------
                                         Alles für die Tabelle an sich
    -----------------------------------------------------------------------------------------------------*/

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [page, setPage] = React.useState(0);
    //Um einen Layout-Sprung zu vermeiden beim Wechseln auf eine Seite die nicht voll gefüllt ist
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => {
        setPage(newPage);
    };

    return (
        <div>
            <AddWeightModal
                toggleAddWeightModal={toggleAddWeightModal}
                showAddWeightModal={showAddWeightModal}
                startDate={startDate}
                setStartDate={setStartDate}
                inputWeight={inputWeight}
                changeWeight={handleInputChangeWeight}
                submit={addWeight}
            />

            <Button className={"tableAddButton"} variant={"contained"} onClick={toggleAddWeightModal}>Gewicht
                hinzufügen</Button>

            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead style={{background: "grey"}}>
                        <TableRow>
                            <TableCell>Datum</TableCell>
                            <TableCell>Gewicht</TableCell>
                            <TableCell>Entfernen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{background: "#a6a1a1"}}>
                        {(rowsPerPage > 0
                                ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : tableData
                        ).map((item: Weight) => (
                            <TableRow
                                key={item.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th">{item.date}</TableCell>
                                <TableCell component="th">{item.weight} g</TableCell>
                                <TableCell component="th"><Button onClick={() => {
                                    removeWeight(item.id)
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

export default WeightsTable
