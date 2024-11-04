import { v4 as uuidv4 } from "uuid";

export class Player {
    id: string;
    position: number;

    constructor() {
        this.id = uuidv4();
        this.position = 0;
    }
}