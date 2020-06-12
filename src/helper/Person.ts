export class Person {
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    get currentColor(): string {
        return this._currentColor;
    }

    set currentColor(value: string) {
        this._currentColor = value;
    }

    get director(): Person {
        return this._director;
    }

    set director(value: Person) {
        this._director = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    private _id: number;
    private _name: string;
    private _active: boolean;
    private _date: Date;
    private _currentColor: string;
    private _director: Person;
    private _age: number;

    constructor();
    constructor(name: string) ;
    constructor(name?: string) {
        this.name = name;
    }

    toString(): string {
        return this.name;
    }
}