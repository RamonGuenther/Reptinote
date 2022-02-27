import {v4 as uuid} from "uuid";

export default class Weight {
    private _id : string;
    private _date : string = "";
    private _weight : string ="";

    constructor() {
        this._id = uuid();
    }


    get id(): string {
        return this._id;
    }

    get date(): string {
        return this._date;
    }

    get weight(): string {
        return this._weight;
    }


    set id(value: string) {
        this._id = value;
    }

    set date(value: string) {
        this._date = value;
    }

    set weight(value: string) {
        this._weight = value;
    }

    public setWeight(weight: string, date : string){
        this._weight = weight;
        this._date = date;
    }
}