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
import WeightClass from "../../data/WeightClass";
import AddWeightModal from "../modals/AddWeightModal";
import {notifyFailure, notifySuccess} from "../../helper/Toasts";

const WeightsTable = ({reptiles, setReptiles, index, startDate, setStartDate}: any) => {

    const [tableData, setTableData] = useState<WeightClass[]>(reptiles[index].weights);
    const [weightModal, setWeightModal] = useState(false);
    const [inputWeight, setInputWeight] = useState("");


    function addWeight() {
        if (inputWeight === "") { //TODO: wie validieren
            notifyFailure("Bitte alle Felder ausfüllen."); //TODO eigenes
            return;
        }
        const newReptiles = [...reptiles];
        let newWeight = new WeightClass();
        newWeight.setWeight(inputWeight, startDate.toLocaleDateString());
        newReptiles[index].weights.push(newWeight);
        setReptiles(newReptiles);
        setInputWeight("");
        setStartDate(new Date());

        handleDataChange(newReptiles[index].weights)

        notifySuccess("Die Notiz wurde gespeichert.");
        toggleWeightModal();
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

    function handleDataChange(newTableData: WeightClass[]) {
        const newReptiles = [...newTableData];
        setTableData(newReptiles);
    }

    function handleInputChangeWeight(event: any) {
        setInputWeight(event.target.value)
    }

    function toggleWeightModal(): void {
        setWeightModal(!weightModal);
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
                toggleShow={toggleWeightModal}
                basicModal={weightModal}
                startDate={startDate}
                setStartDate={setStartDate}
                inputWeight={inputWeight}
                changeWeight={handleInputChangeWeight}
                submit={addWeight}
            />

            <Button variant={"contained"} onClick={toggleWeightModal}>Hinzufügen</Button>

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
                                ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : tableData
                        ).map((item: WeightClass) => (
                            <TableRow
                                key={item.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                {/*<TableCell component="th">{item.id}</TableCell>*/}
                                <TableCell component="th">{item.date}</TableCell>
                                <TableCell component="th">{item.weight} g</TableCell>
                                <TableCell component="th"><Button onClick={() => {
                                    deleteWeight(item.id)
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

export default WeightsTable
