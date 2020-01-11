import { BasketOptions } from './basket-options';

export enum TypePrice {
    INTERNAL_CHILD_PRICE = 'INTERNAL_CHILD_PRICE',
    EXTERNAL_CHILD_PRICE = 'EXTERNAL_CHILD_PRICE',
    INTERNAL_ADULT_PRICE = 'INTERNAL_ADULT_PRICE',
    EXTERNAL_ADULT_PRICE = 'EXTERNAL_ADULT_PRICE',
    INTERNAL_UNIQUE_PRICE = 'INTERNAL_UNIQUE_PRICE',
    EXTERNAL_UNIQUE_PRICE = 'EXTERNAL_UNIQUE_PRICE',
    RELATIVE_ADULT_PRICE = "RELATIVE_ADULT_PRICE",
    RELATIVE_CHILD_PRICE = "RELATIVE_CHILD_PRICE",
    RELATIVE_UNIQUE_PRICE = "RELATIVE_UNIQUE_PRICE"
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
        public purchaseDate: Date,
        public relativeName?: string
        ) {}

 //   public id: string;
 //   public quantity: number;
 //   public status: boolean;
 //   public category: string;
 //   public reference: string;
 //   public price: number;
 //   public typePrice: TypePrice;
 //   public purchaseDate: Date;

// constructor(options: BasketOptions) {
//    this.id = options.id;
//    this.quantity = options.quantity;
//    this.status = options.status;
//    this.category = options.category;
//    this.reference = options.reference;
//    this.price = options.price;
//    switch (options.typePrice) {
//        case 'INTERNAL_CHILD_PRICE':
//            this.typePrice = TypePrice.INTERNAL_CHILD_PRICE;
//            break;
//        case 'EXTERNAL_CHILD_PRICE':
//            this.typePrice = TypePrice.EXTERNAL_CHILD_PRICE;
//            break;
//        case 'INTERNAL_ADULT_PRICE':
//            this.typePrice = TypePrice.INTERNAL_ADULT_PRICE;
//            break;
//        case 'EXTERNAL_ADULT_PRICE':
//            this.typePrice = TypePrice.EXTERNAL_ADULT_PRICE;
//            break;
 //       case 'INTERNAL_UNIQUE_PRICE':
//            this.typePrice = TypePrice.INTERNAL_UNIQUE_PRICE;
//            break;
//        case 'EXTERNAL_UNIQUE_PRICE':
//            this.typePrice = TypePrice.EXTERNAL_UNIQUE_PRICE;
//            break;
//    }
//    this.purchaseDate = options.purchaseDate;
//}


}

