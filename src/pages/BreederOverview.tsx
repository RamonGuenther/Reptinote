import React, {useEffect, useState} from "react";
import BreederCard from "../components/breeder/BreederCard";
import {Breeder} from "../data/Breeder";
import {Button, TextField} from "@mui/material";
import {initialValuesBreeder} from "../helper/Constants";
import AddBreederModal from "../components/modals/breeder/AddBreederModal";
import EditBreederModal from "../components/modals/breeder/EditBreederModal";
import DeleteDialog from "../components/modals/DeleteDialog";
import "../style/breederOverview.css"
import {useStyles} from "../helper/Functions";
import {notifyFailure, notifySuccess} from "../helper/Toasts";

const BreederOverview = ({breeders, saveBreeder, editBreeder, deleteBreeder}: any) => {
    /*---------------------------------------------------------------------------------------------------
                                                 States
    -----------------------------------------------------------------------------------------------------*/

    const [copyBreeder, setCopyBreeder] = useState<Breeder[]>(() => {
        return [...breeders].slice(1); //Um den unbekannten Breeder im ersten Feld nicht anzuzeigen
    });

    const [breederId, setBreederId] = useState("");

    const [breederValues, setBreederValues] = useState(initialValuesBreeder);

    const [showAddBreederModal, setShowAddBreederModal] = useState(false);
    const [showEditBreederModal, setShowEditBreederModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

    const [searchValue, setSearchValue] = useState<string>("")

    /*---------------------------------------------------------------------------------------------------
                                             Submit-Funktionen
    -----------------------------------------------------------------------------------------------------*/

    function addBreeder(): void {
        if (breederValues.firstName === "" || breederValues.lastName === "") {
            notifyFailure("Bitte alle Pflichtfelder ausfüllen!");
            return;
        }
        let newBreeder = new Breeder();
        setBreeder(newBreeder);
        saveBreeder(newBreeder);
        setBreederValues(initialValuesBreeder)
        notifySuccess("Der Züchter " + breederValues.firstName + " " + breederValues.lastName + " wurde gespeichert.");
        toggleAddBreederModal();
    }

    function updateBreeder() {
        if (breederValues.firstName === "" || breederValues.lastName === "") {
            notifyFailure("Bitte alle Pflichtfelder ausfüllen!");
            return;
        }
        let newBreeder = breeders[findBreederIndex()];
        setBreeder(newBreeder);
        editBreeder(newBreeder);
        notifySuccess("Die Änderungen des Züchters " + breederValues.firstName + " " + breederValues.lastName + " wurden gespeichert.");
        toggleEditBreederModal();
        setBreederValues(initialValuesBreeder);
    }


    function removeBreeder() {
        deleteBreeder(findBreederIndex());
    }


    function findBreederIndex(): number {
        let index = 0;
        for (let i = 0; i < breeders.length; i++) {
            if (breederId === breeders[i].id) {
                index = i;
            }
        }
        return index;
    }

    function setBreeder(newBreeder: Breeder): void {
        newBreeder.setBreeder(
            breederValues.companyName,
            breederValues.firstName,
            breederValues.lastName,
            breederValues.street,
            breederValues.postal,
            breederValues.place,
            breederValues.country,
            breederValues.mail,
            breederValues.phone
        );
    }

    /*---------------------------------------------------------------------------------------------------
                                         Input Change Handler
    -----------------------------------------------------------------------------------------------------*/


    function handleInputChangeBreeder(e: any): void {
        const {name, value} = e.target;
        setBreederValues({
            ...breederValues,
            [name]: value,
        });
    }


    /*---------------------------------------------------------------------------------------------------
                                         Toggle Modal Funktionen
    -----------------------------------------------------------------------------------------------------*/

    const toggleDeleteDialog = () => {
        setShowDeleteDialog(!showDeleteDialog);
    };

    function toggleAddBreederModal(): void {
        setBreederValues(initialValuesBreeder)
        setShowAddBreederModal(!showAddBreederModal);
    }

    function toggleEditBreederModal(): void {
        setShowEditBreederModal(!showEditBreederModal);
    }


    /*---------------------------------------------------------------------------------------------------
                                            Sonstiges
    -----------------------------------------------------------------------------------------------------*/


    function initializeEdit() {
        if (breeders.length === 0) {
            return;
        }

        let index = findBreederIndex();
        let companyName = breeders[index].companyName;
        let firstName = breeders[index].firstName;
        let lastName = breeders[index].lastName;
        let street = breeders[index].street;
        let postal = breeders[index].postal;
        let place = breeders[index].place;
        let country = breeders[index].country;
        let mail = breeders[index].mail;
        let phone = breeders[index].phone;

        setBreederValues({
            companyName: companyName,
            firstName: firstName,
            lastName: lastName,
            street: street,
            postal: postal,
            place: place,
            country: country,
            mail: mail,
            phone: phone,
        });
    }


    useEffect(() => {
        initializeEdit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showEditBreederModal])


    useEffect(() => {
        setCopyBreeder([...breeders].slice(1))  //Um den unbekannten Breeder im ersten Feld nicht anzuzeigen
    }, [breeders])


    const classes = useStyles();

    return (
        <div className={"breeder-overview-layout"}>

            <AddBreederModal
                showAddBreederModal={showAddBreederModal}
                toggleAddBreederModal={toggleAddBreederModal}
                handleInputChange={handleInputChangeBreeder}
                values={breederValues}
                submit={addBreeder}
            />

            <EditBreederModal
                showEditBreederModal={showEditBreederModal}
                toggleEditBreederModal={toggleEditBreederModal}
                handleInputChange={handleInputChangeBreeder}
                values={breederValues}
                submit={updateBreeder}
            />

            <DeleteDialog open={showDeleteDialog} toggleDeleteDialog={toggleDeleteDialog} action={removeBreeder}
                          name={"Züchter"}
            />


            <div className={"breeder-overview-button_textfield"}>
                <TextField
                    variant={"outlined"}
                    sx={{input: {color: 'white'}}}
                    type={"text"}
                    value={searchValue}
                    label={"Züchter suchen"}
                    onChange={(e: any) => setSearchValue(e.target.value)}
                    placeholder={"Nachname des Züchters..."}
                    className={classes.textField}
                    InputLabelProps={{
                        style: {color: '#ffffff'},
                    }}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />
                <Button id={"breeder-overview-button_add"} variant="contained" onClick={toggleAddBreederModal}>Züchter
                    hinzufügen</Button>
            </div>

            {copyBreeder.filter((breeder: { lastName: string; }) => breeder.lastName.match(new RegExp(searchValue, "i"))).map((item: any, index: number) => {
                return (
                    <BreederCard
                        key={index}
                        breeder={item}
                        toggleEditBreederModal={toggleEditBreederModal}
                        toggleDeleteDialog={toggleDeleteDialog}
                        setBreederId={setBreederId}
                    />
                )
            })}
        </div>
    )
}


export default BreederOverview