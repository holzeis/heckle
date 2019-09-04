import { MaxLength } from "class-validator";

export class Message {
    
    @MaxLength(512)
    public content: string;
}