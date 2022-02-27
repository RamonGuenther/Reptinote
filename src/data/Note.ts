import {v4 as uuid} from "uuid";

export default class Note {
    private _id: string;
    private _date: string = "";
    private _note: string = "";

    constructor() {
        this._id = uuid();
    }

    get id(): string {
        return this._id;
    }

    get date(): string {
        return this._date;
    }

    get note(): string {
        return this._note;
    }

    set id(value: string) {
        this._id = value;
    }

    set date(value: string) {
        this._date = value;
    }

    set note(value: string) {
        this._note = value;
    }

    public setNote(note: string, date: string): void {
        this._note = note;
        this._date = date;
    }
}