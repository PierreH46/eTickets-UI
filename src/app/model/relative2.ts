import { Relative2Options } from './relative2-options';

export class Relative2 {

    public id: string;
    public lastname: string;
    public firstname: string;
    public email: string;
    public phoneNumber: string;

    constructor(options: Relative2Options) {
        this.id = options.id;
        this.lastname = options.lastname;
        this.firstname = options.firstname;
        this.email = options.email;
        this.phoneNumber = options.phoneNumber;

    }


}
