import React, {useEffect, useState} from "react";
import BreederCard from "../components/breeder/BreederCard";
import {Breeder} from "../data/Breeder";
import {Button, TextField} from "@mui/material";
import {initialValuesBreeder, initialValuesReptile} from "../helper/Constants";
import AddBreederModal from "../components/modals/AddBreederModal";
import EditBreederModal from "../components/modals/EditBreederModal";
import DeleteDialog from "../components/modals/DeleteDialog";

/**
 * TODO: ZÜCHTER AUSLAGERN in APP also SAVE Edit und Delete
 *
 * @param breeders
 * @param setBreeders
 * @constructor
 */
const BreederOverview = ({breeders, setBreeders}: any) => {
    const [showAddBreederModal, setShowAddBreederModal] = useState(false);
    const [showEditBreederModal, setShowEditBreederModal] = useState(false);
    const [breederValues, setBreederValues] = useState(initialValuesBreeder);


    const [copyBreeder, setCopyBreeder] = useState<Breeder[]>(() => {
        return [...breeders].slice(1);
    });

    const [breederId, setBreederId] = useState("");

//TODO eigentlich schmutz aber egal
    function findBreederId(): number {
        let index = 0;
        for (let i = 0; i < breeders.length; i++) {
            if (breederId === breeders[i].id) {
                index = i;
            }
        }
        console.log("TEST " + breederId + " : " + index);
        return index;
    }


    function handleInputChangeBreeder(e: any): void {
        const {name, value} = e.target;
        setBreederValues({
            ...breederValues,
            [name]: value,
        });
    }

    function toggleAddBreederModal(): void {
        setShowAddBreederModal(!showAddBreederModal);
    }

    function toggleEditBreederModal(): void {
        setShowEditBreederModal(!showEditBreederModal);
    }


    function addBreeder() {
        let newBreeder = new Breeder();

        newBreeder.setBreeder(
            breederValues.companyName,
            breederValues.firstName,
            breederValues.lastName,
            breederValues.street,
            breederValues.postal,
            breederValues.place,
            breederValues.country,
            breederValues.email,
            breederValues.phone
        );

        if (showAddBreederModal) {
            const newBreeders = [...breeders, newBreeder];
            setBreeders(newBreeders);
            setBreederValues(initialValuesBreeder)
            toggleAddBreederModal();
        }
        if (showEditBreederModal) {
            const newReptiles = [...breeders];
            newReptiles[findBreederId()] = newBreeder;
            setBreeders(newReptiles);
            toggleEditBreederModal();
            setBreederValues(initialValuesBreeder);
        }


    }

    function deleteBreeder() {
        const newBreeders = [...breeders];
        newBreeders.splice(findBreederId(), 1);
        setBreeders(newBreeders);
        console.log("delete")
    }

    function initializeEdit() {
        if (breeders.length === 0) {
            return;
        }

        let index = findBreederId();
        let companyName = breeders[index].companyName;
        let firstName = breeders[index].firstName;
        let lastName = breeders[index].lastName;
        let street = breeders[index].street;
        let postal = breeders[index].postal;
        let place = breeders[index].place;
        let country = breeders[index].country;
        let email = breeders[index].email;
        let phone = breeders[index].phone;

        setBreederValues({
            companyName: companyName,
            firstName: firstName,
            lastName: lastName,
            street: street,
            postal: postal,
            place: place,
            country: country,
            email: email,
            phone: phone
        });
    }

    const toggleDeleteDialog = () => {
        setShowDeleteDialog(!showDeleteDialog);
    };

    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);


    useEffect(() => {
        initializeEdit();
    }, [showEditBreederModal])


    useEffect(() => {
        setCopyBreeder([...breeders].slice(1))
    }, [breeders])

    const [searchValue, setSearchValue] = useState<string>("")


    return (
        <div>

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
                submit={addBreeder}
            />


            <div>
                <Button variant="outlined" onClick={toggleAddBreederModal}>Züchter hinzufügen</Button>

                <Button>Test</Button>
                <TextField
                    variant={"outlined"}
                    sx={{input: {color: 'white'}}}
                    type={"text"}
                    value={searchValue}
                    label={"Reptil suchen"}
                    onChange={(e: any) => setSearchValue(e.target.value)}
                />
            </div>

            {copyBreeder.filter((breeder: { lastName: string; }) => breeder.lastName.match(new RegExp(searchValue, "i"))).map((item: any, index: number) => {
                return (
                    <BreederCard
                        key={index}
                        id={item.id}
                        companyName={item.companyName}
                        firstName={item.firstName}
                        lastName={item.lastName}
                        street={item.street}
                        postal={item.postal}
                        place={item.place}
                        country={item.country}
                        email={item.email}
                        phone={item.phone}
                        index={index}
                        deleteBreeder={deleteBreeder}
                        toggleEditBreederModal={toggleEditBreederModal}
                        toggleDeleteDialog={toggleDeleteDialog}
                        showDeleteDialog={showDeleteDialog}
                        setBreederId={setBreederId}
                    />
                )
            })}
        </div>
    )
}


export default BreederOverview