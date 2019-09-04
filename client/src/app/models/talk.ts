import { User } from './user';

export class Talk {

    public static PREFIX = 'talk';

    public _id: string;
    public _deleted: boolean;

    public talkId: string;
    public title: string;
    public closed: boolean;
    public presenter: User;
    public date: Date;
}
