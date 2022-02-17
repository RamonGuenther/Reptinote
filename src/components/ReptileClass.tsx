import { v4 as uuidv4 } from 'uuid';

export class ReptileClass {

    private _id: string;
    private _name: string ="";
    private _birthday: string ="";
    private _type : string =""; //ART ALSO HAKENNASEN
    private _morph: string ="";

    //private ordnung: Ordnung
    // private breeder: Breeder;
    // private gender: Gender;


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

    setReptile(name: string, birthday : string, type : string, morph : string){
        this._name = name;
        this._birthday = birthday;
        this._type = type;
        this._morph = morph;
    }
}