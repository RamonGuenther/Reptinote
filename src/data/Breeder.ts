import {v4 as uuid} from 'uuid';

export class Breeder {

    private _id: string;
    private _companyName: string = "";
    private _firstName: string = "";
    private _lastName: string = "";
    private _street: string = "";
    private _postal: string = "";
    private _place: string = "";
    private _country: string = "";
    private _mail: string = "";
    private _phone: string = "";

    constructor() {
        this._id = uuid();
    }

    get id(): string {
        return this._id;
    }

    get companyName(): string {
        return this._companyName;
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    get street(): string {
        return this._street;
    }

    get postal(): string {
        return this._postal;
    }

    get place(): string {
        return this._place;
    }

    get country(): string {
        return this._country;
    }

    get mail(): string {
        return this._mail;
    }

    get phone(): string {
        return this._phone;
    }

    set id(value: string) {
        this._id = value;
    }

    set companyName(value: string) {
        this._companyName = value;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    set street(value: string) {
        this._street = value;
    }

    set postal(value: string) {
        this._postal = value;
    }

    set place(value: string) {
        this._place = value;
    }

    set country(value: string) {
        this._country = value;
    }

    set mail(value: string) {
        this._mail = value;
    }

    set phone(value: string) {
        this._phone = value;
    }

    public setBreeder(companyName: string, firstName: string, lastName: string, street: string, postal: string,
                      place: string, country: string, mail: string, phoneNumber: string) {

        this._companyName = companyName;
        this._firstName = firstName;
        this._lastName = lastName;
        this._street = street;
        this._postal = postal;
        this._place = place;
        this._country = country;
        this._mail = mail;
        this._phone = phoneNumber;
    }
}