export enum TypePrice {
    INTERNAL_CHILD_PRICE = "INTERNAL_CHILD_PRICE",
    EXTERNAL_CHILD_PRICE = "EXTERNAL_CHILD_PRICE",
    INTERNAL_ADULT_PRICE = "INTERNAL_ADULT_PRICE",
    EXTERNAL_ADULT_PRICE = "EXTERNAL_ADULT_PRICE",
    INTERNAL_UNIQUE_PRICE = "INTERNAL_UNIQUE_PRICE",
    EXTERNAL_UNIQUE_PRICE = "EXTERNAL_UNIQUE_PRICE",
    RELATIVE_ADULT_PRICE = "RELATIVE_ADULT_PRICE",
    RELATIVE_CHILD_PRICE = "RELATIVE_CHILD_PRICE",
    RELATIVE_UNIQUE_PRICE = "RELATIVE_UNIQUE_PRICE"
}

export class Rate2 {

    // public priceType: PriceType;


    constructor(
        public typePrice: TypePrice,
        public price: number,
        public quantity: number,

    ) {}
}

