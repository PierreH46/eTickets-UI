import { Adress } from './adress';
import { Relative } from './relative';
import { CustomerOptions } from './customer-options';


export enum Profil {
    INTERNAL = 'INTERNAL',
    EXTERNAL = 'EXTERNAL'
}

export class Customer {

    id: string;
    lastname: string;
    firstname: string;
    profil: Profil;
    email: string;
    phoneNumber: string;
    adress: Adress;
    relatives: Relative[];
    password: string;
    authdata?: string;

    constructor(options: CustomerOptions) {
        this.id= options.id;
        this.lastname = options.lastname;
        this.firstname = options.firstname;
        switch (options.profil) {
            case 'INTERNAL':
                this.profil = Profil.INTERNAL;
                break;
            case 'EXTERNAL':
                this.profil = Profil.EXTERNAL;
                break;
        }
        this.email = options.email;
        this.phoneNumber = options.phoneNumber;
        this.adress = options.adress;
        this.relatives = options.relatives;
        this.password = options.password;
    }

}
