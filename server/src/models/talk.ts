import nano = require("nano");
import v4 = require('uuid/v4');

export class Talk implements nano.MaybeDocument{

    public static PREFIX = 'talk';

    public _id: string;
    public closed: boolean;
    
    constructor(public title: string) {
        this.closed = false;
        this._id = [Talk.PREFIX, v4()].join('/');
    }
}