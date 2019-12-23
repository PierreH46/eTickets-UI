import { Eticket } from './eticket';

export class Provider {

    constructor(
        public id: string,
        public name: string,
        public logo: string,
        // public category: string,
        public etickets: Eticket[]
    ) {}
}
