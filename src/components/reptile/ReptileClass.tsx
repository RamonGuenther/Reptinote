import { v4 as uuidv4 } from 'uuid';
import FeedingClass from "../../data/FeedingClass";
import NoteClass from "../../data/NoteClass";
import WeightClass from "../../data/WeightClass";

export class ReptileClass {

    private _id: string;
    private _name: string ="";
    private _birthday: string ="";
    private _type : string =""; //ART ALSO HAKENNASEN
    private _morph: string ="";
    private _species: object ={}; //Spezies (Ordnung)
    private _gender: object = {};
    private _feedings : FeedingClass[];
    private _notes : NoteClass[];
    private _weights : WeightClass[];
    private _urlLink : string = "";
    //private feeding array list?: Ordnung
    //private note : Note; liste/Array
    // private breeder: Breeder;


    constructor() {
        this._id = uuidv4();
        this._feedings = [];
        this._notes = [];
        this._weights = [];

    }


    set id(value: string) {
        this._id = value;
    }

    get id(): string {
        return this._id;
    }

    set feedings(value: FeedingClass[]) {
        this._feedings = value;
    }

    get feedings(): FeedingClass[] {
        return this._feedings;
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


    get species(): object {
        return this._species;
    }

    get gender(): object {
        return this._gender;
    }


    set species(value: object) {
        this._species = value;
    }

    set gender(value: object) {
        this._gender = value;
    }


    set notes(value: NoteClass[]) {
        this._notes = value;
    }

    set weights(value: WeightClass[]) {
        this._weights = value;
    }

    get notes(): NoteClass[] {
        return this._notes;
    }

    get weights(): WeightClass[] {
        return this._weights;
    }


    set urlLink(value: string) {
        this._urlLink = value;
    }

    get urlLink(): string {
        return this._urlLink;
    }

    setReptile(name: string, birthday : string, type : string, morph : string, gender: object, species : object, image : string){
        this._name = name;
        this._birthday = birthday;
        this._type = type;
        this._morph = morph;
        this._gender = gender;
        this._species = species;
        this._urlLink = image;
    }


    loadReptile(name: string, birthday : string, type : string, morph : string, gender: object, species : object, feedings : FeedingClass[], notes : NoteClass[], weights : WeightClass[], image: string){
        this._name = name;
        this._birthday = birthday;
        this._type = type;
        this._morph = morph;
        this._gender = gender;
        this._species = species;
        this._feedings = feedings;
        this._notes = notes;
        this._weights = weights;
        this._urlLink = image;
    }
    
}