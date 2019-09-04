import { PushSubscription } from "web-push";
import { MaxLength, IsNotEmpty } from 'class-validator';

export class StartTalk {

    @MaxLength(10)
    @IsNotEmpty()
    public title: string;

    constructor(public subscription: PushSubscription) {}
}