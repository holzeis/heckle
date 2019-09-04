import { MaxLength, IsNotEmpty } from 'class-validator';

export class Message {
    
    @MaxLength(512)
    @IsNotEmpty()
    public content: string;
}