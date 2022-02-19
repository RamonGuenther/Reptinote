import { v4 as uuid } from 'uuid';

export default class FeedingClass{

    private _id : string ="";
    private _date : Date;
    private _feeding : string ="";
    private _weight: number = 0.0;

    constructor() {
        this._id = uuid();
        this._date = new Date();
    }

    get id(): string {
        return this._id;
    }


    set date(value: Date) {
        this._date = value;
    }

    get date(): Date {
        return this._date;
    }

    get feeding(): string {
        return this._feeding;
    }

    get weight(): number {
        return this._weight;
    }


    set id(value: string) {
        this._id = value;
    }


    set feeding(value: string) {
        this._feeding = value;
    }

    set weight(value: number) {
        this._weight = value;
    }

    setFoody(weight: number, type: string){
        this._weight = weight;
        this._feeding = type;
    }

// private date : Date = ;


}