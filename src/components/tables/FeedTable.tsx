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
import Feeding from "../../data/Feeding";
import TablePagination from '@mui/material/TablePagination';
import {initialValuesFeeding} from "../../helper/Constants";
import AddFeedingModal from "../modals/reptile/AddFeedingModal";
import {notifyFailure, notifySuccess} from "../../helper/Toasts";
import "../../style/reptileInformation.css"
import {MdDelete} from "react-icons/md";
const FeedTable = ({reptiles, saveFeeding, deleteFeeding, index, startDate, setStartDate}: any) => {

    const [tableData, setTableData] = useState<Feeding[]>(()=>{
        return [...reptiles[index].feedings].reverse();
    });


    const [feedingValues, setFeedingValues] = useState(initialValuesFeeding);
    const [showAddFeedingModal, setShowAddFeedingModal] = useState(false);

    function addFeeding(){
        if (feedingValues.type === "" || isNaN(parseInt(feedingValues.weight))){ //TODO: wie validieren
            notifyFailure("Bitte alle Felder und im richtigen Format ausfüllen!")
            return;
        }
        let newFeeding = new Feeding();
        newFeeding.setFeeding(feedingValues.weight, feedingValues.type, startDate.toLocaleDateString());
        saveFeeding(newFeeding, index);
        handleDataChange([...reptiles[index].feedings])
        setFeedingValues(initialValuesFeeding)
        setStartDate(new Date());
        notifySuccess("Die Fütterung wurde gespeichert.");
        toggleAddFeedingModal();
    }

    function removeFeeding(id: string) {
        let indexFood: number = 0;
        for (let i = 0; i < reptiles[index].feedings.length; i++) {
            if (id === reptiles[index].feedings[i].id) {
                indexFood = i;
            }
        }
        deleteFeeding(index,indexFood);
        handleDataChange([...reptiles[index].feedings]);
    }



    function handleDataChange(newTableData: Feeding[]) {
        const newReptiles = [...newTableData].reverse();
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


    /*---------------------------------------------------------------------------------------------------
                                         Alles für die Tabelle an sich
    -----------------------------------------------------------------------------------------------------*/

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [page, setPage] = useState(0);

    //Um einen Layout-Sprung zu vermeiden beim Wechseln auf eine Seite die nicht voll gefüllt ist
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
            <Button className={"tableAddButton"} variant={"contained"} onClick={toggleAddFeedingModal}>Fütterung hinzufügen</Button>
            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead style={{background:"grey"}}>
                        <TableRow>
                            <TableCell> Datum </TableCell>
                            <TableCell>Futter</TableCell>
                            <TableCell>Gewicht</TableCell>
                            <TableCell>Entfernen</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody style={{background:"#a6a1a1"}}>
                        {(rowsPerPage > 0
                                ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : tableData
                        ).map((item: Feeding) => (
                            <TableRow
                                key={item.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th">{item.date}</TableCell>
                                <TableCell component="th">{item.food} </TableCell>
                                <TableCell component="th">{item.weight}g</TableCell>
                                <TableCell component="th"><Button onClick={e => {
                                    removeFeeding(item.id)
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

export default FeedTable
