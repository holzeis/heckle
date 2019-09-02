import nano = require("nano");
import v4 = require('uuid/v4');
import { User } from "./user";

export class Talk implements nano.MaybeDocument{

    public static PREFIX = 'talk';

    public _id: string;
    public closed: boolean;
    
    constructor(public title: string, public presenter: User) {
        this.closed = false;
        this._id = [Talk.PREFIX, v4()].join('/');
    }
}