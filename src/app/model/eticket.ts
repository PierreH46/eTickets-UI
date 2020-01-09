import { EticketOptions } from './eticket-options';
import { Rate } from './rate';

export enum Category {
    CINEMA = 'CINEMA',
    LOISIRS = 'LOISIRS',
    THEATRE = 'THEATRE',
    CONCERT =  'CONCERT'
}

export class Eticket {

    public id: string;
    public name: string;
    public description: string;
    public image: string;
    public category: Category;
    public law: string;
    public isNominatif: boolean;
    public validityDate: string;
    public rates: Rate[];
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
        this.provider = options.provider;
    }

}
