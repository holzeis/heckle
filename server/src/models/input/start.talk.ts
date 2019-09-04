import { PushSubscription } from "web-push";
import { MaxLength, IsNotEmpty } from 'class-validator';

export class StartTalk {

    @MaxLength(25)
    @IsNotEmpty()
    public title: string;

    constructor(public subscription: PushSubscription) {}
}