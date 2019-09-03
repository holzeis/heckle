import { PushSubscription } from 'web-push';
import * as webpush from 'web-push';

export class NotificationService {

    private subscriptions: Subscription[] = [];

    public register(talkId: string, email: string, subscription: PushSubscription) {
        console.log('registering ' + email + ' for ' + talkId);
        this.subscriptions.push(new Subscription(talkId, email, subscription));
    }

    public unregister(talkId: string, email: string) {
        console.log('unregistering ' + email + ' for ' + talkId);
        this.subscriptions = this.subscriptions.filter(s => s.talkId !== talkId && s.email !== email)
    }

    public async send(talkId: string, title: string, message: string) {
        const payload = {
            "notification": {
                "title": title,
                "body": message,
                "data": {
                    "talkId": talkId
                }
            }
        };

        const promises: Promise<webpush.SendResult>[] = [];
        this.subscriptions.filter(s => s.talkId === talkId).forEach(s => {
            console.log('sending notificaiton to ' + s.email);
            promises.push(webpush.sendNotification(s.subscription, JSON.stringify(payload)));
        }
        );
        await Promise.all(promises);
    }
}

export class Subscription {
    
    constructor(public talkId: string, public email: string, public subscription: PushSubscription) {}
}