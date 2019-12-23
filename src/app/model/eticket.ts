import { EticketOptions } from './eticket-options';
import { Provider } from './provider';

export enum Category {
    CINEMA,
    PARC_ATTRACTION,
    THEATRE,
    CONCERT
}

export class Eticket {

    public id: string;
    public name: string; // ajout du name
    public description: string;
    public category: Category; // ajout de category
    public law: string;
    public isNominatif: boolean;
    public dateValidite: string;
    public internalPriceAdult: number;
    public internalPriceChild: number;
    public externalPriceAdult: number;
    public externalPriceChild: number;
    public childScale: string;
    public adultScale: string;
    public stock: number;
    public provider: Provider;

    constructor(options: EticketOptions) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        switch (options.category) {
            case 'CINEMA':
                this.category = Category.CINEMA;
                break;
            case 'PARC_ATTRACTION':
                this.category = Category.PARC_ATTRACTION;
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
        this.dateValidite = options.dateValidite || '';
        this.internalPriceAdult = options.internalPriceAdult || null;
        this.internalPriceChild = options.internalPriceChild || null;
        this.externalPriceAdult = options.externalPriceAdult || null;
        this.externalPriceChild = options.externalPriceChild || null;
        this.childScale = options.childScale || '';
        this.adultScale = options.adultScale || '';
        this.stock = options.stock || null;
    }

}
