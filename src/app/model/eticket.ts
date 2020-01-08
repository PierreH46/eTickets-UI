import { EticketOptions } from './eticket-options';
import { Rate } from './rate';

export enum Category {
    CINEMA,
    LOISIRS,
    THEATRE,
    CONCERT
}

/* deplacé dans Rate
export enum PriceType {
    CHILD_PRICE,
    ADULT_PRICE,
    UNIQUE_PRICE
}
*/

export class Eticket {

    public id: string;
    public name: string; // ajout du name
    public description: string;
    public image: string;
    public category: Category; // ajout de category
    public law: string;
    public isNominatif: boolean;
    public validityDate: string;
    public rates: Rate[];
    /* 
    public priceType: PriceType;
    public price: number;
    public stock: number;
     */
    public provider: string;

    constructor(options: EticketOptions) {
        this.id = options.id;
        this.name = options.reference;
        this.description = options.description;
        this.image = options.image;
        switch (options.category) {
            case 'CINEMA':
                this.category = Category.CINEMA;
                break;
            case 'LOISIRS':
                this.category = Category.LOISIRS;
                break;
            case 'THEATRE':
                this.category = Category.THEATRE;
                break;
            case 'CONCERT':
                this.category = Category.CONCERT;
                break;
        }
        this.law = options.law || '';
        this.isNominatif = options.isNominatif || false;
        this.validityDate = options.validityDate || '';
        this.rates = options.rates;
        /*
        switch (options.priceType) {
            case 'CHILD_PRICE':
                this.priceType = PriceType.CHILD_PRICE;
                break;
            case 'ADULT_PRICE':
                this.priceType = PriceType.ADULT_PRICE;
                break;
            case 'UNIQUE_PRICE':
                this.priceType = PriceType.UNIQUE_PRICE;
                break;
        }
        this.price = options.price;
        this.stock = options.stock || null;
        */
        this.provider = options.provider;
    }

}
