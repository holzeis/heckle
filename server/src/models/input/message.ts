import { MaxLength } from "class-validator";

export class Message {
    
    @MaxLength(500)
    public content: string;
}