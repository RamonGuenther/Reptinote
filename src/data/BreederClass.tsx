import { v4 as uuid } from 'uuid';

export class BreederClass {

    private _id: string;

    private _name : boolean = true;

    constructor() {
        this._id = uuid();
    }


    get id(): string {
        return this._id;
    }
}