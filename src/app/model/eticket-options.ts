export interface EticketOptions {
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;
    law?: string;
    isNominatif?: boolean;
    dateValidite?: string;
    priceType: string;
    price: number;
    stock?: number;
    provider: string;
}
