import {Reptile} from "../data/Reptile";
import Feeding from "../data/Feeding";
import Weight from "../data/Weight";
import Note from "../data/Note";
import {breedersExample, feedingExample, noteExample, reptilesExample, weightExample} from "./Constants";
import {Breeder} from "../data/Breeder";
import {makeStyles} from "@material-ui/styles";


export function createExampleReptile(): Reptile[] {
    let reptileList: Reptile[] = [];
    let feedings: Feeding[] = [];
    let weights: Weight[] = [];
    let notes: Note[] = [];

    for (let i = 0; i < reptilesExample.length; i++) {
        let newReptile = new Reptile();
        feedings = [];
        weights = [];
        notes = [];

        for (let j = 0; j < feedingExample.length; j++) {
            let newFeeding = new Feeding();
            newFeeding.setFeeding(feedingExample[j].weight, feedingExample[j].food, feedingExample[j].date)
            feedings.push(newFeeding);
        }

        for (let k = 0; k < weightExample.length; k++) {
            let newWeight = new Weight();
            newWeight.setWeight(weightExample[k].weight, weightExample[k].date)
            weights.push(newWeight);
        }

        for (let l = 0; l < noteExample.length; l++) {
            let newNote = new Note();
            newNote.setNote(noteExample[l].note, noteExample[l].date)
            notes.push(newNote);
        }

        newReptile.loadReptile(
            reptilesExample[i].name,
            reptilesExample[i].geburtsdatum,
            reptilesExample[i].art,
            reptilesExample[i].morph,
            reptilesExample[i].geschlecht,
            reptilesExample[i].ordnung,
            reptilesExample[i].image,
            feedings,
            notes,
            weights
        );

        reptileList.push(newReptile);
    }

    return reptileList;
}

export function createExampleBreeders() : Breeder[]{
    let breederList: Breeder[] = [];

    for (let i = 0; i < breedersExample.length; i++) {
        let newBreeder = new Breeder();
        newBreeder.setBreeder(
            breedersExample[i].companyName,
            breedersExample[i].firstName,
            breedersExample[i].lastName,
            breedersExample[i].street,
            breedersExample[i].postal,
            breedersExample[i].place,
            breedersExample[i].country,
            breedersExample[i].email,
            breedersExample[i].phone
        );

        breederList.push(newBreeder);
    }
    return breederList;
}


export const useStyles = makeStyles(theme => ({
    textField: {
        width: "300px"
    },
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: ` #0275d8  !important`
        }
    },
    cssFocused: { color: "white !important" },

    notchedOutline: {
        borderWidth: "1px",
        borderColor: " white  !important"
    }
}));
