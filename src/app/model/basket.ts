export enum TypePrice {
    INTERNAL_CHILD_PRICE,  EXTERNAL_CHILD_PRICE,
    INTERNAL_ADULT_PRICE, EXTERNAL_ADULT_PRICE,
    INTERNAL_UNIQUE_PRICE, EXTERNAL_UNIQUE_PRICE
}

export class Basket {

constructor(
        public id: string,
        public quantity: number,
        public status: boolean,
        public category: string,
        public reference: string,
        public price: number,
        public typePrice: TypePrice,
        public purchaseDate: Date
        ) {}
}
