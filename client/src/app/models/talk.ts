import { User } from './user';

export class Talk {

    public static PREFIX = 'talk';

    public _id: string;
    public talkId: string;
    public title: string;
    public closed: boolean;
    public user: User;
}
