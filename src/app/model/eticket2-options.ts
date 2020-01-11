export interface Eticket2Options {
    id: string;
    reference: string;
    description: string;
    image: string;
    category: string;
    law?: string;
    isNominatif?: boolean;
    validityDate?: string;
    rates: any[];
    /*
    priceType: string;
    price: number;
    stock?: number;
    */
    provider: string;
}