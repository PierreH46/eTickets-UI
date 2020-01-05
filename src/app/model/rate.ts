export enum PriceType {
    CHILD_PRICE,
    ADULT_PRICE,
    UNIQUE_PRICE
}

export class Rate {

    constructor(
        public priceType: PriceType,
        public price: number,
        public stock: number
    ) {}
}
