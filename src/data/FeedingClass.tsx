import { v4 as uuid } from 'uuid';

export default class FeedingClass{

    private _id : string ="";
    private _date : string = "";
    private _feeding : string ="";
    private _weight: string = "";

    constructor() {
        this._id = uuid();
    }

    get id(): string {
        return this._id;
    }


    set id(value: string) {
        this._id = value;
    }

    set date(value: string) {
        this._date = value;
    }

    set feeding(value: string) {
        this._feeding = value;
    }

    set weight(value: string) {
        this._weight = value;
    }

    get date(): string {
        return this._date;
    }

    get feeding(): string {
        return this._feeding;
    }

    get weight(): string {
        return this._weight;
    }

    setFoody(weight: string, feeding: string, date : string){
        this._weight = weight;
        this._feeding = feeding;
        this._date = date;
    }

}