import React, {useState} from "react";
import BreederCard from "../components/breeder/BreederCard";
import {Breeder} from "../data/Breeder";
import {Button, TextField} from "@mui/material";
import {initialValuesBreeder} from "../helper/Constants";
import AddBreederModal from "../components/modals/AddBreederModal";

const BreederOverview = ({breeders, setBreeders}: any) => {

    /**
     * bredder array kopieren und mit splice das erste element löscghen wegen unbekannt und dann das mappen
     *
     *
     * züchter suchen nach nachname
     */

    const[copyBreeders, setCopyBreeders] = useState<Breeder[]>(breeders);


    const [breederValues, setBreederValues] = useState(initialValuesBreeder);
    const [addBreederModal, setAddBreederModal] = useState(false);



    function handleInputChangeBreeder(e: any): void {
        const {name, value} = e.target;
        setBreederValues({
            ...breederValues,
            [name]: value,
        });
    }

    function toggleAddBreederModal(): void {
        setAddBreederModal(!addBreederModal);
    }

    return (
        <div>

            <AddBreederModal
                breederValues = {breederValues}
                setBreederValues ={setBreederValues}
                handleInputChangeBreeder = {handleInputChangeBreeder}
                toggleAddBreederModal = {toggleAddBreederModal}
            />
            <div>
                <Button>Test</Button>
                <TextField> </TextField>
            </div>

            {copyBreeders.slice(1).map((item: any, index: number) => {
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
                    />
                )
            })}
        </div>
    )
}


export default BreederOverview