import { PushSubscription } from 'web-push';
import * as webpush from 'web-push';
import { DataService } from './data.service';
import { Subscription } from '../models/subscription';

export class NotificationService {

    private subscriptions: Subscription[] = [];

    public constructor(private dataService: DataService) {}

    public async register(talkId: string, subscription: PushSubscription) {
        this.subscriptions.push(await this.dataService.persist(new Subscription(talkId, subscription)));
    }

    public async unregister(talkId: string) {
        const subscription = await this.dataService.load([Subscription.PREFIX, talkId].join('/'));
        if (subscription) {
            this.subscriptions = this.subscriptions.filter(s => s.talkId !== talkId);
            await this.dataService.delete(subscription);
        }

    }

    public async send(talkId: string, title: string, message: string) {
        const payload = {
            "notification": {
                "title": title,
                "body": message,
                "data": {
                    "url": '/talk/' + talkId
                }
            }
        };

        const subscription = await this.findSubscription(talkId);
        if (!subscription) {
            return;
        }
        await webpush.sendNotification(subscription.push, JSON.stringify(payload));
    }

    private async findSubscription(talkId: string): Promise<Subscription> {
        let subscription = this.subscriptions.find((s) => s.talkId === talkId);
        if (!subscription) {
            // see if a subscription is persisted.
            subscription = await this.dataService.load([Subscription.PREFIX, talkId].join('/'));
            this.subscriptions.push(subscription)
        }
        return subscription;
    }
}