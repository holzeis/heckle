import nano = require("nano");
import v4 = require('uuid/v4');

export class Heckle implements nano.MaybeDocument {
    
    public static PREFIX = 'heckle';

    public _id: string;

    constructor(public talkId: string, public message: string) {
        this._id = [Heckle.PREFIX, talkId, v4()].join('/');
     }
}
