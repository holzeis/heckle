import nano = require("nano");
import v4 = require('uuid/v4');
import { User } from "./user";

export class Talk implements nano.MaybeDocument{

    public static PREFIX = 'talk';

    public _id: string;
    public talkId: string;
    public closed: boolean;
    
    constructor(public title: string, public presenter: User) {
        this.closed = false;
        this.talkId = v4();
        this._id = [Talk.PREFIX, this.talkId].join('/');
    }

    public getId(): string {
        return this._id.split('/')[1]
    }
}