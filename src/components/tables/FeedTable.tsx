import React, {useEffect, useState} from "react";
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
import Feeding from "../../data/Feeding";
import TablePagination from '@mui/material/TablePagination';
import {initialValuesFeeding} from "../../helper/Constants";
import AddFeedingModal from "../modals/AddFeedingModal";
import {notifyFailure, notifySuccess} from "../../helper/Toasts";
import "../reptile/reptileInformation.css"
import {MdDelete} from "react-icons/md";
import {FiPlus} from "react-icons/fi";
const FeedTable = ({reptiles, setReptiles, index, startDate, setStartDate}: any) => {

    const [tableData, setTableData] = useState<Feeding[]>(reptiles[index].feedings);


    const [feedingValues, setFeedingValues] = useState(initialValuesFeeding);
    const [showAddFeedingModal, setShowAddFeedingModal] = useState(false);

    function addFeeding(){
        if (feedingValues.type === "" || feedingValues.weight === " ") { //TODO: wie validieren
            notifyFailure("Bitte alle Felder ausfüllen!")
            return;
        }
        let newFeeding = new Feeding();
        newFeeding.setFeeding(feedingValues.weight, feedingValues.type, startDate.toLocaleDateString());
        const newReptiles = [...reptiles];
        newReptiles[index].feedings.push(newFeeding);
        setReptiles(newReptiles);

        handleDataChange(newReptiles[index].feedings)

        setFeedingValues(initialValuesFeeding)
        setStartDate(new Date());
        notifySuccess("Die Fütterung wurde gespeichert.");
        toggleAddFeedingModal();
    }

    function deleteFeeding(id: string) {
        const newReptile = [...reptiles];
        let indexFood: number = 0;
        for (let i = 0; i < newReptile[index].feedings.length; i++) {
            if (id === newReptile[index].feedings[i].id) {
                indexFood = i;
            }
        }
        newReptile[index].feedings.splice(indexFood, 1);
        setReptiles(newReptile);
        handleDataChange(newReptile[index].feedings);
    }



    function handleDataChange(newTableData: Feeding[]) {
        const newReptiles = [...newTableData];
        setTableData(newReptiles);
    }

    function handleInputChangeFeeding(e: any): void {
        const {name, value} = e.target;
        setFeedingValues({
            ...feedingValues,
            [name]: value,
        });
    }

    function toggleAddFeedingModal(): void {
        setShowAddFeedingModal(!showAddFeedingModal);
    }


    /***
     * TODO: Tabellenshit
     */

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [page, setPage] = useState(0);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => {
        setPage(newPage);
    };


    return (
        <div>
            <AddFeedingModal
                toggleAddFeedingModal={toggleAddFeedingModal}
                showAddFeedingModal={showAddFeedingModal}
                values={feedingValues}
                handleInputChange={handleInputChangeFeeding}
                submit={addFeeding}
                startDate={startDate}
                setStartDate={setStartDate}
            />
            {/*<Fab className={"tableAddButton"}  size={"small"} onClick={toggleAddFeedingModal}><FiPlus size={"25px"}/></Fab>*/}

            <Button className={"tableAddButton"} variant={"contained"} onClick={toggleAddFeedingModal}>Fütterung hinzufügen</Button>
            <TableContainer component={Paper}>
                {/*<Button variant={"contained"}>Hinzufügen</Button>*/}
                <Table size="medium">
                    <TableHead style={{background:"grey"}}>
                        <TableRow>
                            <TableCell> Datum </TableCell>
                            <TableCell>Futter</TableCell>
                            <TableCell>Gewicht</TableCell>
                            <TableCell>Entfernen</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : tableData
                        ).map((item: Feeding) => (
                            <TableRow
                                key={item.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                {/*<TableCell component="th">{item.id}</TableCell>*/}
                                <TableCell component="th">{item.date}</TableCell>
                                <TableCell component="th">{item.food} </TableCell>
                                <TableCell component="th">{item.weight}g</TableCell>
                                <TableCell component="th"><Button onClick={e => {
                                    deleteFeeding(item.id)
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

export default FeedTable
