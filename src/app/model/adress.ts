export class Adress {

    public number: number;
    public street: string;
    public postalCode: number;
    public city: string;

    constructor(options: {
        number: number;
        street: string;
        postalCode: number;
        city: string;
    }) {
        this.number = options.number;
        this.street = options.street;
        this.postalCode = options.postalCode;
        this.city = options.city;
    }
}
