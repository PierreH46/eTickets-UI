export enum TypePrice {
    INTERNAL_CHILD_PRICE = "INTERNAL_CHILD_PRICE",
    EXTERNAL_CHILD_PRICE = "EXTERNAL_CHILD_PRICE",
    INTERNAL_ADULT_PRICE = "INTERNAL_ADULT_PRICE",
    EXTERNAL_ADULT_PRICE = "EXTERNAL_ADULT_PRICE",
    INTERNAL_UNIQUE_PRICE = "INTERNAL_UNIQUE_PRICE",
    EXTERNAL_UNIQUE_PRICE = "EXTERNAL_UNIQUE_PRICE"
}

export class Rate {

    // public priceType: PriceType;
    public typePrice: TypePrice;
    public price: number;
    // public stock: number;
    public quantity: number;

    constructor(options: {

        typePrice: string;
        price: number;
        quantity: number;
    }) {
        switch (options.typePrice) {
            case 'INTERNAL_CHILD_PRICE':
                this.typePrice = TypePrice.INTERNAL_CHILD_PRICE;
                break;
            case 'EXTERNAL_CHILD_PRICE':
                this.typePrice = TypePrice.EXTERNAL_CHILD_PRICE;
                break;
            case 'INTERNAL_ADULT_PRICE':
                this.typePrice = TypePrice.INTERNAL_ADULT_PRICE;
                break;
            case 'EXTERNAL_ADULT_PRICE':
                this.typePrice = TypePrice.EXTERNAL_ADULT_PRICE;
                break;
            case 'INTERNAL_UNIQUE_PRICE':
                this.typePrice = TypePrice.INTERNAL_UNIQUE_PRICE;
                break;
            case 'EXTERNAL_UNIQUE_PRICE':
                this.typePrice = TypePrice.EXTERNAL_UNIQUE_PRICE;
                break;
        }
        this.price = options.price;
        this.quantity = options.quantity;
    }
}
