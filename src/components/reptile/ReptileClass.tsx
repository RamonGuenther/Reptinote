import { v4 as uuidv4 } from 'uuid';

export class ReptileClass {

    private _id: string;
    private _name: string ="";
    private _birthday: string ="";
    private _type : string =""; //ART ALSO HAKENNASEN
    private _morph: string ="";
    private _species: string =""; //Spezies (Ordnung)
    private _gender: string ="";
    //private feeding array list?: Ordnung
    //private note : Note; liste/Array
    // private breeder: Breeder;


    constructor() {
        this._id = uuidv4();
    }


    set id(value: string) {
        this._id = value;
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


    get gender(): string {
        return this._gender;
    }


    set gender(value: string) {
        this._gender = value;
    }


    get species(): string {
        return this._species;
    }


    set species(value: string) {
        this._species = value;
    }

    setReptile(name: string, birthday : string, type : string, morph : string, gender: string, species : string){
        this._name = name;
        this._birthday = birthday;
        this._type = type;
        this._morph = morph;
        this._gender = gender;
        this._species = species;
    }
}