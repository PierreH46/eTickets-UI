export interface EticketOptions {
    id: string;
    name: string;
    description: string;
    category: string;
    law?: string;
    isNominatif?: boolean;
    dateValidite?: string;
    internalPriceAdult?: number;
    internalPriceChild?: number;
    externalPriceAdult?: number;
    externalPriceChild?: number;
    childScale?: string;
    adultScale?: string;
    stock?: number;
}
