import { Adress } from './adress';
import { Relative } from './relative';
import { CustomerOptions } from './customer-options';


export enum Profil {
    INTERNAL,
    EXTERNAL
}

export class Customer {

    public id: string;
    public lastname: string;
    public firstname: string;
    public profil: Profil;
    public email: string;
    public phoneNumber: string;
    public adress: Adress;
    public relatives: Relative[];
    public password: string;

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
