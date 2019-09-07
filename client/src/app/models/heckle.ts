import { User } from './user';

export class Heckle {

    public static PREFIX = 'heckle';

    public _id: string;
    public _deleted: boolean;

    public talkId: string;
    public heckleId: string;
    public date: Date;
    public message: string;
    public attendee: User;
}
