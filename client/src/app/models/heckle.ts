import { User } from './user';

export class Heckle {
    public static PREFIX = 'heckle';

    public talkId: string;
    public date: Date;
    public message: string;
    public attendee: User;
}
