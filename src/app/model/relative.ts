export class Relative {

    lastname: string;
    firstname: string;
    email: string;
    phoneNumber: string;

    constructor(options: {
        lastname: string;
        firstname: string;
        email: string;
        phoneNumber: string;
    }) {
        this.lastname = options.lastname;
        this.firstname = options.firstname;
        this.email = options.email;
        this.phoneNumber = options.phoneNumber;
    }
}
