import { PushSubscription } from "web-push";

export class StartTalk {

    constructor(public title: string, public subscription: PushSubscription) {}
}