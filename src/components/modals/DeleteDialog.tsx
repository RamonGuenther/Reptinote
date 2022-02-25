import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./deleteDialog.css";

export default function DeleteDialog({open, toggleDeleteDialog, action, name}: any) {


    return (
        <div>
            <Dialog

                open={open}
                onClose={toggleDeleteDialog}
            >
                <DialogTitle className={"delete-dialog"}>
                    {"Das Reptil \"" + name + "\" wirklich löschen?"}
                </DialogTitle>
                <DialogContent className={"delete-dialog"}>
                        <h4 className={"delete-dialog"}>Die Daten können danach nicht mehr wiederhergestellt werden.</h4>
                </DialogContent>
                <DialogActions className={"delete-dialog"}>
                    <Button className="delete-dialog-buttons" onClick={toggleDeleteDialog}>Abbrechen</Button>
                    <Button className="delete-dialog-buttons" onClick={() =>{action(); toggleDeleteDialog()}} autoFocus>
                        Einverstanden
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}