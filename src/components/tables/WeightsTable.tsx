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
import AddWeightModal from "../modals/AddWeightModal";
import {notifyFailure, notifySuccess} from "../../helper/Toasts";
import {MdDelete} from "react-icons/md";

const WeightsTable = ({reptiles, setReptiles, index, startDate, setStartDate}: any) => {

    const [tableData, setTableData] = useState<Weight[]>(()=>{
        return [...reptiles[index].weights].reverse();
    });
    const [showAddWeightModal, setShowAddWeightModal] = useState(false);
    const [inputWeight, setInputWeight] = useState("");


    function addWeight() {
        if (isNaN(parseInt(inputWeight))) { //TODO: wie validieren
            notifyFailure("Bitte alle Felder und im richtigen Format ausfüllen!")
            return;
        }
        const newReptiles = [...reptiles];
        let newWeight = new Weight();
        newWeight.setWeight(inputWeight, startDate.toLocaleDateString());
        newReptiles[index].weights.push(newWeight);
        setReptiles(newReptiles);
        setInputWeight("");
        setStartDate(new Date());

        handleDataChange(newReptiles[index].weights)

        notifySuccess("Die Notiz wurde gespeichert.");
        toggleAddWeightModal();
    }


    function deleteWeight(id: string) {
        const newReptile = [...reptiles];
        let indexNote: number = 0;
        for (let i = 0; i < newReptile[index].weights.length; i++) {
            if (id === newReptile[index].weights[i].id) {
                indexNote = i;
            }
        }
        newReptile[index].weights.splice(indexNote, 1);
        setReptiles(newReptile);
        handleDataChange(newReptile[index].weights);
    }

    function handleDataChange(newTableData: Weight[]) {
        const newReptiles = [...newTableData].reverse();
        setTableData(newReptiles);
    }

    function handleInputChangeWeight(event: any) {
        setInputWeight(event.target.value)
    }

    function toggleAddWeightModal(): void {
        setShowAddWeightModal(!showAddWeightModal);
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
            <AddWeightModal
                toggleAddWeightModal={toggleAddWeightModal}
                showAddWeightModal={showAddWeightModal}
                startDate={startDate}
                setStartDate={setStartDate}
                inputWeight={inputWeight}
                changeWeight={handleInputChangeWeight}
                submit={addWeight}
            />

            <Button className={"tableAddButton"} variant={"contained"} onClick={toggleAddWeightModal}>Gewicht hinzufügen</Button>

            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead style={{background:"grey"}}>
                        <TableRow>
                            <TableCell>Datum</TableCell>
                            <TableCell>Gewicht</TableCell>
                            <TableCell>Entfernen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : tableData
                        ).map((item: Weight) => (
                            <TableRow
                                key={item.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                {/*<TableCell component="th">{item.id}</TableCell>*/}
                                <TableCell component="th">{item.date}</TableCell>
                                <TableCell component="th">{item.weight} g</TableCell>
                                <TableCell component="th"><Button onClick={() => {
                                    deleteWeight(item.id)
                                }}><MdDelete size={"25px"} style={{color: "#c54a4a"}}/></Button></TableCell>
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
