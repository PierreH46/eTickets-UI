import { Adress } from './adress';
import { Relative } from './relative';


export enum Profil {
    INTERNAL,
    EXTERNAL
}

export class Customer {

    constructor(
        public id: string,
        public lastname: string,
        public firstname: string,
        public profil: Profil,
        public email: string,
        public phoneNumber: string,
        public adress: Adress,
        public relatives: Relative[],
        public password: string
    ) {}

}
