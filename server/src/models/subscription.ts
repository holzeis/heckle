import { PushSubscription } from 'web-push';
import * as Nano from 'nano';

export class Subscription  implements Nano.MaybeDocument {

    public static PREFIX = 'subscription';

    public _id: string;

    public constructor(public talkId: string, public push: PushSubscription) {
        this._id = [Subscription.PREFIX, talkId].join('/');
    }
}