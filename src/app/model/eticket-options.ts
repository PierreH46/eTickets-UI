export interface EticketOptions {
    id: string;
    reference: string;
    description: string;
    image: string;
    category: string;
    law?: string;
    isNominatif?: boolean;
    validityDate?: string;
    rates: any[];
    provider: string;
}
