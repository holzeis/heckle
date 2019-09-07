import nano = require("nano");
import v4 = require('uuid/v4');
import { User } from "./user";

export class Heckle implements nano.MaybeDocument {
    
    public static PREFIX = 'heckle';

    public _id: string;
    public _deleted: boolean;

    public heckleId: string
    public date: Date;

    constructor(public talkId: string, public message: string, public attendee: User) {
        this.heckleId = v4();
        this._id = [Heckle.PREFIX, talkId, this.heckleId].join('/');
        this.date = new Date();
     }
}
