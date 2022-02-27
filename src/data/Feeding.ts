import {v4 as uuid} from 'uuid';

export default class Feeding {

    private _id: string = "";
    private _date: string = "";
    private _food: string = "";
    private _weight: string = "";

    constructor() {
        this._id = uuid();
    }

    get id(): string {
        return this._id;
    }

    get date(): string {
        return this._date;
    }

    get food(): string {
        return this._food;
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

    set food(value: string) {
        this._food = value;
    }

    set weight(value: string) {
        this._weight = value;
    }

    public setFeeding(weight: string, feeding: string, date: string): void {
        this._weight = weight;
        this._food = feeding;
        this._date = date;
    }

}