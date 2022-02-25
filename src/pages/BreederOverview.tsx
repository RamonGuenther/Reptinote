import React, {useEffect, useState} from "react";
import BreederCard from "../components/breeder/BreederCard";
import {Breeder} from "../data/Breeder";
import {Button, TextField} from "@mui/material";
import {initialValuesBreeder} from "../helper/Constants";
import AddBreederModal from "../components/modals/AddBreederModal";
import EditBreederModal from "../components/modals/EditBreederModal";

/**
 * TODO: ZÜCHTER AUSLAGERN in APP also SAVE Edit und Delete
 *
 * @param breeders
 * @param setBreeders
 * @constructor
 */
const BreederOverview = ({breeders, setBreeders}: any) => {

    /**
     * bredder array kopieren und mit splice das erste element löscghen wegen unbekannt und dann das mappen
     *
     *
     * züchter suchen nach nachname
     */


    const [breederValues, setBreederValues] = useState(initialValuesBreeder);
    const [showAddBreederModal, setShowAddBreederModal] = useState(false);
    const [showEditBreederModal, setShowEditBreederModal] = useState(false);

    const[breederId, setBreederId] = useState(0);

//TODO eigentlich schmutz aber egal
    function findBreederId(id: String) : number {

        let index = 0;
        for (let i = 0; i < breeders.length; i++) {
            if (id === breeders[i].id) {
                index = i;
                setBreederId(i);
                console.log(breederId);
            }
        }
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

        const newBreeders = [...breeders, newBreeder];

        setBreeders(newBreeders);

        setBreederValues(initialValuesBreeder)
        toggleAddBreederModal();
    }

    function deleteBreeder(id : string) {
        const newBreeders = [...breeders];
        newBreeders.splice(findBreederId(id), 1);
        setBreeders(newBreeders);
        console.log("delete")
    }

    function initializeEdit() {
        if (breeders.length === 0) {
            return;
        }

        let companyName
        let firstName
        let lastName
        let street
        let postal
        let place
        let country
        let email
        let phone

        // let tiles[reptileId].name;
        // let birthday = reptiles[reptileId].birthday;
        // let type = reptiles[reptileId].type;
        // let morph = reptiles[reptileId].morph;
        // let image = reptiles[reptileId].image;
        // setSelectedGenderOption(reptiles[reptileId].gender);
        // setSelectedSpeciesOption(reptiles[reptileId].species);
        // setReptileValues({name: name, birthday: birthday, type: type, morph: morph, image: image})
    }


    useEffect(() => {
        initializeEdit();
        console.log("breederId");
    }, [breederId])


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
                <TextField> </TextField>
            </div>

            {breeders.slice(1).map((item: any, index: number) => {
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
                        findBreederId={findBreederId}
                    />
                )
            })}
        </div>
    )
}


export default BreederOverview