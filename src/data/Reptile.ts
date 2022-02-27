import {v4 as uuid} from 'uuid';
import Feeding from "./Feeding";
import Note from "./Note";
import Weight from "./Weight";
import {Breeder} from "./Breeder";

export class Reptile {

    private _id: string;
    private _name: string = "";
    private _birthday: string = "";
    private _type: string = "";
    private _morph: string = "";
    private _species: string = "";
    private _gender: string = "";
    private _feedings: Feeding[];
    private _notes: Note[];
    private _weights: Weight[];
    private _image: string = "";
    private _breeder: Breeder;

    constructor() {
        this._id = uuid();
        this._breeder = new Breeder();
        this._breeder.lastName = "Unbekannt"
        this._feedings = [];
        this._notes = [];
        this._weights = [];
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get birthday(): string {
        return this._birthday;
    }

    get type(): string {
        return this._type;
    }

    get morph(): string {
        return this._morph;
    }

    get species(): string {
        return this._species;
    }

    get gender(): string {
        return this._gender;
    }

    get feedings(): Feeding[] {
        return this._feedings;
    }

    get notes(): Note[] {
        return this._notes;
    }

    get weights(): Weight[] {
        return this._weights;
    }

    get image(): string {
        return this._image;
    }

    get breeder(): Breeder {
        return this._breeder;
    }

    set id(value: string) {
        this._id = value;
    }

    set name(value: string) {
        this._name = value;
    }

    set birthday(value: string) {
        this._birthday = value;
    }

    set type(value: string) {
        this._type = value;
    }

    set morph(value: string) {
        this._morph = value;
    }

    set species(value: string) {
        this._species = value;
    }

    set gender(value: string) {
        this._gender = value;
    }

    set feedings(value: Feeding[]) {
        this._feedings = value;
    }

    set notes(value: Note[]) {
        this._notes = value;
    }

    set weights(value: Weight[]) {
        this._weights = value;
    }

    set image(value: string) {
        this._image = value;
    }

    set breeder(value: Breeder) {
        this._breeder = value;
    }

    public setBreeder(breeder: Breeder): void {
        this._breeder = breeder;
    }

    public setReptile(name: string, birthday: string, type: string, morph: string,
                      gender: string, species: string, image: string): void {

        this._name = name;
        this._birthday = birthday;
        this._type = type;
        this._morph = morph;
        this._gender = gender;
        this._species = species;
        this._image = image;
    }


    public loadReptile(name: string, birthday: string, type: string, morph: string, gender: string, species: string,
                       image: string, feedings: Feeding[], notes: Note[], weights: Weight[]): void {

        this._name = name;
        this._birthday = birthday;
        this._type = type;
        this._morph = morph;
        this._gender = gender;
        this._species = species;
        this._feedings = feedings;
        this._notes = notes;
        this._weights = weights;
        this._image = image;
    }
}